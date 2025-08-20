import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addCharacter, removeCharacter, updateCharacter } from '../store/slices/charactersSlice';
import { colors, shadows, typography, spacing, borderRadius } from '../styles/theme';
import GoldCard from '../components/GoldCard';
import GoldButton from '../components/GoldButton';

const CharactersScreen = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters.characters);
  const categories = useSelector((state: RootState) => state.characters.categories);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    ]).start();
  }, []);

  const filteredCharacters = characters.filter(character => {
    const matchesCategory = selectedCategory === 'all' || character.category === selectedCategory;
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         character.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCharacterCard = ({ item }: { item: any }) => (
    <GoldCard style={styles.characterCard} glowIntensity="medium">
      <View style={styles.characterContent}>
        <View style={styles.characterHeader}>
          <View style={styles.characterImageContainer}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.characterImage} />
            ) : (
              <View style={[styles.characterImagePlaceholder, { backgroundColor: colors.cosmic.tertiary }]}>
                <Text style={styles.characterImagePlaceholderText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.characterInfo}>
            <Text style={styles.characterName}>{item.name}</Text>
            <Text style={styles.characterSource}>{item.source}</Text>
            <Text style={styles.characterSourceType}>{item.sourceType}</Text>
          </View>
          <TouchableOpacity
            style={[styles.favoriteButton, item.isFavorite && styles.favoriteButtonActive]}
            onPress={() => dispatch(updateCharacter({ id: item.id, isFavorite: !item.isFavorite }))}
          >
            <Text style={styles.favoriteIcon}>
              {item.isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.characterDescription}>{item.description}</Text>
        
        <View style={styles.characterFooter}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.characterDate}>
            {new Date(item.addedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </GoldCard>
  );

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : colors.cosmic.border;
  };

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilterContainer}
    >
      <TouchableOpacity
        style={[
          styles.categoryFilterButton,
          selectedCategory === 'all' && styles.categoryFilterButtonActive
        ]}
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={[
          styles.categoryFilterText,
          selectedCategory === 'all' && styles.categoryFilterTextActive
        ]}>
          All
        </Text>
      </TouchableOpacity>
      
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryFilterButton,
            selectedCategory === category.name && styles.categoryFilterButtonActive
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Text style={[
            styles.categoryFilterText,
            selectedCategory === category.name && styles.categoryFilterTextActive
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <GoldCard style={styles.statCard} glowIntensity="low">
        <View style={styles.statContent}>
          <Text style={styles.statValue}>{characters.length}</Text>
          <Text style={styles.statLabel}>Total Characters</Text>
        </View>
      </GoldCard>
      
      <GoldCard style={styles.statCard} glowIntensity="low">
        <View style={styles.statContent}>
          <Text style={styles.statValue}>
            {characters.filter(char => char.isFavorite).length}
          </Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </GoldCard>
      
      <GoldCard style={styles.statCard} glowIntensity="low">
        <View style={styles.statContent}>
          <Text style={styles.statValue}>{categories.length}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </GoldCard>
    </View>
  );

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <Image source={require('../assets/images/Ellipse6.png')} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Characters</Text>
          <Text style={styles.subtitle}>Manage your favorite characters</Text>
        </View>

        {renderStats()}
        {renderCategoryFilter()}

        <View style={styles.charactersList}>
          {filteredCharacters.length > 0 ? (
            <FlatList
              data={filteredCharacters}
              renderItem={renderCharacterCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <GoldCard style={styles.emptyState} glowIntensity="low">
              <View style={styles.emptyStateContent}>
                <Text style={styles.emptyStateIcon}>👥</Text>
                <Text style={styles.emptyStateTitle}>No Characters Yet</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Start adding characters from your favorite books and movies
                </Text>
                <GoldButton
                  title="Add Character"
                  onPress={() => {/* TODO: Navigate to add character screen */}}
                  style={styles.addCharacterButton}
                />
              </View>
            </GoldCard>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  statValue: {
    ...typography.h2,
    color: colors.gold.primary,
    marginBottom: spacing.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  categoryFilterContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryFilterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.cosmic.surface,
    borderWidth: 1,
    borderColor: colors.cosmic.border,
  },
  categoryFilterButtonActive: {
    backgroundColor: colors.gold.primary,
    borderColor: colors.gold.primary,
  },
  categoryFilterText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  categoryFilterTextActive: {
    color: colors.cosmic.primary,
    fontWeight: '600',
  },
  charactersList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  characterCard: {
    marginBottom: spacing.md,
  },
  characterContent: {
    padding: spacing.md,
  },
  characterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  characterImageContainer: {
    marginRight: spacing.md,
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.medium,
  },
  characterImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImagePlaceholderText: {
    ...typography.h2,
    color: colors.text.primary,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  characterSource: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  characterSourceType: {
    ...typography.caption,
    color: colors.gold.primary,
    textTransform: 'capitalize',
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  favoriteButtonActive: {
    // Active state styling
  },
  favoriteIcon: {
    fontSize: 20,
  },
  characterDescription: {
    ...typography.body,
    color: colors.text.tertiary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  characterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  characterDate: {
    ...typography.caption,
    color: colors.text.muted,
  },
  emptyState: {
    marginTop: spacing.xl,
  },
  emptyStateContent: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  addCharacterButton: {
    minWidth: 150,
  },
});

export default CharactersScreen;
