import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import * as SecureStore from 'expo-secure-store';

// Interface for MastodonClient options
interface MastodonClientOptions {
  baseURL: string;
  timeout?: number;
  retryCount?: number;
}

// Class for handling Mastodon API requests
export class MastodonClient {
  private client: AxiosInstance;
  private options: MastodonClientOptions;
  private retryCount: number;

  constructor(options: MastodonClientOptions) {
    this.options = options;
    this.retryCount = options.retryCount || 3;

    // Create Axios instance
    this.client = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout || 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Configure request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Check network connectivity
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          throw new Error('No internet connection');
        }

        // Add auth token if available
        const token = await SecureStore.getItemAsync('mastodon_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Configure response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Handle common error responses
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 401:
              // Token expired or invalid
              // TODO: Implement token refresh flow
              break;
            case 403:
              // Forbidden - user doesn't have permission
              break;
            case 404:
              // Not found
              break;
            case 429:
              // Rate limited
              const retryAfter = error.response.headers['retry-after'];
              if (retryAfter) {
                // Wait and retry after the specified time
              }
              break;
            case 500:
            case 502:
            case 503:
            case 504:
              // Server error
              break;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  public async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.request<T>(config);
    } catch (error) {
      throw error;
    }
  }

  // GET request
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  // POST request
  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  // PUT request
  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  // DELETE request
  public async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  // Set auth token
  public setToken(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  // Clear auth token
  public clearToken(): void {
    delete this.client.defaults.headers.common.Authorization;
  }
} 