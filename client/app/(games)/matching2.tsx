import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import { gameCardsFunction } from '@/utils/machingUtils';
import { MatchingCard } from '@/components/MatchingCard';
import { GameButton } from '@/components/GameButton';
import { Href, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useUser } from '@/hooks/state/UserProvider';

export default function Matching() {
  const [difficulty, setDifficulty] = useState(2); // TODO: Should call database for difficulty
  const [cards, setCards] = useState(gameCardsFunction(difficulty));
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);
  const { dispatch } = useUser();

  const cardClickFunction = (card : any) => {
      if (!gameWon && selectedCards.length < 2 && !card.isFlipped) {
          const updatedSelectedCards = [...selectedCards, card];
          const updatedCards = cards.map((c) =>
              c.id === card.id ? { ...c, isFlipped: true } : c
          );
          setSelectedCards(updatedSelectedCards);
          setCards(updatedCards);

          if (updatedSelectedCards.length === 2) {
              if (updatedSelectedCards[0].symbol === updatedSelectedCards[1].symbol) {
                  setMatches(matches + 1);
                  setSelectedCards([]);
                  if (matches + 1 === cards.length / 2) {
                      handleWin();
                      setGameWon(true);
                  }
              } else {
                  setTimeout(() => {
                      const flippedCards = updatedCards.map((c) =>
                          updatedSelectedCards.some((s) => s.id === c.id)
                              ? { ...c, isFlipped: false }
                              : c
                      );
                      setSelectedCards([]);
                      setCards(flippedCards);
                  }, 500);
              }
          }
      }
  };

  const handleWin = () => {
      dispatch({ type: 'INCREMENT_DAILY_EXPERIENCE', payload: 10 });
      Animated.timing(winMessage, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
      }).start();
  };

  useEffect(() => {
      if (matches === cards.length / 2) {
          handleWin();
          setGameWon(true);
      }
  }, [matches]);

  const handleLeave = () => {
      setCards(gameCardsFunction(difficulty));
      setSelectedCards([]);
      setMatches(0);
      setWinMessage(new Animated.Value(0));
      setGameWon(false);
      router.push('/' as Href);
  };

  return (
      <View style={styles.container}>
          <Text style={styles.header}>Matching Game</Text>
          <Text style={styles.description}>
              Match each pair of cards based on their symbols
          </Text>
          {gameWon ? (
              <View style={styles.winMessage}>
                  <View style={styles.winMessageContent}>
                      <Text style={styles.winText}>Congratulations!</Text>
                      <Text style={styles.winTextXP}>You Won 20XP!</Text>
                  </View>
                  <ThemedButton
                      name="rick"
                      type="primary"
                      borderWidth={2}
                      borderColor={Colors.shadow}
                      backgroundColor={Colors.secondary}
                      backgroundDarker={Colors.shadow}
                      style={styles.quitButton}
                      onPress={handleLeave}
                  >
                    <Text>Return Home</Text>
                  </ThemedButton>
              </View>
          ) : (
              <>
                  <View style={styles.grid}>
                      {cards.map((card) => (
                          <MatchingCard
                              key={card.id}
                              id={card.id}
                              isFlipped={card.isFlipped}
                              cardClickFunction={() => cardClickFunction(card)}
                              symbol={card.symbol}
                          />
                      ))}
                  </View>
                  <View>
                    <GameButton gameType="quit" style={styles.quitButton} route='/'/>
                  </View>
              </>
          )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
      paddingHorizontal: 50,
    },
    description: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
      paddingHorizontal: 50,
    },
    grid: {
      width: '85%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    winMessage: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    winMessageContent: {
      backgroundColor: Colors.primary,
      padding: 30,
      borderRadius: 20,
      alignItems: 'center',
    },
    winText: {
      fontSize: 32,
      color: Colors.black,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    winTextXP: {
      fontSize: 30,
      color: Colors.accent,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    quitButton: {
      marginTop: 20
    },
});