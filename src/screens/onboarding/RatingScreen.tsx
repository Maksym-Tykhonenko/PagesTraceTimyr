import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { colors, shadows, typography, spacing, borderRadius } from '../../styles/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface RatingScreenProps {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const RatingScreen = ({ onNext, onPrevious, onSkip }: RatingScreenProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const starAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start();

    // Star animation with delay
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(starAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        tension: 100,
        friction: 5,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       
        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Image Section */}
        <Animated.View 
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={require('../../assets/images/image3.png')} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.imageOverlay} />
          
          {/* Floating Stars */}
          <Animated.View 
            style={[
              styles.floatingStars,
              {
                transform: [{ scale: starAnim }]
              }
            ]}
          >
            <Text style={styles.starText}>✨</Text>
          </Animated.View>
        </Animated.View>

        {/* Text Content */}
        <Animated.View 
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.title}>RATE, REFLECT, REMEMBER</Text>
          <Text style={styles.subtitle}>Leave your trace in stars and notes</Text>
          <Text style={styles.description}>As your journey unfolds</Text>
          
          {/* Rating Preview */}
          <View style={styles.ratingPreview}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={styles.starIcon}>⭐</Text>
              ))}
            </View>
            <Text style={styles.ratingText}>Rate your favorites</Text>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  backButton: {
    padding: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cosmic.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cosmic.border,
  },
  backText: {
    color: colors.gold.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: spacing.md,
  },
  skipText: {
    color: colors.gold.primary,
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.4)',
  },
  floatingStars: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cosmic.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.gold.primary,
    shadowColor: colors.gold.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  starText: {
    fontSize: 48,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...typography.h4,
    color: colors.gold.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: '600',
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  ratingPreview: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.cosmic.surface,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.cosmic.border,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  starIcon: {
    fontSize: 24,
    marginHorizontal: spacing.xs,
  },
  ratingText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  nextButton: {
    backgroundColor: colors.gold.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    shadowColor: colors.gold.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nextButtonText: {
    color: colors.cosmic.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: colors.gold.light,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});

export default RatingScreen;
