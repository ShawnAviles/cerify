import React from "react";
import { Animated } from "react-native";

/**
 * ShakeView is a component that animates its children by shaking them left and right for 300ms.
 * By default, the children will shake by 3 pixels and pause for 30 seconds and loop...
 * Currently used in the GameButtonLayout Component for shaking the GameButton.
 */

interface ShakeViewProps {
  style?: object;
  children?: React.ReactNode;
  delayBetweenShakes?: number;
}

export const ShakeView: React.FC<ShakeViewProps> = props => {
  const shakeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for translateX: 0
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 0, // Move back to initial position
          duration: props.delayBetweenShakes ? props.delayBetweenShakes : 30000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 3, // Move right by 10 pixels
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -3, // Move left by 10 pixels
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 3, // Move right by 10 pixels
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0, // Move back to initial position
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shakeAnim]);
  
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{ translateY: shakeAnim }], // Bind translateX to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};