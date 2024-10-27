import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BounceView } from '@/components/animations/BounceView';
import { useUser } from '@/hooks/state/UserProvider';


export function BrainExperienceBar () {
  const { state : { dailyExperience } } = useUser();

	return (
		<ThemedView lightColor={Colors.primary} darkColor={Colors.primary} style={styles.stepView}>
      <View style={styles.brainContainer}>
        <BounceView style={styles.bounceContainer}>
          <Image source={require("@/assets/images/brain.png")} style={styles.brainImage} resizeMode='contain'/>
        </BounceView>
      </View>
			<CircularProgress 
				value={dailyExperience} 
				radius={130} 
				maxValue={100}
				activeStrokeWidth={32} 
				inActiveStrokeWidth={32}
				inActiveStrokeColor='#F2F2F2'
				activeStrokeColor={Colors.accent}
				showProgressValue={false}
				clockwise={false}
			/>
			<ThemedText 
        type="title"
        lightColor={Colors.accent}
        darkColor={Colors.accent}
        style={styles.progressText}
      >
        {dailyExperience} / 100 XP
      </ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
  brainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: 'auto',
    paddingBottom: 44,
  },
  bounceContainer: {
    shadowColor: Colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  brainImage: {
    width: 200,
    shadowColor: Colors.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 1,
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