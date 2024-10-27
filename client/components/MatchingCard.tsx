import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export function MatchingCard({id, isFlipped, cardClickFunction, symbol}) {
  return (
    <TouchableOpacity
      key={id}
      style={[styles.card, isFlipped && styles.cardFlipped]}
      onPress={cardClickFunction}
    >
      {isFlipped ? (
          <Icon name={symbol} size={40} style={styles.cardIcon} />
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
  }
});