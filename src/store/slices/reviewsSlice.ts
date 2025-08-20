import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
  id: string;
  itemId: string;
  itemType: 'book' | 'movie';
  rating: number;
  title: string;
  content: string;
  emotionalRating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    updateReview: (state, action: PayloadAction<Partial<Review> & { id: string }>) => {
      const index = state.reviews.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = { 
          ...state.reviews[index], 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);
    },
  },
});

export const {
  addReview,
  updateReview,
  removeReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;

