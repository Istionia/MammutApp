import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
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

        // Handle retries for 500 errors
        if (error.response?.status >= 500 && (!originalRequest._retry || originalRequest._retry < this.config.maxRetries!)) {
          originalRequest._retry = (originalRequest._retry || 0) + 1;
          await new Promise((resolve) => setTimeout(resolve, this.config.retryDelay!));
          try {
            return await this.client(originalRequest);
          } catch (retryError) {
            // If retry fails, continue with error handling
            error = retryError;
          }
        }

        // Transform error response
        if (error.response?.data?.error) {
          error.message = error.response.data.error;
        } else if (error.request) {
          error.message = 'Network error';
        } else {
          error.message = error.message || 'An unexpected error occurred';
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let retries = 0;
    const maxRetries = this.config.maxRetries || 3;
    
    while (true) {
      try {
        return await this.client.get<T>(url, config);
      } catch (error: any) {
        if (error.response?.status >= 500 && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay || 1000));
          continue;
        }
        throw this.handleError(error);
      }
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let retries = 0;
    const maxRetries = this.config.maxRetries || 3;
    
    while (true) {
      try {
        return await this.client.post<T>(url, data, config);
      } catch (error: any) {
        if (error.response?.status >= 500 && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay || 1000));
          continue;
        }
        throw this.handleError(error);
      }
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let retries = 0;
    const maxRetries = this.config.maxRetries || 3;
    
    while (true) {
      try {
        return await this.client.put<T>(url, data, config);
      } catch (error: any) {
        if (error.response?.status >= 500 && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay || 1000));
          continue;
        }
        throw this.handleError(error);
      }
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    let retries = 0;
    const maxRetries = this.config.maxRetries || 3;
    
    while (true) {
      try {
        return await this.client.delete<T>(url, config);
      } catch (error: any) {
        if (error.response?.status >= 500 && retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, this.config.retryDelay || 1000));
          continue;
        }
        throw this.handleError(error);
      }
    }
  }

  private handleError(error: any): never {
    if (error.isAxiosError) {
      const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
      throw new Error(message);
    }
    throw new Error(error.message || 'An unexpected error occurred');
  }
} 