import * as SecureStore from 'expo-secure-store';
import AuthStorage from '@/services/mastodon/AuthStorage';
import { MastodonToken, MastodonInstance, MastodonAccount } from '@/store/slices/authSlice';

// Mock Expo's SecureStore
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('AuthStorage', () => {
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

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('saveToken', () => {
    it('should save token to secure storage', async () => {
      await AuthStorage.saveToken(mockToken);
      
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'mammut_token',
        JSON.stringify(mockToken)
      );
    });

    it('should throw an error if saving fails', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(AuthStorage.saveToken(mockToken)).rejects.toThrow('Failed to save authentication token');
    });
  });

  describe('getToken', () => {
    it('should retrieve token from secure storage', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockToken));
      
      const result = await AuthStorage.getToken();
      
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('mammut_token');
      expect(result).toEqual(mockToken);
    });

    it('should return null if no token is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await AuthStorage.getToken();
      
      expect(result).toBeNull();
    });

    it('should return null if retrieval fails', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      const result = await AuthStorage.getToken();
      
      expect(result).toBeNull();
    });
  });

  describe('saveInstance', () => {
    it('should save instance to secure storage', async () => {
      await AuthStorage.saveInstance(mockInstance);
      
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'mammut_instance',
        JSON.stringify(mockInstance)
      );
    });

    it('should throw an error if saving fails', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(AuthStorage.saveInstance(mockInstance)).rejects.toThrow('Failed to save instance information');
    });
  });

  describe('getInstance', () => {
    it('should retrieve instance from secure storage', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockInstance));
      
      const result = await AuthStorage.getInstance();
      
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('mammut_instance');
      expect(result).toEqual(mockInstance);
    });

    it('should return null if no instance is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await AuthStorage.getInstance();
      
      expect(result).toBeNull();
    });

    it('should return null if retrieval fails', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      const result = await AuthStorage.getInstance();
      
      expect(result).toBeNull();
    });
  });

  describe('saveAccount', () => {
    it('should save account to secure storage', async () => {
      await AuthStorage.saveAccount(mockAccount);
      
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'mammut_account',
        JSON.stringify(mockAccount)
      );
    });

    it('should throw an error if saving fails', async () => {
      (SecureStore.setItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(AuthStorage.saveAccount(mockAccount)).rejects.toThrow('Failed to save account information');
    });
  });

  describe('getAccount', () => {
    it('should retrieve account from secure storage', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockAccount));
      
      const result = await AuthStorage.getAccount();
      
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('mammut_account');
      expect(result).toEqual(mockAccount);
    });

    it('should return null if no account is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await AuthStorage.getAccount();
      
      expect(result).toBeNull();
    });

    it('should return null if retrieval fails', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      const result = await AuthStorage.getAccount();
      
      expect(result).toBeNull();
    });
  });

  describe('clearAuthData', () => {
    it('should clear token and account data from secure storage', async () => {
      await AuthStorage.clearAuthData();
      
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('mammut_token');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('mammut_account');
      // Instance data is kept for easier re-login
      expect(SecureStore.deleteItemAsync).not.toHaveBeenCalledWith('mammut_instance');
    });

    it('should throw an error if clearing fails', async () => {
      (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      await expect(AuthStorage.clearAuthData()).rejects.toThrow('Failed to clear authentication data');
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if valid token exists', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockToken));
      
      const result = await AuthStorage.isAuthenticated();
      
      expect(result).toBe(true);
    });

    it('should return false if no token exists', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await AuthStorage.isAuthenticated();
      
      expect(result).toBe(false);
    });

    it('should return false if token is expired', async () => {
      const expiredToken = {
        ...mockToken,
        createdAt: Date.now() - 4000 * 1000, // 4000 seconds ago (token expires in 3600 seconds)
      };
      
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(expiredToken));
      
      const result = await AuthStorage.isAuthenticated();
      
      expect(result).toBe(false);
    });

    it('should return false if checking authentication fails', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockRejectedValueOnce(new Error('Storage error'));
      
      const result = await AuthStorage.isAuthenticated();
      
      expect(result).toBe(false);
    });
  });
}); 