import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;
const POINTS_MULTIPLIER = 0.9;
const TIME_MULTIPLIER = 1.25;

interface MoleProps {
  points: number;
  delay: number;
  speed: number;
  onWhack: (points: number) => void;
  pointsMin?: number;
}

const Mole: React.FC<MoleProps> = ({ points, delay, speed, onWhack, pointsMin = 10 }) => {
  const buttonScale = useRef(new Animated.Value(0)).current;
  const pointsRef = useRef(points);
  const [whacked, setWhacked] = useState(false);

  const whack = () => {
    setWhacked(true);
    onWhack(pointsRef.current);
  };

  useEffect(() => {
    const showMole = () => {
      pointsRef.current = Math.floor(Math.max(pointsRef.current * POINTS_MULTIPLIER, pointsMin));
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: speed * 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0,
          duration: speed * 1000,
          delay: delay * 1000,
          useNativeDriver: true,
        }),
      ]).start(showMole);
    };
    showMole();
  }, [delay, speed, pointsMin]);

  useEffect(() => {
    if (whacked) {
      pointsRef.current = points;
      buttonScale.setValue(0);
      setTimeout(() => {
        setWhacked(false);
        buttonScale.setValue(1);
      }, 2000);
    }
  }, [whacked]);

  return (
    <TouchableOpacity onPress={whack} activeOpacity={0.7}>
      <Animated.View style={[styles.mole, { transform: [{ scale: buttonScale }] }]}>
        <Text style={styles.moleText}>Whack</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

interface ScoreProps {
  value: number;
}

const Score: React.FC<ScoreProps> = ({ value }) => (
  <Text style={styles.infoText}>{`Score: ${value}`}</Text>
);

interface TimerProps {
  time: number;
  interval?: number;
  onEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      setInternalTime((prevTime) => {
        const newTime = prevTime - interval;
        if (newTime <= 0) {
          clearInterval(timerId);
          onEnd();
        }
        return newTime;
      });
    }, interval);
    return () => clearInterval(timerId);
  }, [interval, onEnd]);

  return <Text style={styles.infoText}>{`Time: ${internalTime / 1000}s`}</Text>;
};

const Game: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const generateMoles = () =>
    new Array(5).fill(0).map(() => ({
      speed: Math.random() * 0.5 + 0.75,
      delay: Math.random() * 2.5 + 0.5,
      points: MOLE_SCORE,
    }));

  const [moles, setMoles] = useState(generateMoles());

  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  const startGame = () => {
    setScore(0);
    setMoles(generateMoles());
    setPlaying(true);
    setFinished(false);
  };

  const onWhack = (points: number) => setScore((prev) => prev + points);

  return (
    <View style={styles.container}>
      {!playing && !finished && (
        <>
          <Text style={styles.title}>Whack-a-mole</Text>
          <Button title="Start game" onPress={startGame} />
        </>
      )}
      {playing && (
        <>
          <Button title="End game" onPress={endGame} color="#841584" />
          <Score value={score} />
          <Timer time={TIME_LIMIT} onEnd={endGame} />
          <View style={styles.moles}>
            {moles.map(({ speed, delay, points }, id) => (
              <Mole key={id} onWhack={onWhack} points={points} delay={delay} speed={speed} />
            ))}
          </View>
        </>
      )}
      {finished && (
        <>
          <Score value={score} />
          <Button title="Play again" onPress={startGame} />
        </>
      )}
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1e9fa',
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  infoText: {
    fontSize: 24,
    marginVertical: 10,
  },
  mole: {
    height: 80,
    width: 80,
    backgroundColor: '#e69119',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    margin: 10,
  },
  moleText: {
    color: '#fff',
    fontSize: 18,
  },
  moles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
