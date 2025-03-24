import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    // Will add async thunks for login, registration, etc.
  },
});

// Export actions
export const { setInstance, setToken, setAccount, logout, setError, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer; 