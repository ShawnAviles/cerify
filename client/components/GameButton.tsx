import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Colors } from '@/constants/Colors';
import { Href, router } from 'expo-router';

export function GameButton({gameType, style, route} : {gameType: string, style?: any, route?: string}) {
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
				gameType === 'matching' ? 
					<Image source={require('@/assets/images/matching-icon.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
				: gameType === 'sorting' ?
					<Image source={require('@/assets/images/matching-icon.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
				: gameType === 'memory' ?
					<Image source={require('@/assets/images/matching-icon.png')} style={styles.gameButtonIcon} resizeMode='contain'/>
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
		color: '#333',
		fontWeight: 'bold',
		fontSize: 24,
	}
});