import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOnboardingCompleted: boolean;
  isLoading: boolean;
  theme: 'dark' | 'light';
}

const initialState: AppState = {
  isOnboardingCompleted: false,
  isLoading: true,
  theme: 'dark',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setOnboardingCompleted, setLoading, setTheme } = appSlice.actions;
export default appSlice.reducer;

