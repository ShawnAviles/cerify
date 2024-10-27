import { Colors } from '@/constants/Colors';
import { Href, router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Easing } from 'react-native-reanimated';
import { useUser } from '@/hooks/state/UserProvider';

const TIME_LIMIT = 15000;
const MOLE_SCORE = 100;
const POINTS_MULTIPLIER = 0.9;
const MAX_EXPECTED_POINTS= 2000;

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
    <Animated.View style={[styles.moleContainer, { transform: [{ scale: buttonScale }] }]}>
      <ThemedButton
        name={whacked ? 'rick' : 'bruce'}
        type="primary"
        width={100}
        height={150}
        borderRadius={150}
        raiseLevel={25}
        borderWidth={2}
        borderColor={Colors.shadow}
        backgroundColor={whacked ? Colors.secondary : Colors.primary}
        backgroundDarker={Colors.shadow}
        onPress={whack}
        style={styles.moleButton}
      >
        <Image source={require('@/assets/images/mole.png')} style={styles.moleImage} resizeMode='contain'/>
      </ThemedButton>
    </Animated.View>      
  );
};

interface ScoreProps {
  value: number;
}

const Score: React.FC<ScoreProps> = ({ value }) => (
  <Text style={styles.infoText}>
    {"Score: "}
    <Text style={{ fontWeight: 'normal' }}>
      {value}
    </Text>
  </Text>
);

interface TimerProps {
  time: number;
  interval?: number;
  onEnd: () => void;
};

const Timer: React.FC<TimerProps> = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time);
  const timerIdRef = useRef<number | null>(null);
  const timeRef = useRef(time);
  const lastUpdateTimeRef = useRef(Date.now());

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateTimeRef.current;

      if (deltaTime >= interval) {
        timeRef.current -= deltaTime;
        setInternalTime(timeRef.current);
        lastUpdateTimeRef.current = now;

        if (timeRef.current <= 0) {
          cancelAnimationFrame(timerIdRef.current as number);
          onEnd();
          return;
        }
      }

      timerIdRef.current = requestAnimationFrame(updateTimer);
    };

    timerIdRef.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timerIdRef.current as number);
  }, [interval, onEnd]);

  return <Text style={styles.infoText}>{`Time: ${(internalTime / 1000).toFixed(1)}s`}</Text>;
};

const Game: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const { dispatch } = useUser();

  const generateMoles = () =>
    new Array(5).fill(0).map(() => ({
      speed: Math.random() * 0.2 + 0.75,
      delay: Math.random() * 4.5 + 0.5,
      points: MOLE_SCORE,
    }));

  const [moles, setMoles] = useState(generateMoles());

  const endGame = (updateXP = true) => {
    if (score > 0 && updateXP) {
      dispatch({ type: 'INCREMENT_DAILY_EXPERIENCE', payload: parseInt(((score / MAX_EXPECTED_POINTS) * 100).toFixed(0)) });
    }
    setPlaying(false);
    setFinished(true);
  };

  const startGame = () => {
    // check if score is 0, if not, dispatch increment daily experience
    if (score > 0) {
      dispatch({ type: 'INCREMENT_DAILY_EXPERIENCE', payload: parseInt(((score / MAX_EXPECTED_POINTS) * 100).toFixed(0)) });
    }
    setScore(0);
    setMoles(generateMoles());
    setPlaying(true);
    setFinished(false);
  };

  const resetScore = () => setScore(0);

  const onWhack = (points: number) => setScore((prev) => prev + points);

  return (
    <View style={styles.container}>
      {!playing && !finished && (
        <>
          <Text style={styles.title}>Whack-a-mole</Text>
          <View style={styles.buttonContainerBottom}>
            <ThemedButton
              name="bruce"
              type="primary"
              borderRadius={50}
              backgroundColor={Colors.primary}
              backgroundDarker={Colors.shadow}
              borderColor={Colors.shadow}
              onPress={startGame}
            >
              <Text>Start Game</Text>
            </ThemedButton>
          </View>
        </>
      )}
      {playing && (
        <>
          <Score value={score} />
          <Timer time={TIME_LIMIT} onEnd={endGame} />
          <View style={styles.moles}>
            {moles.map(({ speed, delay, points }, id) => (
              <Mole key={id} onWhack={onWhack} points={points} delay={delay} speed={speed} />
            ))}
          </View>
          <View style={styles.buttonContainerBottom}>
            <ThemedButton
              name="bruce"
              type="primary"
              borderRadius={50}
              backgroundColor={Colors.secondary}
              backgroundDarker={Colors.shadow}
              borderColor={Colors.shadow}
              onPress={() => {
                resetScore();
                endGame(false);
              }}
            >
              <Text>End Game</Text>
            </ThemedButton>
          </View>
        </>
      )}
      {finished && (
        <>
          {
            (finished && score === 0) ? 
              <Text style={styles.infoText}>Game Over!</Text> 
            : 
              <>
                <Score value={score} />
                {score > 0 && <Text style={styles.infoTextXP}>You gained {((score / MAX_EXPECTED_POINTS) * 100).toFixed(0)} XP!</Text>}
              </>
          }
          <Text style={styles.infoText}></Text>
          <View style={styles.buttonContainerBottom}>
            <ThemedButton
              name="bruce"
              type="primary"
              borderRadius={50}
              backgroundColor={Colors.primary}
              backgroundDarker={Colors.shadow}
              borderColor={Colors.shadow}
              onPress={startGame}
            >
              <Text>Play Again</Text>
            </ThemedButton>
            <ThemedButton
              name="bruce"
              type="secondary"
              borderRadius={50}
              backgroundColor={Colors.white}
              backgroundDarker={Colors.shadow}
              borderColor={Colors.shadow}
              onPress={() => router.push('/' as Href)}
            >
              <Text>Return Home</Text>
            </ThemedButton>
          </View>
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
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoTextXP: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.accent,
  },
  moleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  moleButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moleImage: {
    width: 60,
    height: 60,
  },
  moleText: {
    color: Colors.black,
    fontSize: 18,
  },
  moles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    gap: 20,
  },
  buttonContainerBottom: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
