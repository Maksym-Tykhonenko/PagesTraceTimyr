import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  rating: number;
  status: 'to-read' | 'currently-reading' | 'finished';
  isFavorite: boolean;
  isInWishlist: boolean;
  folderId?: string;
  addedAt: string;
  completedAt?: string;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  posterImage?: string;
  rating: number;
  status: 'to-watch' | 'currently-watching' | 'finished';
  isFavorite: boolean;
  isInWishlist: boolean;
  folderId?: string;
  addedAt: string;
  completedAt?: string;
}

export interface Folder {
  id: string;
  name: string;
  type: 'books' | 'movies';
  createdAt: string;
}

interface LibraryState {
  books: Book[];
  movies: Movie[];
  folders: Folder[];
}

const initialState: LibraryState = {
  books: [],
  movies: [],
  folders: [
    {
      id: '1',
      name: 'To Read',
      type: 'books',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Currently Reading',
      type: 'books',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Finished',
      type: 'books',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Favorites',
      type: 'books',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Wish List',
      type: 'books',
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'To Watch',
      type: 'movies',
      createdAt: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'Currently Watching',
      type: 'movies',
      createdAt: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'Finished',
      type: 'movies',
      createdAt: new Date().toISOString(),
    },
    {
      id: '9',
      name: 'Favorites',
      type: 'movies',
      createdAt: new Date().toISOString(),
    },
    {
      id: '10',
      name: 'Wish List',
      type: 'movies',
      createdAt: new Date().toISOString(),
    },
  ],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Partial<Book> & { id: string }>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...action.payload };
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    updateMovie: (state, action: PayloadAction<Partial<Movie> & { id: string }>) => {
      const index = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (index !== -1) {
        state.movies[index] = { ...state.movies[index], ...action.payload };
      }
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter(folder => folder.id !== action.payload);
    },
  },
});

export const {
  addBook,
  updateBook,
  removeBook,
  addMovie,
  updateMovie,
  removeMovie,
  addFolder,
  removeFolder,
} = librarySlice.actions;

export default librarySlice.reducer;

