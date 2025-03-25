import axios from 'axios';
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

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse),
      } as any);

      const response = await client.get('/test');
      expect(response).toEqual(mockResponse);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(networkError),
      } as any);

      await expect(client.get('/test')).rejects.toThrow('Network error');
    });

    it('should handle server errors', async () => {
      const serverError = {
        response: {
          data: {
            error: 'Server error',
            error_description: 'Something went wrong',
          },
        },
      };

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(serverError),
      } as any);

      await expect(client.get('/test')).rejects.toThrow('Server error');
    });

    it('should retry on 500 errors', async () => {
      const serverError = {
        response: { status: 500 },
        config: { url: '/test' },
      };

      const successResponse = {
        data: { test: 'data' },
        status: 200,
        headers: {},
      };

      const mockAxiosInstance = {
        get: jest.fn()
          .mockRejectedValueOnce(serverError)
          .mockRejectedValueOnce(serverError)
          .mockResolvedValueOnce(successResponse),
      };

      mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

      const response = await client.get('/test');
      expect(response).toEqual(successResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(3);
    });
  });

  describe('post', () => {
    it('should make a successful POST request', async () => {
      const mockResponse = {
        data: { test: 'data' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue(mockResponse),
      } as any);

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

      mockedAxios.create.mockReturnValue({
        put: jest.fn().mockResolvedValue(mockResponse),
      } as any);

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

      mockedAxios.create.mockReturnValue({
        delete: jest.fn().mockResolvedValue(mockResponse),
      } as any);

      const response = await client.delete('/test');
      expect(response).toEqual(mockResponse);
    });
  });
}); 