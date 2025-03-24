import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

// Configuration for the root persisted reducer
export const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'], // Only persist theme by default
};

// Authentication persistence configuration
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token', 'refreshToken', 'instanceUrl'], // Only persist authentication tokens
};

// Create the root reducer by combining all slice reducers
export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: themeReducer,
  // Add more reducers here as they are created
}); 