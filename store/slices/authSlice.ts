import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthStorage from '@/services/mastodon/AuthStorage';

// Types
export interface MastodonToken {
  accessToken: string;
  refreshToken: string | null;
  createdAt: number;
  expiresIn: number | null;
  scope: string;
  tokenType: string;
}

export interface MastodonAccount {
  id: string;
  username: string;
  acct: string;
  displayName: string;
  avatarUrl: string;
  headerUrl: string;
}

export interface MastodonInstance {
  url: string;
  title: string;
  description: string;
  version: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: MastodonToken | null;
  account: MastodonAccount | null;
  instance: MastodonInstance | null;
  instanceUrl: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  account: null,
  instance: null,
  instanceUrl: null,
};

// Async thunks
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Check for stored auth data
      const [token, account, instance] = await Promise.all([
        AuthStorage.getToken(),
        AuthStorage.getAccount(),
        AuthStorage.getInstance(),
      ]);

      // If we have a token, set the authenticated state
      if (token) {
        dispatch(setToken(token));
      }

      // If we have account info, set it
      if (account) {
        dispatch(setAccount(account));
      }

      // If we have instance info, set it
      if (instance) {
        dispatch(setInstance(instance));
      }

      // Return initialization success
      return true;
    } catch (error) {
      console.error('Auth initialization failed:', error);
      return rejectWithValue('Failed to initialize authentication');
    }
  }
);

export const saveAuthData = createAsyncThunk(
  'auth/saveAuthData',
  async (
    {
      token,
      account,
      instance,
    }: {
      token?: MastodonToken;
      account?: MastodonAccount;
      instance?: MastodonInstance;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { auth: AuthState };

      // Save token if provided or use existing one
      if (token) {
        await AuthStorage.saveToken(token);
      }

      // Save account if provided or use existing one
      if (account) {
        await AuthStorage.saveAccount(account);
      }

      // Save instance if provided or use existing one
      if (instance) {
        await AuthStorage.saveInstance(instance);
      }

      return true;
    } catch (error) {
      console.error('Failed to save auth data:', error);
      return rejectWithValue('Failed to save authentication data');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Clear auth data from secure storage
      await AuthStorage.clearAuthData();
      
      // Update Redux state
      dispatch(logout());
      
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return rejectWithValue('Failed to logout');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInstance: (state, action: PayloadAction<MastodonInstance>) => {
      state.instance = action.payload;
      state.instanceUrl = action.payload.url;
    },
    setToken: (state, action: PayloadAction<MastodonToken>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setAccount: (state, action: PayloadAction<MastodonAccount>) => {
      state.account = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.account = null;
      // Keep the instance info for easier re-login
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize auth
    builder.addCase(initializeAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(initializeAuth.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(initializeAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || 'Failed to initialize authentication';
    });

    // Save auth data
    builder.addCase(saveAuthData.pending, (state) => {
      state.error = null;
    });
    builder.addCase(saveAuthData.rejected, (state, action) => {
      state.error = action.payload as string || 'Failed to save authentication data';
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string || 'Failed to logout';
    });
  },
});

// Export actions
export const { setInstance, setToken, setAccount, logout, setError, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer; 