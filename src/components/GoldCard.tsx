import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, shadows, animations } from '../styles/theme';

interface GoldCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  animated?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const GoldCard: React.FC<GoldCardProps> = ({
  children,
  style,
  onPress,
  animated = true,
  glowIntensity = 'medium',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      // Continuous subtle glow animation
      const glowLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      );

      // Subtle shadow breathing animation
      const shadowLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(shadowAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(shadowAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          }),
        ])
      );

      glowLoop.start();
      shadowLoop.start();

      return () => {
        glowLoop.stop();
        shadowLoop.stop();
      };
    }
  }, [animated]);

  const handlePressIn = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  const getGlowStyle = () => {
    const intensity = glowIntensity === 'high' ? 0.8 : glowIntensity === 'medium' ? 0.5 : 0.3;
    
    return {
      shadowColor: colors.gold.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, intensity],
      }),
      shadowRadius: glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [8, 16],
      }),
      elevation: glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [8, 16],
      }),
    };
  };

  const getShadowStyle = () => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.6],
      }),
      shadowRadius: shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 20],
      }),
      elevation: shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 20],
      }),
    };
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View
      style={[
        styles.container,
        getGlowStyle(),
        getShadowStyle(),
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <CardComponent
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* Gold border gradient effect */}
        <View style={styles.goldBorder} />
        <View style={styles.goldBorderInner} />
        
        {/* Content */}
        <View style={styles.content}>
          {children}
        </View>
      </CardComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gold.primary,
    overflow: 'hidden',
    position: 'relative',
  },
  goldBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.gold.primary,
    opacity: 0.8,
  },
  goldBorderInner: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    height: 1,
    backgroundColor: colors.gold.light,
    opacity: 0.6,
  },
  content: {
    padding: 20,
  },
});

export default GoldCard;

