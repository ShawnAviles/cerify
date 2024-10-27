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
import { GameButton } from '../GameButton';

export function Matching() {
  const [difficulty, setDifficulty] = useState(1); // TODO: Should call database for difficulty
  const [cards, setCards] = useState(gameCardsFunction(difficulty));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);

  const cardClickFunction = (card) => {
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

  const handleRestart = () => {
      setCards(gameCardsFunction(difficulty));
      setSelectedCards([]);
      setMatches(0);
      setWinMessage(new Animated.Value(0));
      setGameWon(false);
      // TODO: Should route to home page
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
                      <Text style={styles.winText}>You Won!</Text>
                  </View>
                  <Button title="Restart" onPress={handleRestart} />
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
                    <GameButton gameType="quit" style={styles.quitButton}/>
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
    },
    description: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    grid: {
      width: '80%',
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
      backgroundColor: '#88CBFF',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    winText: {
      fontSize: 24,
      color: 'white',
      textAlign: 'center',
    },
    quitButton: {
      marginTop: 20
    },
});
