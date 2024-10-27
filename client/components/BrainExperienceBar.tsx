import React from 'react';
import { Image, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function BrainExperienceBar () {
	const value = 10 // This value should be fetched from the API

	return (
		<ThemedView lightColor={Colors.primary} darkColor={Colors.primary} style={styles.stepView}>
			<Image source={require("@/assets/images/brain.png")} style={styles.brainImage} resizeMode='contain'/>
			<CircularProgress 
				value={value} 
				radius={130} 
				maxValue={100}
				activeStrokeWidth={32} 
				inActiveStrokeWidth={32}
				inActiveStrokeColor='#F2F2F2'
				activeStrokeColor={Colors.accent}
				showProgressValue={false}
				clockwise={false}
			/>
			<ThemedText type="title" lightColor={Colors.accent} darkColor={Colors.accent} style={styles.progressText}>{value} / 100 XP</ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
  brainImage: {
    width: "50%",
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -97 }, { translateY: -130 }], 
    shadowColor: Colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  stepView: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24
  },
  progressText: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    width: "100%",
    textAlign: 'center',
    marginTop: 8,
    paddingVertical: 4
  }
});