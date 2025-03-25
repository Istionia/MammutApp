import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  setInstance,
  setToken,
  setAccount,
  logout,
  setError,
  clearError,
  initializeAuth,
  saveAuthData,
  logoutUser,
  MastodonToken,
  MastodonInstance,
  MastodonAccount,
  AuthState
} from '@/store/slices/authSlice';
import AuthStorage from '@/services/mastodon/AuthStorage';

// Mock the AuthStorage
jest.mock('@/services/mastodon/AuthStorage', () => ({
  getToken: jest.fn(),
  getAccount: jest.fn(),
  getInstance: jest.fn(),
  saveToken: jest.fn(),
  saveAccount: jest.fn(),
  saveInstance: jest.fn(),
  clearAuthData: jest.fn(),
}));

describe('authSlice', () => {
  // Mock data
  const mockToken: MastodonToken = {
    accessToken: 'token_123',
    refreshToken: 'refresh_456',
    createdAt: Date.now(),
    expiresIn: 3600,
    scope: 'read write follow',
    tokenType: 'Bearer'
  };

  const mockInstance: MastodonInstance = {
    url: 'https://mastodon.social',
    title: 'Mastodon Social',
    description: 'The original server operated by Mastodon gGmbH',
    version: '4.2.0'
  };

  const mockAccount: MastodonAccount = {
    id: 'user123',
    username: 'testuser',
    acct: 'testuser@mastodon.social',
    displayName: 'Test User',
    avatarUrl: 'https://mastodon.social/avatar.png',
    headerUrl: 'https://mastodon.social/header.png'
  };

  // Create a test store with the auth reducer
  const createTestStore = () => {
    return configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  };

  // Initial state for testing
  let initialState: AuthState;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Reset initial state
    initialState = {
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,
      account: null,
      instance: null,
      instanceUrl: null,
    };
  });

  describe('reducers', () => {
    it('should handle setInstance', () => {
      const store = createTestStore();
      store.dispatch(setInstance(mockInstance));

      const state = store.getState().auth;
      expect(state.instance).toEqual(mockInstance);
      expect(state.instanceUrl).toBe(mockInstance.url);
    });

    it('should handle setToken', () => {
      const store = createTestStore();
      store.dispatch(setToken(mockToken));

      const state = store.getState().auth;
      expect(state.token).toEqual(mockToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle setAccount', () => {
      const store = createTestStore();
      store.dispatch(setAccount(mockAccount));

      const state = store.getState().auth;
      expect(state.account).toEqual(mockAccount);
    });

    it('should handle logout', () => {
      // Set up an authenticated state first
      const store = createTestStore();
      store.dispatch(setToken(mockToken));
      store.dispatch(setAccount(mockAccount));
      store.dispatch(setInstance(mockInstance));

      // Then logout
      store.dispatch(logout());

      // Check that auth state is reset but instance is kept
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.account).toBeNull();
      expect(state.instance).toEqual(mockInstance); // Instance is kept for easier re-login
    });

    it('should handle setError', () => {
      const store = createTestStore();
      const errorMessage = 'Authentication failed';
      store.dispatch(setError(errorMessage));

      const state = store.getState().auth;
      expect(state.error).toBe(errorMessage);
    });

    it('should handle clearError', () => {
      const store = createTestStore();
      // Set error first
      store.dispatch(setError('Some error'));
      // Then clear it
      store.dispatch(clearError());

      const state = store.getState().auth;
      expect(state.error).toBeNull();
    });
  });

  describe('async thunks', () => {
    describe('initializeAuth', () => {
      it('should initialize auth state from storage when data exists', async () => {
        // Mock storage returns
        (AuthStorage.getToken as jest.Mock).mockResolvedValueOnce(mockToken);
        (AuthStorage.getAccount as jest.Mock).mockResolvedValueOnce(mockAccount);
        (AuthStorage.getInstance as jest.Mock).mockResolvedValueOnce(mockInstance);

        const store = createTestStore();
        await store.dispatch(initializeAuth());

        // Check that state was updated with stored values
        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(true);
        expect(state.token).toEqual(mockToken);
        expect(state.account).toEqual(mockAccount);
        expect(state.instance).toEqual(mockInstance);
      });

      it('should not update auth state when no data exists in storage', async () => {
        // Mock storage returns null
        (AuthStorage.getToken as jest.Mock).mockResolvedValueOnce(null);
        (AuthStorage.getAccount as jest.Mock).mockResolvedValueOnce(null);
        (AuthStorage.getInstance as jest.Mock).mockResolvedValueOnce(null);

        const store = createTestStore();
        await store.dispatch(initializeAuth());

        // Check that state remains unchanged
        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(false);
        expect(state.token).toBeNull();
        expect(state.account).toBeNull();
        expect(state.instance).toBeNull();
      });

      it('should handle initialization failure gracefully', async () => {
        // Mock storage throws
        (AuthStorage.getToken as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

        const store = createTestStore();
        await store.dispatch(initializeAuth());

        // Should not crash and state should remain unchanged
        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(false);
        expect(state.error).toContain('Failed to initialize');
      });
    });

    describe('saveAuthData', () => {
      it('should save token to storage', async () => {
        const store = createTestStore();
        await store.dispatch(saveAuthData({ token: mockToken }));

        expect(AuthStorage.saveToken).toHaveBeenCalledWith(mockToken);
      });

      it('should save account to storage', async () => {
        const store = createTestStore();
        await store.dispatch(saveAuthData({ account: mockAccount }));

        expect(AuthStorage.saveAccount).toHaveBeenCalledWith(mockAccount);
      });

      it('should save instance to storage', async () => {
        const store = createTestStore();
        await store.dispatch(saveAuthData({ instance: mockInstance }));

        expect(AuthStorage.saveInstance).toHaveBeenCalledWith(mockInstance);
      });

      it('should save multiple items when provided', async () => {
        const store = createTestStore();
        await store.dispatch(saveAuthData({
          token: mockToken,
          account: mockAccount,
          instance: mockInstance,
        }));

        expect(AuthStorage.saveToken).toHaveBeenCalledWith(mockToken);
        expect(AuthStorage.saveAccount).toHaveBeenCalledWith(mockAccount);
        expect(AuthStorage.saveInstance).toHaveBeenCalledWith(mockInstance);
      });

      it('should handle save errors', async () => {
        // Mock storage throws
        (AuthStorage.saveToken as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

        const store = createTestStore();
        await store.dispatch(saveAuthData({ token: mockToken }));

        // Should set error state
        const state = store.getState().auth;
        expect(state.error).toContain('Failed to save authentication data');
      });
    });

    describe('logoutUser', () => {
      it('should clear auth data from storage and state', async () => {
        // Set up an authenticated state first
        const store = createTestStore();
        store.dispatch(setToken(mockToken));
        store.dispatch(setAccount(mockAccount));

        await store.dispatch(logoutUser());

        // Should call clearAuthData
        expect(AuthStorage.clearAuthData).toHaveBeenCalled();

        // Should update state
        const state = store.getState().auth;
        expect(state.isAuthenticated).toBe(false);
        expect(state.token).toBeNull();
        expect(state.account).toBeNull();
      });

      it('should handle logout errors', async () => {
        // Mock storage throws
        (AuthStorage.clearAuthData as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));

        const store = createTestStore();
        await store.dispatch(logoutUser());

        // Should set error state
        const state = store.getState().auth;
        expect(state.error).toContain('Failed to logout');
      });
    });
  });
}); 