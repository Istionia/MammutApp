import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from '@/store/slices/authSlice';
import themeReducer from '@/store/slices/themeSlice';
import instancesReducer from '@/store/slices/instancesSlice';

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

// Instances persistence configuration
const instancesPersistConfig = {
  key: 'instances',
  storage: AsyncStorage,
  whitelist: ['recentInstances', 'popularInstances'], // Persist both recent and popular instances
};

// Create the root reducer by combining all slice reducers
export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: themeReducer,
  instances: persistReducer(instancesPersistConfig, instancesReducer),
  // Add more reducers here as they are created
}); 