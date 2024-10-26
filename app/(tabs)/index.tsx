import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {format} from 'date-fns';

export default function HomeScreen() {
  return (
    <ThemedView lightColor='#88CBFF' darkColor='#88CBFF' style={styles.page}>
      <ThemedText type="default" style={styles.welcomeText}>Welcome, John!</ThemedText>
      <ThemedText type="default" style={styles.todayText}>Today is</ThemedText>
      <ThemedText type="title">{format(new Date(), "eeee, MMMM dd")}</ThemedText>
      <ThemedView lightColor='#88CBFF' darkColor='#88CBFF'>
        <Image source={require("@/assets/images/brain.png")} style={styles.brainImage}/>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  page: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    marginBottom: 24,
  },
  todayText: {
    marginBottom: 8,
  }, 
  brainImage: {
    width: 60,
  }
});
