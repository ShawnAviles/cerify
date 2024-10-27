import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { GameButton } from '@/components/GameButton';
import { Colors } from '@/constants/Colors';
import { ShakeView } from '@/components/animations/ShakeView';
import { Href, Link } from 'expo-router';

export function GameButtonLayout () {
	return (
		<ThemedView lightColor={Colors.primary} darkColor={Colors.primary} style={styles.bottomSplitView}>
			<GameButton gameType="matching" style={styles.lowerGameButton}/>
      <Link href={"/matching" as Href}>
        <ShakeView delayBetweenShakes={30000}>
          <GameButton gameType="matching" style={styles.upperGameButton}/>
        </ShakeView>
      </Link>
			<GameButton gameType="matching" style={styles.lowerGameButton}/>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
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
    elevation: 1,
  },
  lowerGameButton: {
    marginTop: 75
  },
  upperGameButton: {
    marginBottom: 75
  }
});
