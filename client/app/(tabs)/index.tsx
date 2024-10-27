import { Button, Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GameButton } from '@/components/GameButton';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {

  const value = 10 // This value should be fetched from the API

  return (
    <SafeAreaView style={styles.page} edges={['right', 'left', 'top']}>
      <ThemedText type="default" style={styles.welcomeText}>Welcome, John!</ThemedText>
      <ThemedText type="default" style={styles.todayText}>Today is</ThemedText>
      <ThemedText type="title" style={styles.dateText}>{format(new Date(), "eeee, MMMM dd")}</ThemedText>
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
      <ThemedView lightColor={Colors.primary} darkColor={Colors.primary} style={styles.bottomSplitView}>
        <GameButton gameType="matching" style={styles.lowerGameButton}/>
        <GameButton gameType="matching" style={styles.upperGameButton}/>
        <GameButton gameType="matching" style={styles.lowerGameButton}/>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 0,
    backgroundColor: Colors.primary,
    color: Colors.black
  },
  welcomeText: {
    marginBottom: 16,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    color: Colors.black
  },
  todayText: {
    marginBottom: 8,
    paddingHorizontal: 24,
    color: Colors.black
  
  }, 
  dateText: {
    paddingHorizontal: 24,
    color: Colors.black
  },
  brainImage: {
    width: "50%",
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -100 }, { translateY: -130 }], 
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
  bottomSplitView: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#444',
    shadowOffset: {width: 0, height: -20},
    shadowOpacity: 0.2,
    shadowRadius: 8,   
  }, 
  progressText: {
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    width: "100%",
    textAlign: 'center',
    marginTop: 8,
    paddingVertical: 4
  },
  lowerGameButton: {
    marginTop: 75
  },
  upperGameButton: {
    marginBottom: 75
  }
});