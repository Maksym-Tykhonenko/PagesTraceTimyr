import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addReview, updateReview, removeReview } from '../store/slices/reviewsSlice';



const ReviewsScreen = () => {
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [emotionalRating, setEmotionalRating] = useState(5);
  const [selectedItemType, setSelectedItemType] = useState<'book' | 'movie'>('book');

  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const books = useSelector((state: RootState) => state.library.books);
  const movies = useSelector((state: RootState) => state.library.movies);

  const getItemTitle = (itemId: string, itemType: 'book' | 'movie') => {
    if (itemType === 'book') {
      const book = books.find(b => b.id === itemId);
      return book ? book.title : 'Unknown Book';
    } else {
      const movie = movies.find(m => m.id === itemId);
      return movie ? movie.title : 'Unknown Movie';
    }
  };

  const handleSaveReview = () => {
    if (reviewTitle.trim() && reviewContent.trim()) {
      if (editingReview) {
        dispatch(updateReview({
          id: editingReview.id,
          title: reviewTitle.trim(),
          content: reviewContent.trim(),
          rating: reviewRating,
          emotionalRating,
        }));
      } else {
        const newReview = {
          id: Date.now().toString(),
          itemId: Date.now().toString(), // This would normally come from item selection
          itemType: selectedItemType,
          rating: reviewRating,
          title: reviewTitle.trim(),
          content: reviewContent.trim(),
          emotionalRating,
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        dispatch(addReview(newReview));
      }
      
      resetForm();
      setShowAddReviewModal(false);
    }
  };

  const handleEditReview = (review: any) => {
    setEditingReview(review);
    setReviewTitle(review.title);
    setReviewContent(review.content);
    setReviewRating(review.rating);
    setEmotionalRating(review.emotionalRating);
    setSelectedItemType(review.itemType);
    setShowAddReviewModal(true);
  };

  const handleDeleteReview = (reviewId: string) => {
    dispatch(removeReview(reviewId));
  };

  const resetForm = () => {
    setEditingReview(null);
    setReviewTitle('');
    setReviewContent('');
    setReviewRating(5);
    setEmotionalRating(5);
    setSelectedItemType('book');
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onPress && onPress(star)}
          disabled={!onPress}
        >
          <Text style={[
            styles.star,
            { color: star <= rating ? '#FFD700' : '#444' }
          ]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderReviewItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewInfo}>
          <Text style={styles.itemTitle}>
            {getItemTitle(item.itemId, item.itemType)}
          </Text>
          <Text style={styles.itemType}>
            {item.itemType === 'book' ? '📚 Book' : '🎬 Movie'}
          </Text>
        </View>
        <View style={styles.reviewActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditReview(item)}
          >
            <Text style={styles.actionButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteReview(item.id)}
          >
            <Text style={styles.actionButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.reviewTitle}>{item.title}</Text>
      <Text style={styles.reviewContent}>{item.content}</Text>

      <View style={styles.reviewMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Rating:</Text>
          {renderStars(item.rating)}
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Emotional Impact:</Text>
          {renderStars(item.emotionalRating)}
        </View>
      </View>

      <Text style={styles.reviewDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
                  <Image source={require('../assets/images/Ellipse6.png')} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reviews</Text>
        <Text style={styles.headerSubtitle}>Your thoughts on stories</Text>
      </View>

      {reviews.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>⭐</Text>
          <Text style={styles.emptyTitle}>No Reviews Yet</Text>
          <Text style={styles.emptyText}>
            Start sharing your thoughts on the books and movies you love
          </Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.reviewsList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddReviewModal(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddReviewModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddReviewModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingReview ? 'Edit Review' : 'New Review'}
              </Text>
              <TouchableOpacity onPress={() => {
                setShowAddReviewModal(false);
                resetForm();
              }}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Review Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={reviewTitle}
                  onChangeText={setReviewTitle}
                  placeholder="Give your review a title"
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Content</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={reviewContent}
                  onChangeText={setReviewContent}
                  placeholder="Share your thoughts..."
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Rating</Text>
                {renderStars(reviewRating, setReviewRating)}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Emotional Impact</Text>
                {renderStars(emotionalRating, setEmotionalRating)}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Item Type</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[styles.typeOption, selectedItemType === 'book' && styles.activeTypeOption]}
                    onPress={() => setSelectedItemType('book')}
                  >
                    <Text style={[styles.typeOptionText, selectedItemType === 'book' && styles.activeTypeOptionText]}>
                      📚 Book
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.typeOption, selectedItemType === 'movie' && styles.activeTypeOption]}
                    onPress={() => setSelectedItemType('movie')}
                  >
                    <Text style={[styles.typeOptionText, selectedItemType === 'movie' && styles.activeTypeOptionText]}>
                      🎬 Movie
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveButton, (!reviewTitle.trim() || !reviewContent.trim()) && styles.saveButtonDisabled]}
              onPress={handleSaveReview}
              disabled={!reviewTitle.trim() || !reviewContent.trim()}
            >
              <Text style={styles.saveButtonText}>
                {editingReview ? 'Update Review' : 'Save Review'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    opacity: 0.8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  reviewsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  reviewInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  itemType: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '500',
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
  },
  actionButtonText: {
    fontSize: 18,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  reviewContent: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 15,
  },
  reviewMetrics: {
    gap: 10,
    marginBottom: 15,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    minWidth: 120,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  star: {
    fontSize: 20,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  closeButton: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 4,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTypeOption: {
    backgroundColor: '#FFD700',
  },
  typeOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeTypeOptionText: {
    color: '#0A0A0A',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 24,
  },
  saveButtonDisabled: {
    backgroundColor: '#444',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A0A0A',
  },
});

export default ReviewsScreen;
