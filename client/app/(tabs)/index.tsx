import { Image, StyleSheet} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function HomeScreen() {

  const value = 10 // This value should be fetched from the API

  return (
    <ThemedView lightColor='#88CBFF' darkColor='#88CBFF' style={styles.page}>
      <ThemedText type="default" style={styles.welcomeText}>Welcome, John!</ThemedText>
      <ThemedText type="default" style={styles.todayText}>Today is</ThemedText>
      <ThemedText type="title" style={styles.dateText}>{format(new Date(), "eeee, MMMM dd")}</ThemedText>
      <ThemedView lightColor='#88CBFF' darkColor='#88CBFF' style={styles.stepView}>
        <Image source={require("@/assets/images/brain.png")} style={styles.brainImage} resizeMode='contain'/>
        <CircularProgress 
          value={value} 
          radius={130} 
          maxValue={100}
          activeStrokeWidth={32} 
          inActiveStrokeWidth={32}
          inActiveStrokeColor='#F2F2F2'
          activeStrokeColor='#FF9924'
          showProgressValue={false}
          clockwise={false}
        />
        <ThemedText type="title" lightColor='#FF9924' darkColor='#FF9924' style={styles.progressText}>{value} / 100 XP</ThemedText>
      </ThemedView>
      <ThemedView lightColor='#88CBFF' darkColor='#88CBFF' style={styles.bottomSplitView}>
        <ThemedText type="title">Daily Goal</ThemedText>
        <ThemedText type="default">Complete 5 lessons</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 40,
  },
  welcomeText: {
    marginBottom: 24,
    fontWeight: 'bold',
    paddingHorizontal: 24
  },
  todayText: {
    marginBottom: 8,
    paddingHorizontal: 24
  }, 
  dateText: {
    paddingHorizontal: 24
  },
  brainImage: {
    width: "50%",
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -102 }, { translateY: -130 }], 
  },
  stepView: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24
  }, 
  bottomSplitView: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }, 
  progressText: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    width: "100%",
    textAlign: 'center',
    marginTop: 8,
    paddingVertical: 8,
  }
});
