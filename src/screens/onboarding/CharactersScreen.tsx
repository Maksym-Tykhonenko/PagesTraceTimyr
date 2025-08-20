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

interface CharactersScreenProps {
  onPrevious: () => void;
  onComplete: () => void;
}

const CharactersScreen = ({ onPrevious, onComplete }: CharactersScreenProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const characterAnim = useRef(new Animated.Value(0)).current;

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

    // Character animation with delay
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(characterAnim, {
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
            source={require('../../assets/images/image.png')} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.imageOverlay} />
          
          {/* Floating Characters */}
          <Animated.View 
            style={[
              styles.floatingCharacters,
              {
                transform: [{ scale: characterAnim }]
              }
            ]}
          >
            <Text style={styles.characterText}>👥</Text>
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
          <Text style={styles.title}>CHARACTERS THAT STAY WITH YOU</Text>
          <Text style={styles.subtitle}>Organize your favorite characters</Text>
          <Text style={styles.description}>Into timeless constellations</Text>
          
          {/* Characters Preview */}
          <View style={styles.charactersPreview}>
            <View style={styles.characterAvatars}>
              <View style={[styles.characterAvatar, { backgroundColor: colors.accent.success }]}>
                <Text style={styles.avatarText}>H</Text>
              </View>
              <View style={[styles.characterAvatar, { backgroundColor: colors.accent.warning }]}>
                <Text style={styles.avatarText}>V</Text>
              </View>
              <View style={[styles.characterAvatar, { backgroundColor: colors.accent.mentor }]}>
                <Text style={styles.avatarText}>M</Text>
              </View>
              <View style={[styles.characterAvatar, { backgroundColor: colors.accent.love }]}>
                <Text style={styles.avatarText}>L</Text>
              </View>
            </View>
            <Text style={styles.charactersText}>Organize by categories</Text>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Get Started</Text>
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
    justifyContent: 'flex-start',
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
  content: {
    flex: 1,
    marginBottom: 100,
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
  floatingCharacters: {
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: 90,
    height: 90,
    borderRadius: 45,
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
  characterText: {
    fontSize: 42,
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
  charactersPreview: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.cosmic.surface,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: colors.cosmic.border,
  },
  characterAvatars: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  characterAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gold.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  charactersText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  completeButton: {
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
  completeButtonText: {
    color: colors.cosmic.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: colors.gold.light,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});

export default CharactersScreen;
