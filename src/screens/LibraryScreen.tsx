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
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addFolder, addBook, addMovie } from '../store/slices/librarySlice';
import { colors, shadows, typography, spacing, borderRadius } from '../styles/theme';
import GoldCard from '../components/GoldCard';
import GoldButton from '../components/GoldButton';

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'movies'>('books');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderType, setNewFolderType] = useState<'books' | 'movies'>('books');
  
  // New item states
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemAuthor, setNewItemAuthor] = useState('');
  const [newItemRating, setNewItemRating] = useState(5);
  const [newItemStatus, setNewItemStatus] = useState<'to-read' | 'currently-reading' | 'finished'>('to-read');

  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.library.folders);
  const books = useSelector((state: RootState) => state.library.books);
  const movies = useSelector((state: RootState) => state.library.movies);

  const bookFolders = folders.filter(folder => folder.type === 'books');
  const movieFolders = folders.filter(folder => folder.type === 'movies');

  const getItemCount = (folderId: string) => {
    if (activeTab === 'books') {
      return books.filter(book => book.folderId === folderId).length;
    } else {
      return movies.filter(movie => movie.folderId === folderId).length;
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        type: newFolderType,
        createdAt: new Date().toISOString(),
      };
      dispatch(addFolder(newFolder));
      setNewFolderName('');
      setShowNewFolderModal(false);
    }
  };

  const handleFolderPress = (folder: any) => {
    setSelectedFolder(folder);
    setShowAddItemModal(true);
  };

  const handleAddItem = () => {
    if (newItemTitle.trim() && newItemAuthor.trim()) {
      if (activeTab === 'books') {
        const newBook = {
          id: Date.now().toString(),
          title: newItemTitle.trim(),
          author: newItemAuthor.trim(),
          rating: newItemRating,
          status: newItemStatus,
          isFavorite: false,
          isInWishlist: false,
          folderId: selectedFolder.id,
          addedAt: new Date().toISOString(),
        };
        dispatch(addBook(newBook));
      } else {
        const newMovie = {
          id: Date.now().toString(),
          title: newItemTitle.trim(),
          director: newItemAuthor.trim(),
          rating: newItemRating,
          status: newItemStatus === 'to-read' ? 'to-watch' : 
                  newItemStatus === 'currently-reading' ? 'currently-watching' : 'finished',
          isFavorite: false,
          isInWishlist: false,
          folderId: selectedFolder.id,
          addedAt: new Date().toISOString(),
        };
        dispatch(addMovie(newMovie));
      }
      
      // Reset form
      setNewItemTitle('');
      setNewItemAuthor('');
      setNewItemRating(5);
      setNewItemStatus('to-read');
      setShowAddItemModal(false);
      setSelectedFolder(null);
      
      Alert.alert('Success', `${activeTab === 'books' ? 'Book' : 'Movie'} added to ${selectedFolder.name}!`);
    }
  };

  const resetItemForm = () => {
    setNewItemTitle('');
    setNewItemAuthor('');
    setNewItemRating(5);
    setNewItemStatus('to-read');
    setSelectedFolder(null);
  };

  const renderFolderItem = (folder: any) => (
    <GoldCard key={folder.id} style={styles.folderCardContainer} onPress={() => handleFolderPress(folder)}>
      <View style={styles.folderItem}>
        <View style={styles.folderIcon}>
          <Text style={styles.folderIconText}>
            {folder.name.includes('Read') ? '📖' : 
             folder.name.includes('Watch') ? '🎬' : 
             folder.name.includes('Favorite') ? '❤️' : 
             folder.name.includes('Wish') ? '⭐' : '📁'}
          </Text>
        </View>
        <View style={styles.folderInfo}>
          <Text style={styles.folderName}>{folder.name}</Text>
          <Text style={styles.folderCount}>({getItemCount(folder.id)})</Text>
        </View>
        <View style={styles.folderActions}>
          <Text style={styles.folderActionText}>Tap to add items</Text>
        </View>
      </View>
    </GoldCard>
  );

  return (
    <View style={styles.container}>
            <Image source={require('../assets/images/Ellipse6.png')} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>LIBRARY</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'books' && styles.activeTab]}
          onPress={() => setActiveTab('books')}
        >
          <Text style={[styles.tabText, activeTab === 'books' && styles.activeTabText]}>
            Books
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'movies' && styles.activeTab]}
          onPress={() => setActiveTab('movies')}
        >
          <Text style={[styles.tabText, activeTab === 'movies' && styles.activeTabText]}>
            Movies
          </Text>
        </TouchableOpacity>
      </View>


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.foldersContainer}>
          {activeTab === 'books' 
            ? bookFolders.map(renderFolderItem)
            : movieFolders.map(renderFolderItem)
          }
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowNewFolderModal(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Add Item Modal */}
      <Modal
        visible={showAddItemModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowAddItemModal(false);
          resetItemForm();
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Add {activeTab === 'books' ? 'Book' : 'Movie'} to {selectedFolder?.name}
              </Text>
              <TouchableOpacity onPress={() => {
                setShowAddItemModal(false);
                resetItemForm();
              }}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {activeTab === 'books' ? 'Book' : 'Movie'} Title
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={newItemTitle}
                  onChangeText={setNewItemTitle}
                  placeholder={`Enter ${activeTab === 'books' ? 'book' : 'movie'} title`}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {activeTab === 'books' ? 'Author' : 'Director'}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={newItemAuthor}
                  onChangeText={setNewItemAuthor}
                  placeholder={`Enter ${activeTab === 'books' ? 'author' : 'director'} name`}
                  placeholderTextColor="#666"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Rating</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setNewItemRating(star)}
                      style={styles.starButton}
                    >
                      <Text style={[
                        styles.star,
                        { color: star <= newItemRating ? colors.gold.primary : '#444' }
                      ]}>
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Status</Text>
                <View style={styles.statusSelector}>
                  <TouchableOpacity
                    style={[styles.statusOption, newItemStatus === 'to-read' && styles.activeStatusOption]}
                    onPress={() => setNewItemStatus('to-read')}
                  >
                    <Text style={[styles.statusOptionText, newItemStatus === 'to-read' && styles.activeStatusOptionText]}>
                      {activeTab === 'books' ? 'To Read' : 'To Watch'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusOption, newItemStatus === 'currently-reading' && styles.activeStatusOption]}
                    onPress={() => setNewItemStatus('currently-reading')}
                  >
                    <Text style={[styles.statusOptionText, newItemStatus === 'currently-reading' && styles.activeStatusOptionText]}>
                      {activeTab === 'books' ? 'Currently Reading' : 'Currently Watching'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusOption, newItemStatus === 'finished' && styles.activeStatusOption]}
                    onPress={() => setNewItemStatus('finished')}
                  >
                    <Text style={[styles.statusOptionText, newItemStatus === 'finished' && styles.activeStatusOptionText]}>
                      Finished
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <GoldButton
                title="Cancel"
                onPress={() => {
                  setShowAddItemModal(false);
                  resetItemForm();
                }}
                variant="outline"
                size="medium"
                style={styles.cancelButton}
              />
              <GoldButton
                title={`Add ${activeTab === 'books' ? 'Book' : 'Movie'}`}
                onPress={handleAddItem}
                variant="primary"
                size="medium"
                style={styles.addButton}
                disabled={!newItemTitle.trim() || !newItemAuthor.trim()}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showNewFolderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNewFolderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NEW FOLDER</Text>
              <TouchableOpacity onPress={() => setShowNewFolderModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Folder Name</Text>
              <TextInput
                style={styles.textInput}
                value={newFolderName}
                onChangeText={setNewFolderName}
                placeholder="Enter folder name"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Select Type</Text>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  style={[styles.typeOption, newFolderType === 'books' && styles.activeTypeOption]}
                  onPress={() => setNewFolderType('books')}
                >
                  <Text style={[styles.typeOptionText, newFolderType === 'books' && styles.activeTypeOptionText]}>
                    Books
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeOption, newFolderType === 'movies' && styles.activeTypeOption]}
                  onPress={() => setNewFolderType('movies')}
                >
                  <Text style={[styles.typeOptionText, newFolderType === 'movies' && styles.activeTypeOptionText]}>
                    Movies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.createButton, !newFolderName.trim() && styles.createButtonDisabled]}
              onPress={handleCreateFolder}
              disabled={!newFolderName.trim()}
            >
              <Text style={styles.createButtonText}>Create</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFD700',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#0A0A0A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  foldersContainer: {
    gap: 15,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  folderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  folderIconText: {
    fontSize: 20,
  },
  folderInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  folderName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  folderCount: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
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
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 1,
  },
  closeButton: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
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
  createButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonDisabled: {
    backgroundColor: '#444',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A0A0A',
  },
  
  // New styles for folder cards and add item modal
  folderCardContainer: {
    marginBottom: 16,
  },
  folderActions: {
    alignItems: 'center',
    marginTop: 8,
  },
  folderActionText: {
    fontSize: 12,
    color: '#FFD700',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  
  // Add Item Modal Styles
  modalBody: {
    padding: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    gap: 16,
  },
  cancelButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 24,
  },
  statusSelector: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 4,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeStatusOption: {
    backgroundColor: '#FFD700',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeStatusOptionText: {
    color: '#0A0A0A',
  },
});

export default LibraryScreen;
