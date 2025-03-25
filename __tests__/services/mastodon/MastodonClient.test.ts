import axios, { AxiosInstance } from 'axios';
import { MastodonClient } from '../../../services/mastodon/MastodonClient';
import { MastodonError } from '../../../services/mastodon/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MastodonClient', () => {
  let client: MastodonClient;
  const mockConfig = {
    baseURL: 'https://mastodon.example.com',
    timeout: 5000,
    maxRetries: 2,
    retryDelay: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Create a mock axios instance with interceptors
    const mockAxiosInstance = {
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;
    
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    client = new MastodonClient(mockConfig);
  });

  describe('constructor', () => {
    it('should create an axios instance with the correct config', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: mockConfig.baseURL,
        timeout: mockConfig.timeout,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });

  describe('get', () => {
    it('should make a successful GET request', async () => {
      const mockResponse = {
        data: { test: 'data' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      };

      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const response = await client.get('/test');
      expect(response).toEqual(mockResponse);
    });

    it('should handle network errors', async () => {
      const networkError = {
        request: {},
        message: 'Network error',
      };
      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(networkError);

      await expect(client.get('/test')).rejects.toThrow('Network error');
    });

    it('should handle server errors', async () => {
      const serverError = {
        response: {
          data: {
            error: 'Server error',
          },
        },
        isAxiosError: true,
      };

      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.get as jest.Mock).mockRejectedValue(serverError);

      await expect(client.get('/test')).rejects.toThrow('Server error');
    });

    it('should retry on 500 errors', async () => {
      const serverError = {
        response: { 
          status: 500,
          data: {
            error: 'Server error',
          },
        },
        config: { url: '/test' },
        isAxiosError: true,
      };

      const successResponse = {
        data: { test: 'data' },
        status: 200,
        headers: {},
      };

      const mockAxiosInstance = mockedAxios.create();
      const mockGet = mockAxiosInstance.get as jest.Mock;
      mockGet
        .mockRejectedValueOnce(serverError)
        .mockRejectedValueOnce(serverError)
        .mockResolvedValueOnce(successResponse);

      const response = await client.get('/test');
      expect(response).toEqual(successResponse);
      expect(mockGet).toHaveBeenCalledTimes(3);
    });
  });

  describe('post', () => {
    it('should make a successful POST request', async () => {
      const mockResponse = {
        data: { test: 'data' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      };

      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await client.post('/test', { data: 'test' });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('put', () => {
    it('should make a successful PUT request', async () => {
      const mockResponse = {
        data: { test: 'data' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      };

      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.put as jest.Mock).mockResolvedValue(mockResponse);

      const response = await client.put('/test', { data: 'test' });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make a successful DELETE request', async () => {
      const mockResponse = {
        data: { test: 'data' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      };

      const mockAxiosInstance = mockedAxios.create();
      (mockAxiosInstance.delete as jest.Mock).mockResolvedValue(mockResponse);

      const response = await client.delete('/test');
      expect(response).toEqual(mockResponse);
    });
  });
}); 