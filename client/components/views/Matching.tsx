import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { randomArrFunction, gameCardsFunction } from '@/utils/machingUtils';

// TODO: Componentize and break into different files
// TODO: Match Styles on Figma
// TODO: Add a timer
// TODO: Add Flipping Animation

export function Matching() {
    const [cards, setCards] = useState(gameCardsFunction());
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
                        geekWinGameFunction();
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
                    }, 1000);
                }
            }
        }
    };

    const geekWinGameFunction = () => {
        Animated.timing(winMessage, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (matches === cards.length / 2) {
            geekWinGameFunction();
            setGameWon(true);
        }
    }, [matches]);

    const msg = `Matches: ${matches} / ${cards.length / 2}`;

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>GeeksforGeeks</Text>
            <Text style={styles.header2}>Memory Pair Game using React-Native</Text>
            <Text style={styles.matchText}>{msg}</Text>
            {gameWon ? (
                <View style={styles.winMessage}>
                    <View style={styles.winMessageContent}>
                        <Text style={styles.winText}>Congratulations Geek!</Text>
                        <Text style={styles.winText}>You Won!</Text>
                    </View>
                    <Button
                        title="Restart"
                        onPress={() => {
                            setCards(gameCardsFunction());
                            setSelectedCards([]);
                            setMatches(0);
                            setWinMessage(new Animated.Value(0));
                            setGameWon(false);
                        }}
                    />
                </View>
            ) : (
                <View style={styles.grid}>
                    {cards.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            style={[styles.card, card.isFlipped && styles.cardFlipped]}
                            onPress={() => cardClickFunction(card)}
                        >
                            {card.isFlipped ? (
                                <Icon name={card.symbol} size={40} style={styles.cardIcon} />
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    header1: {
        fontSize: 36,
        marginBottom: 10,
        color: 'green',
    },
    header2: {
        fontSize: 18,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    matchText: {
        fontSize: 18,
        color: 'black',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    cardFlipped: {
        backgroundColor: 'white',
    },
    cardIcon: {
        color: 'blue',
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
        backgroundColor: 'rgba(255, 215, 0, 0.7)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    winText: {
        fontSize: 36,
        color: 'white',
    },
});
