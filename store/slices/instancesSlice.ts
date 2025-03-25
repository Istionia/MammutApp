import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MastodonInstance } from '@/store/slices/authSlice';

// Storage key for recently used instances
const RECENT_INSTANCES_KEY = 'mammut_recent_instances';

// Interface for the instances state
export interface InstancesState {
  recentInstances: MastodonInstance[];
  popularInstances: MastodonInstance[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: InstancesState = {
  recentInstances: [],
  popularInstances: [
    {
      url: 'https://mastodon.social',
      title: 'Mastodon Social',
      description: 'The original server operated by the Mastodon gGmbH non-profit',
      version: ''
    },
    {
      url: 'https://fosstodon.org',
      title: 'Fosstodon',
      description: 'A Mastodon instance for open source enthusiasts',
      version: ''
    },
    {
      url: 'https://mstdn.social',
      title: 'Mstdn Social',
      description: 'A general-purpose Mastodon instance',
      version: ''
    }
  ],
  isLoading: false,
  error: null
};

// Async thunk to load recently used instances
export const loadRecentInstances = createAsyncThunk(
  'instances/loadRecentInstances',
  async (_, { rejectWithValue }) => {
    try {
      const recentInstancesJson = await AsyncStorage.getItem(RECENT_INSTANCES_KEY);
      if (recentInstancesJson) {
        return JSON.parse(recentInstancesJson) as MastodonInstance[];
      }
      return [];
    } catch (error) {
      console.error('Failed to load recent instances:', error);
      return rejectWithValue('Failed to load recent instances');
    }
  }
);

// Async thunk to add a recently used instance
export const addRecentInstance = createAsyncThunk(
  'instances/addRecentInstance',
  async (instance: MastodonInstance, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { instances: InstancesState };
      
      // Create a new array with the current instance at the beginning
      const updatedInstances = [
        instance,
        ...state.instances.recentInstances.filter(
          (i) => i.url !== instance.url
        ),
      ].slice(0, 5); // Keep only the 5 most recent instances
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(
        RECENT_INSTANCES_KEY,
        JSON.stringify(updatedInstances)
      );
      
      return updatedInstances;
    } catch (error) {
      console.error('Failed to add recent instance:', error);
      return rejectWithValue('Failed to add recent instance');
    }
  }
);

// Async thunk to clear recent instances
export const clearRecentInstancesAsync = createAsyncThunk(
  'instances/clearRecentInstancesAsync',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem(RECENT_INSTANCES_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear recent instances:', error);
      return rejectWithValue('Failed to clear recent instances');
    }
  }
);

// Create the instances slice
const instancesSlice = createSlice({
  name: 'instances',
  initialState,
  reducers: {
    setPopularInstances: (state, action: PayloadAction<MastodonInstance[]>) => {
      state.popularInstances = action.payload;
    },
    clearRecentInstances: (state) => {
      state.recentInstances = [];
      // Actual storage clearing is handled by the clearRecentInstancesAsync thunk
      // This will be dispatched by the component using this action
    },
  },
  extraReducers: (builder) => {
    // Load recent instances
    builder.addCase(loadRecentInstances.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadRecentInstances.fulfilled, (state, action) => {
      state.recentInstances = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadRecentInstances.rejected, (state, action) => {
      state.error = action.payload as string || 'Failed to load recent instances';
      state.isLoading = false;
    });
    
    // Add recent instance
    builder.addCase(addRecentInstance.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addRecentInstance.fulfilled, (state, action) => {
      state.recentInstances = action.payload;
    });
    builder.addCase(addRecentInstance.rejected, (state, action) => {
      state.error = action.payload as string || 'Failed to add recent instance';
    });
    
    // Clear recent instances
    builder.addCase(clearRecentInstancesAsync.fulfilled, (state) => {
      state.recentInstances = [];
    });
    builder.addCase(clearRecentInstancesAsync.rejected, (state, action) => {
      state.error = action.payload as string || 'Failed to clear recent instances';
    });
  },
});

// Export actions
export const { setPopularInstances, clearRecentInstances } = instancesSlice.actions;

// Export reducer
export default instancesSlice.reducer; 