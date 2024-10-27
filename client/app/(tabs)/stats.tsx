import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, ScrollView, ProgressBarAndroid } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Bar } from 'react-native-progress';
import { BounceView } from '@/components/animations/BounceView';
import React from 'react';

export default function StatsPage() {
  const [bestPerforming, setBestPerforming] = React.useState('Short-term Memory');

  // values would be fetched from the API
  const shortTermMemory = 0.8;
  const concentration = 0.6;
  const problemSolving = 0.7;
  const numericalReasoning = 0.4;
  const visualSpatial = 0.9;

  React.useEffect(() => {
    // get max of the best performing skill
    const max = Math.max(shortTermMemory, concentration, problemSolving, numericalReasoning, visualSpatial);
    if (max === shortTermMemory) {
      setBestPerforming(Colors.shortTermMemory);
    } else if (max === concentration) {
      setBestPerforming(Colors.concentration);
    } else if (max === problemSolving) {
      setBestPerforming(Colors.problemSolving);
    } else if (max === numericalReasoning) {
      setBestPerforming(Colors.numericalReasoning);
    } else {
      setBestPerforming(Colors.visualSpatial);
    }
  }, [shortTermMemory, concentration, problemSolving, numericalReasoning, visualSpatial]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>My Stats</Text>
        <View style={styles.brainContainer}>
          <BounceView style={styles.bounceContainer}>
            <Image source={require("@/assets/images/brain.png")} style={{...styles.brainImage, shadowColor: bestPerforming}} resizeMode='contain'/>
          </BounceView>
        </View>
      </SafeAreaView>

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userJoined}>Joined since 25th August 2024</Text>
      </View>

      {/* Skills Progress */}
      <View style={styles.skills}>
        <Text style={styles.header2Text}>Strength Levels</Text>
        <Skill title="Short-term Memory" progress={shortTermMemory} color={Colors.shortTermMemory} />
        <Skill title="Concentration" progress={concentration} color={Colors.concentration} />
        <Skill title="Problem-Solving" progress={problemSolving} color={Colors.problemSolving} />
        <Skill title="Numerical Reasoning" progress={numericalReasoning} color={Colors.numericalReasoning} />
        <Skill title="Visual-Spatial" progress={visualSpatial} color={Colors.visualSpatial}/>
      </View>

      {/* Stats Grid */}
      <Text style={styles.header2Text}>My Recap</Text>
      <View style={styles.statsGrid}>
        <StatCard icon="graduation-cap" label="Exercises Completed" value="176" />
        <StatCard icon="bolt" label="Total Lifetime XP" value="1879" />
        <StatCard icon="clone" label="Memory Level" value="10" />
        <StatCard icon="bullseye" label="Cognitive Level" value="26" />
        <StatCard icon="folder" label="Focus Level" value="54" />
        <StatCard icon="brain" label="Net Improvement" value="+10%" />
      </View>
    </ScrollView>
  );
}

function Skill({ title, progress, color }: { title: string, progress: number, color: string }) {
  return (
    <View style={styles.skillContainer}>
      <Text style={styles.skillText}>{title}</Text>
      <Bar color={color} progress={progress} />
    </View>
  );
}

function StatCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <View style={styles.statCard}>
      <FontAwesome5 name={icon} size={30} color={Colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  header2Text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  brainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 'auto',
  },
  bounceContainer: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  brainImage: {
    width: 200,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 1,
  },
  skills: {
    marginVertical: 10,
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  skillText: {
    flex: 1,
    fontSize: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userJoined: {
    color: '#888',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statCard: {
    width: '48%',
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 5,
  }
});
