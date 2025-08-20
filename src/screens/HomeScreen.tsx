import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { colors, shadows, typography, spacing, borderRadius } from '../styles/theme';
import GoldCard from '../components/GoldCard';
import GoldButton from '../components/GoldButton';

const HomeScreen = () => {
  const books = useSelector((state: RootState) => state.library.books);
  const movies = useSelector((state: RootState) => state.library.movies);
  const characters = useSelector((state: RootState) => state.characters.characters);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }),
    ]).start();
  }, []);

  const totalBooks = books.length;
  const totalMovies = movies.length;
  const totalCharacters = characters.length;
  const totalReviews = reviews.length;

  const finishedBooks = books.filter(book => book.status === 'finished').length;
  const finishedMovies = movies.filter(movie => movie.status === 'finished').length;
  const favoriteBooks = books.filter(book => book.isFavorite).length;
  const favoriteMovies = movies.filter(movie => movie.isFavorite).length;

  const averageBookRating = books.length > 0 
    ? books.reduce((sum, book) => sum + book.rating, 0) / books.length 
    : 0;
  const averageMovieRating = movies.length > 0 
    ? movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length 
    : 0;

  const renderStatCard = (title: string, value: string | number, subtitle: string, color: string) => (
    <GoldCard style={styles.statCardContainer} glowIntensity="medium">
      <View style={[styles.statCard, { borderLeftColor: color }]}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statSubtitle}>{subtitle}</Text>
      </View>
    </GoldCard>
  );

  const renderChartCard = (title: string, children: React.ReactNode) => (
    <GoldCard style={styles.chartCardContainer} glowIntensity="low">
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>{title}</Text>
        {children}
      </View>
    </GoldCard>
  );

  const renderProgressBar = (label: string, value: number, max: number, color: string) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressLabel}>
          <Text style={styles.progressText}>{label}</Text>
          <Text style={styles.progressValue}>{value}/{max}</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: color 
              }
            ]} 
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome back, Star Tracker!</Text>
        <Text style={styles.subtitleText}>Here's your cosmic journey so far</Text>
      </Animated.View>

      <Image source={require('../assets/images/Ellipse6.png')} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1}} />

      <View style={styles.statsGrid}>
        {renderStatCard('Books', totalBooks, 'In Library', '#FFD700')}
        {renderStatCard('Movies', totalMovies, 'In Collection', '#FF6B6B')}
        {renderStatCard('Characters', totalCharacters, 'Remembered', '#4ECDC4')}
        {renderStatCard('Reviews', totalReviews, 'Written', '#FF8ED4')}
      </View>

      <View style={styles.chartsSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        
        {renderChartCard('Reading Progress', (
          <View style={styles.progressSection}>
            {renderProgressBar('Finished Books', finishedBooks, totalBooks, '#FFD700')}
            {renderProgressBar('Currently Reading', books.filter(b => b.status === 'currently-reading').length, totalBooks, '#FFA500')}
            {renderProgressBar('To Read', books.filter(b => b.status === 'to-read').length, totalBooks, '#FF6B6B')}
          </View>
        ))}

        {renderChartCard('Watching Progress', (
          <View style={styles.progressSection}>
            {renderProgressBar('Finished Movies', finishedMovies, totalMovies, '#FFD700')}
            {renderProgressBar('Currently Watching', movies.filter(m => m.status === 'currently-watching').length, totalMovies, '#FFA500')}
            {renderProgressBar('To Watch', movies.filter(m => m.status === 'to-watch').length, totalMovies, '#FF6B6B')}
          </View>
        ))}

        {renderChartCard('Ratings Overview', (
          <View style={styles.ratingsSection}>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Books Average:</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Text key={star} style={[
                    styles.star,
                    { color: star <= averageBookRating ? '#FFD700' : '#444' }
                  ]}>
                    ★
                  </Text>
                ))}
                <Text style={styles.ratingValue}>{averageBookRating.toFixed(1)}</Text>
              </View>
            </View>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>Movies Average:</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Text key={star} style={[
                    styles.star,
                    { color: star <= averageMovieRating ? '#FFD700' : '#444' }
                  ]}>
                    ★
                  </Text>
                ))}
                <Text style={styles.ratingValue}>{averageMovieRating.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        ))}

        {renderChartCard('Favorites', (
          <View style={styles.favoritesSection}>
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteIcon}>📚</Text>
              <Text style={styles.favoriteText}>{favoriteBooks} Favorite Books</Text>
            </View>
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteIcon}>🎬</Text>
              <Text style={styles.favoriteText}>{favoriteMovies} Favorite Movies</Text>
            </View>
          </View>
        ))}
      </View>

      {/* <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <GoldButton
            title="📚 Add Book"
            onPress={() => {}}
            variant="primary"
            size="medium"
            style={styles.actionButton}
          />
          <GoldButton
            title="🎬 Add Movie"
            onPress={() => {}}
            variant="primary"
            size="medium"
            style={styles.actionButton}
          />
          <GoldButton
            title="⭐ Write Review"
            onPress={() => {}}
            variant="secondary"
            size="medium"
            style={styles.actionButton}
          />
          <GoldButton
            title="👥 Add Character"
            onPress={() => {}}
            variant="secondary"
            size="medium"
            style={styles.actionButton}
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitleText: {
    ...typography.body,
    color: colors.text.secondary,
    opacity: 0.8,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  statCardContainer: {
    width: '100%',
  },
  statCard: {
    backgroundColor: 'transparent',
    padding: spacing.lg,
    marginBottom: 0,
    marginHorizontal: 0,
    borderRadius: borderRadius.medium,
    borderLeftWidth: 4,
  },
  statValue: {
    ...typography.h1,
    color: colors.gold.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  statTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  statSubtitle: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
    opacity: 0.7,
    textAlign: 'center',
  },
  chartsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  chartCardContainer: {
    marginBottom: spacing.lg,
  },
  chartCard: {
    backgroundColor: 'transparent',
    padding: spacing.lg,
    borderRadius: borderRadius.medium,
    marginBottom: 0,
  },
  chartTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  progressSection: {
    gap: 15,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },
  progressValue: {
    ...typography.bodySmall,
    color: colors.gold.primary,
    fontWeight: '600',
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.cosmic.border,
    borderRadius: borderRadius.small,
    overflow: 'hidden',
    ...shadows.small,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.small,
    ...shadows.small,
  },
  ratingsSection: {
    gap: spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  ratingLabel: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 24,
    marginRight: spacing.xs,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  ratingValue: {
    ...typography.body,
    color: colors.gold.primary,
    fontWeight: '600',
    marginLeft: spacing.md,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  favoritesSection: {
    gap: spacing.md,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  favoriteIcon: {
    fontSize: 28,
    marginRight: spacing.md,
    textShadowColor: colors.gold.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  favoriteText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  quickActions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});

export default HomeScreen;
