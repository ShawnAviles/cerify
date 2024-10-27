import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { GameButton } from '@/components/GameButton';
import {format} from 'date-fns';
import CircularProgress from 'react-native-circular-progress-indicator';
import Login from '@/components/views/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { WelcomeHeader } from '@/components/WelcomeHeader';
import { BrainExperienceBar } from '@/components/BrainExperienceBar';
import { GameButtonLayout } from '@/components/GameButtonLayout';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.page} lightColor={Colors.primary} darkColor={Colors.primary}>
      <WelcomeHeader />
      <BrainExperienceBar />
      <GameButtonLayout />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
  }
});