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

        // Reset retry count
        this.retryCount = 0;

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.post<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.put<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.isAxiosError) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.request) {
        throw new Error('Network error');
      }
    }
    throw new Error(error.message || 'An unexpected error occurred');
  }
} 