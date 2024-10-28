import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Colors } from '@/constants/Colors';
import { Href, router } from 'expo-router';
import { useUser } from '@/hooks/state/UserProvider';

export function GameButton({gameType, style, route, difficulty = 1} : {gameType: string, style?: any, route?: string, difficulty?: number}) {	
	return (
		<ThemedButton 
			name="rick" 
			type="primary" 
			width={100} 
			height={105} 
			borderRadius={150}
			raiseLevel={18}
			borderWidth={2}
			borderColor={Colors.shadow}
			backgroundColor={Colors.secondary}
			backgroundDarker={Colors.shadow}
			style={style}
      onPress={() => router.push(route as Href)}
		>
			{
				(gameType === 'matching' && difficulty === 1)  ? 
					<Image source={require('@/assets/images/matching-icon.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
				: gameType === 'focus' ?
					<Image source={require('@/assets/images/focus.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
				: (gameType === 'matching-2' || difficulty === 2) ?
					<Image source={require('@/assets/images/card-3.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
				: gameType === 'quit' ? 
					<Text style={styles.quitButtonText}>Quit</Text>
				: <Image source={require('@/assets/images/matching-icon.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
			}
		</ThemedButton>
	);
}

const styles = StyleSheet.create({
  gameButtonIcon: {
    width: 50,
  },
	quitButtonText: {
		color: Colors.black,
		fontWeight: 'bold',
		fontSize: 24,
	}
});