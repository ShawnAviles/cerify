import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';
import { StyleSheet } from 'react-native';
import AWS from 'aws-sdk';

export default function SpeechToText() {

  const [recording, setRecording] = useState<Recording | null>(null)
  const [permissionResponse, requestPermission] = Audio.usePermissions()
  const [transcription, setTranscription] = useState<string | null>(null)

  AWS.config.update({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY!
    }
  })

  const s3 = new AWS.S3()
  const transcribe = new AWS.TranscribeService()

  const uploadFileToS3 = async (bucketName, fileName, filePath) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: filePath
    }

    return s3.upload(params).promise();
  }

  const startTranscriptionJob = async (bucketName: string, fileName: string) => {
    const jobName = `transcription_${Date.now()}`;
    const s3Uri = `s3://${bucketName}/${fileName}`; // Construct S3 URI
    const params = {
      TranscriptionJobName: jobName,
      LanguageCode: 'en-US',
      Media: { MediaFileUri: s3Uri },
      OutputBucketName: bucketName,
    };
    return transcribe.startTranscriptionJob(params).promise();
  };

  const initiateTranscription = async (bucketName: string, fileName: string) => {
  try {
    const { TranscriptionJob } = await startTranscriptionJob(bucketName, fileName);
    console.log("Transcription job started successfully!");
    const jobName = TranscriptionJob.TranscriptionJobName;

    // Start polling for the transcription result
    const intervalId = setInterval(async () => {
      const result = await checkTranscriptionStatus(jobName);
      if (result) {
        console.log(result)
        clearInterval(intervalId);
        setTranscription(result); // Update state or display the transcription
        Alert.alert("Transcription Completed", result);
      }
    }, 5000); // Poll every 5 seconds
  } catch (error) {
    console.error("Error starting transcription:", error);
    Alert.alert("Error", "Failed to start transcription!");
  }
};

const checkTranscriptionStatus = async (jobName) => {
  const params = { TranscriptionJobName: jobName };
  const response = await transcribe.getTranscriptionJob(params).promise();
  const status = response.TranscriptionJob.TranscriptionJobStatus;

  if (status === 'COMPLETED') {
    return response.TranscriptionJob.Transcript.TranscriptList[0].TranscriptText;
  } else if (status === 'FAILED') {
    // Handle failure, e.g., log error, display error message
    console.error('Transcription failed:', response.TranscriptionJob.FailureReason);
    return null;
  } else {
    // Handle in-progress or other statuses, e.g., wait or poll
    console.log('Transcription in progress...');
    // You can implement a polling mechanism or wait for a certain duration
    // before calling `checkTranscriptionStatus` again
    return null;
  }
};

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log("Requestion permission")
        await requestPermission()
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecording(recording)
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecording = async () => {
    setRecording(null)
    if (recording) {
      await recording?.stopAndUnloadAsync()
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false,
        }
      )
      const uri = recording.getURI()
      if (!uri) {
        Alert.alert("No recording found")
        return
      }
      const bucketName = process.env.EXPO_PUBLIC_AWS_BUCKET!;
      const fileName = `audio_${Date.now()}.m4a`;
      await uploadFileToS3(bucketName, fileName, uri)
      initiateTranscription(bucketName, fileName)
    }
  }

  return (
    <View style={styles.container}>
      <Button 
        title={recording ? "Stop Recording" : "Start Recording"} 
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
