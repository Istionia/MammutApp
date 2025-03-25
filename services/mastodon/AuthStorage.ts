import * as SecureStore from 'expo-secure-store';
import { MastodonToken, MastodonInstance, MastodonAccount } from '@/store/slices/authSlice';

// Storage keys
const STORAGE_KEYS = {
  TOKEN: 'mammut_token',
  INSTANCE: 'mammut_instance',
  ACCOUNT: 'mammut_account',
};

/**
 * AuthStorage handles secure storage of authentication data using Expo's SecureStore.
 */
export class AuthStorage {
  /**
   * Save authentication token to secure storage
   * @param token The authentication token to save
   */
  static async saveToken(token: MastodonToken): Promise<void> {
    try {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.TOKEN,
        JSON.stringify(token)
      );
    } catch (error) {
      console.error('Failed to save token:', error);
      throw new Error('Failed to save authentication token');
    }
  }

  /**
   * Retrieve authentication token from secure storage
   * @returns The stored token or null if not found
   */
  static async getToken(): Promise<MastodonToken | null> {
    try {
      const tokenString = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN);
      if (!tokenString) return null;
      return JSON.parse(tokenString) as MastodonToken;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Save instance information to secure storage
   * @param instance The instance information to save
   */
  static async saveInstance(instance: MastodonInstance): Promise<void> {
    try {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.INSTANCE,
        JSON.stringify(instance)
      );
    } catch (error) {
      console.error('Failed to save instance:', error);
      throw new Error('Failed to save instance information');
    }
  }

  /**
   * Retrieve instance information from secure storage
   * @returns The stored instance information or null if not found
   */
  static async getInstance(): Promise<MastodonInstance | null> {
    try {
      const instanceString = await SecureStore.getItemAsync(STORAGE_KEYS.INSTANCE);
      if (!instanceString) return null;
      return JSON.parse(instanceString) as MastodonInstance;
    } catch (error) {
      console.error('Failed to retrieve instance:', error);
      return null;
    }
  }

  /**
   * Save account information to secure storage
   * @param account The account information to save
   */
  static async saveAccount(account: MastodonAccount): Promise<void> {
    try {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.ACCOUNT,
        JSON.stringify(account)
      );
    } catch (error) {
      console.error('Failed to save account:', error);
      throw new Error('Failed to save account information');
    }
  }

  /**
   * Retrieve account information from secure storage
   * @returns The stored account information or null if not found
   */
  static async getAccount(): Promise<MastodonAccount | null> {
    try {
      const accountString = await SecureStore.getItemAsync(STORAGE_KEYS.ACCOUNT);
      if (!accountString) return null;
      return JSON.parse(accountString) as MastodonAccount;
    } catch (error) {
      console.error('Failed to retrieve account:', error);
      return null;
    }
  }

  /**
   * Clear all authentication data from secure storage
   */
  static async clearAuthData(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCOUNT);
      // Optionally keep the instance information for easier re-login
      // await SecureStore.deleteItemAsync(STORAGE_KEYS.INSTANCE);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
      throw new Error('Failed to clear authentication data');
    }
  }

  /**
   * Check if the user is authenticated (has a valid token)
   * @returns True if authenticated, false otherwise
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) return false;
      
      // Check if token is expired, if expiration info is available
      if (token.expiresIn && token.createdAt) {
        const expirationTime = token.createdAt + token.expiresIn * 1000;
        if (Date.now() > expirationTime) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Migrate data from older storage formats (if needed)
   * This method checks for data in older formats and migrates it to the current format
   */
  static async migrateOldData(): Promise<void> {
    // Implementation for migrating data from older formats would go here
    // This is a stub for now, as we don't have older formats to migrate from
  }
}

export default AuthStorage; 