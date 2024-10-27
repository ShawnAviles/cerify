import {format} from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { useUser } from '@/hooks/state/UserProvider';

export function WelcomeHeader () {
  const { state : { firstName } } = useUser();

	return (
		<SafeAreaView style={styles.page} edges={['right', 'left', 'top']}>
			<ThemedText type="default" style={styles.welcomeText}>Welcome, {firstName}!</ThemedText>
			<ThemedText type="default" style={styles.todayText}>Today is</ThemedText>
			<ThemedText type="title" style={styles.dateText}>{format(new Date(), "eeee, MMMM dd")}</ThemedText>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  page: {
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
});