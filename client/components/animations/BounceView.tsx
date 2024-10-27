import React from 'react';
import { Animated } from 'react-native';

/**
 * BounceView is a component that animates its children by bouncing them up and down infinitely.
 * By default, the children will bounce up and down by 5 pixels.
 * Currently used in the BrainExperienceBar Component for bouncing the Brain mascot.
 */

interface BounceViewProps {
  style?: object;
  children?: React.ReactNode;
}

export const BounceView: React.FC<BounceViewProps> = props => {
  const bounceAnim = React.useRef(new Animated.Value(0)).current; // Initial value for translateY: 0

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -5, // Move up by 10 pixels
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Move down by 10 pixels
          duration: 1200,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{ translateY: bounceAnim }], // Bind translateY to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};