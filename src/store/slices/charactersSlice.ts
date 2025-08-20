import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Character {
  id: string;
  name: string;
  source: string;
  sourceType: 'book' | 'movie';
  image?: string;
  description: string;
  category: string;
  isFavorite: boolean;
  addedAt: string;
}

export interface CharacterCategory {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

interface CharactersState {
  characters: Character[];
  categories: CharacterCategory[];
}

const initialState: CharactersState = {
  characters: [],
  categories: [
    {
      id: '1',
      name: 'Heroes',
      color: '#FFD700',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Villains',
      color: '#FF6B6B',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Side Characters',
      color: '#4ECDC4',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Love Interests',
      color: '#FF8ED4',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Mentors',
      color: '#A8E6CF',
      createdAt: new Date().toISOString(),
    },
  ],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    updateCharacter: (state, action: PayloadAction<Partial<Character> & { id: string }>) => {
      const index = state.characters.findIndex(character => character.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = { ...state.characters[index], ...action.payload };
      }
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(character => character.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<CharacterCategory>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
});

export const {
  addCharacter,
  updateCharacter,
  removeCharacter,
  addCategory,
  removeCategory,
} = charactersSlice.actions;

export default charactersSlice.reducer;

