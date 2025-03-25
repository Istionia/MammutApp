import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instancesReducer, {
  loadRecentInstances,
  addRecentInstance,
  setPopularInstances,
  clearRecentInstances,
  clearRecentInstancesAsync,
  InstancesState
} from '@/store/slices/instancesSlice';
import { MastodonInstance } from '@/store/slices/authSlice';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('instancesSlice', () => {
  // Mock data
  const mockInstance1: MastodonInstance = {
    url: 'https://mastodon.social',
    title: 'Mastodon Social',
    description: 'The original server operated by Mastodon gGmbH',
    version: '4.2.0'
  };

  const mockInstance2: MastodonInstance = {
    url: 'https://fosstodon.org',
    title: 'Fosstodon',
    description: 'A Mastodon instance for open source enthusiasts',
    version: '4.1.0'
  };

  const mockInstance3: MastodonInstance = {
    url: 'https://mstdn.social',
    title: 'Mstdn Social',
    description: 'A general-purpose Mastodon instance',
    version: '4.0.2'
  };

  // Create a test store with the instances reducer
  const createTestStore = () => {
    return configureStore({
      reducer: {
        instances: instancesReducer,
      },
    });
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('reducers', () => {
    it('should handle setPopularInstances', () => {
      const store = createTestStore();
      const popularInstances = [mockInstance1, mockInstance2];
      
      store.dispatch(setPopularInstances(popularInstances));
      
      const state = store.getState().instances;
      expect(state.popularInstances).toEqual(popularInstances);
    });

    it('should handle clearRecentInstances', () => {
      const store = createTestStore();
      // First, set up some recent instances
      store.dispatch({
        type: 'instances/loadRecentInstances/fulfilled',
        payload: [mockInstance1, mockInstance2]
      });
      
      // Then clear them
      store.dispatch(clearRecentInstances());
      
      const state = store.getState().instances;
      expect(state.recentInstances).toEqual([]);
      // We don't directly call AsyncStorage.removeItem in the reducer anymore
      // That's handled by the clearRecentInstancesAsync thunk
    });

    it('should handle clearRecentInstancesAsync', async () => {
      const store = createTestStore();
      // First, set up some recent instances
      store.dispatch({
        type: 'instances/loadRecentInstances/fulfilled',
        payload: [mockInstance1, mockInstance2]
      });
      
      // Mock successful AsyncStorage removal
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValueOnce(undefined);
      
      // Then clear them with the async thunk
      await store.dispatch(clearRecentInstancesAsync());
      
      // Check that AsyncStorage.removeItem was called
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('mammut_recent_instances');
      
      // Check that the state was updated
      const state = store.getState().instances;
      expect(state.recentInstances).toEqual([]);
    });
  });

  describe('async thunks', () => {
    describe('loadRecentInstances', () => {
      it('should load recent instances from storage when available', async () => {
        const recentInstances = [mockInstance1, mockInstance2];
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(recentInstances));
        
        const store = createTestStore();
        await store.dispatch(loadRecentInstances());
        
        const state = store.getState().instances;
        expect(state.recentInstances).toEqual(recentInstances);
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('mammut_recent_instances');
      });

      it('should set empty array when no recent instances are in storage', async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
        
        const store = createTestStore();
        await store.dispatch(loadRecentInstances());
        
        const state = store.getState().instances;
        expect(state.recentInstances).toEqual([]);
      });

      it('should handle loading errors', async () => {
        (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
        
        const store = createTestStore();
        await store.dispatch(loadRecentInstances());
        
        const state = store.getState().instances;
        expect(state.error).toContain('Failed to load recent instances');
      });
    });

    describe('addRecentInstance', () => {
      it('should add a new instance to the beginning of recent instances', async () => {
        // Set up existing instances
        const existingInstances = [mockInstance2, mockInstance3];
        const store = createTestStore();
        store.dispatch({
          type: 'instances/loadRecentInstances/fulfilled',
          payload: existingInstances
        });
        
        // Mock AsyncStorage behavior
        (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);
        
        // Add new instance
        await store.dispatch(addRecentInstance(mockInstance1));
        
        // Check state and AsyncStorage call
        const state = store.getState().instances;
        expect(state.recentInstances[0]).toEqual(mockInstance1);
        expect(state.recentInstances).toHaveLength(3);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'mammut_recent_instances',
          JSON.stringify([mockInstance1, mockInstance2, mockInstance3])
        );
      });

      it('should not duplicate instances and should move existing ones to the beginning', async () => {
        // Set up existing instances
        const existingInstances = [mockInstance2, mockInstance1, mockInstance3];
        const store = createTestStore();
        store.dispatch({
          type: 'instances/loadRecentInstances/fulfilled',
          payload: existingInstances
        });
        
        // Mock AsyncStorage behavior
        (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);
        
        // Add an instance that already exists
        await store.dispatch(addRecentInstance(mockInstance1));
        
        // Check state and AsyncStorage call
        const state = store.getState().instances;
        expect(state.recentInstances[0]).toEqual(mockInstance1);
        expect(state.recentInstances).toHaveLength(3);
        expect(state.recentInstances[1]).toEqual(mockInstance2);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
          'mammut_recent_instances',
          JSON.stringify([mockInstance1, mockInstance2, mockInstance3])
        );
      });

      it('should limit recent instances to 5', async () => {
        // Create 6 instances
        const instances = Array.from({ length: 6 }, (_, i) => ({
          url: `https://instance${i}.social`,
          title: `Instance ${i}`,
          description: `Description ${i}`,
          version: '4.0.0'
        }));
        
        // Set up existing 5 instances
        const store = createTestStore();
        store.dispatch({
          type: 'instances/loadRecentInstances/fulfilled',
          payload: instances.slice(1)
        });
        
        // Mock AsyncStorage behavior
        (AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined);
        
        // Add new instance
        await store.dispatch(addRecentInstance(instances[0]));
        
        // Check that only 5 instances are kept
        const state = store.getState().instances;
        expect(state.recentInstances).toHaveLength(5);
        expect(state.recentInstances[0]).toEqual(instances[0]);
        expect(state.recentInstances[4]).toEqual(instances[4]);
        // The last instance should be dropped
        expect(state.recentInstances.find(i => i.url === instances[5].url)).toBeUndefined();
      });

      it('should handle errors when adding instance', async () => {
        const store = createTestStore();
        (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
        
        await store.dispatch(addRecentInstance(mockInstance1));
        
        const state = store.getState().instances;
        expect(state.error).toContain('Failed to add recent instance');
      });
    });
  });
});