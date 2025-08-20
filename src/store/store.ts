import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './slices/appSlice';
import libraryReducer from './slices/librarySlice';
import charactersReducer from './slices/charactersSlice';
import reviewsReducer from './slices/reviewsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'library', 'characters', 'reviews'],
};

const persistedAppReducer = persistReducer(persistConfig, appReducer);
const persistedLibraryReducer = persistReducer(persistConfig, libraryReducer);
const persistedCharactersReducer = persistReducer(persistConfig, charactersReducer);
const persistedReviewsReducer = persistReducer(persistConfig, reviewsReducer);

export const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    library: persistedLibraryReducer,
    characters: persistedCharactersReducer,
    reviews: persistedReviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

