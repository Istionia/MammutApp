import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MastodonConfig, MastodonError, MastodonResponse } from './types';

export class MastodonClient {
  private client: AxiosInstance;
  private config: MastodonConfig;
  private retryCount: number = 0;

  constructor(config: MastodonConfig) {
    this.config = {
      timeout: 10000,
      maxRetries: 3,
      retryDelay: 1000,
      ...config,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle retries
        if (error.response?.status >= 500 && this.retryCount < this.config.maxRetries!) {
          this.retryCount++;
          await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay!));
          return this.client(originalRequest);
        }

        // Reset retry count on success
        this.retryCount = 0;

        // Transform error response
        if (error.response?.data) {
          const mastodonError: MastodonError = {
            error: error.response.data.error || 'Unknown error',
            error_description: error.response.data.error_description,
          };
          return Promise.reject(mastodonError);
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<MastodonResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<MastodonResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<MastodonResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<MastodonResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): MastodonError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          error: error.response.data.error || 'Server error',
          error_description: error.response.data.error_description,
        };
      } else if (error.request) {
        return {
          error: 'Network error',
          error_description: 'Unable to reach the server',
        };
      }
    }
    return {
      error: 'Unknown error',
      error_description: error.message || 'An unexpected error occurred',
    };
  }
} 