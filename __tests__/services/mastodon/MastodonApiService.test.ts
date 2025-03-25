import { MastodonApiService } from '../../../services/mastodon/MastodonApiService';
import { MastodonClient } from '../../../services/mastodon/MastodonClient';
import { MastodonAccount, MastodonStatus } from '../../../services/mastodon/types';
import { AxiosResponse } from 'axios';

jest.mock('../../../services/mastodon/MastodonClient');

describe('MastodonApiService', () => {
  let service: MastodonApiService;
  let mockClient: jest.Mocked<MastodonClient>;
  const mockConfig = {
    baseURL: 'https://mastodon.example.com',
  };

  const mockAccount: MastodonAccount = {
    id: '123',
    username: 'testuser',
    acct: 'testuser@example.com',
    display_name: 'Test User',
    locked: false,
    bot: false,
    discoverable: true,
    group: false,
    created_at: '2024-01-01T00:00:00.000Z',
    note: 'Test account',
    url: 'https://example.com/@testuser',
    avatar: 'https://example.com/avatar.jpg',
    avatar_static: 'https://example.com/avatar-static.jpg',
    header: 'https://example.com/header.jpg',
    header_static: 'https://example.com/header-static.jpg',
    followers_count: 100,
    following_count: 50,
    statuses_count: 200,
    last_status_at: '2024-03-25T00:00:00.000Z',
  };

  const mockStatus: MastodonStatus = {
    id: '456',
    uri: 'https://example.com/@testuser/456',
    url: 'https://example.com/@testuser/456',
    content: 'Test status',
    text: 'Test status',
    visibility: 'public',
    sensitive: false,
    spoiler_text: '',
    created_at: '2024-03-25T00:00:00.000Z',
    in_reply_to_id: null,
    in_reply_to_account_id: null,
    reblog: null,
    account: mockAccount,
    media_attachments: [],
    mentions: [],
    tags: [],
    emojis: [],
    card: null,
    poll: null,
    application: null,
    language: null,
    pinned: false,
    favourited: false,
    reblogged: false,
    muted: false,
    bookmarked: false,
    filtered: [],
  };

  beforeEach(() => {
    mockClient = new MastodonClient(mockConfig) as jest.Mocked<MastodonClient>;
    (MastodonClient as jest.Mock).mockImplementation(() => mockClient);
    service = new MastodonApiService(mockConfig);
  });

  describe('getHomeTimeline', () => {
    it('should fetch the home timeline', async () => {
      const mockResponse = {
        data: [mockStatus],
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await service.getHomeTimeline();
      expect(result).toEqual([mockStatus]);
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/timelines/home?limit=20');
    });

    it('should handle pagination parameters', async () => {
      const mockResponse = {
        data: [mockStatus],
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.get.mockResolvedValue(mockResponse);

      await service.getHomeTimeline(10, '123');
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/timelines/home?limit=10&since_id=123');
    });
  });

  describe('getAccount', () => {
    it('should fetch an account', async () => {
      const mockResponse = {
        data: mockAccount,
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await service.getAccount('123');
      expect(result).toEqual(mockAccount);
      expect(mockClient.get).toHaveBeenCalledWith('/api/v1/accounts/123');
    });
  });

  describe('createStatus', () => {
    it('should create a new status', async () => {
      const mockResponse = {
        data: mockStatus,
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await service.createStatus('Test status', {
        visibility: 'public',
        sensitive: false,
        spoilerText: 'Spoiler',
      });

      expect(result).toEqual(mockStatus);
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/statuses', {
        status: 'Test status',
        visibility: 'public',
        sensitive: false,
        spoiler_text: 'Spoiler',
      });
    });
  });

  describe('favoriteStatus', () => {
    it('should favorite a status', async () => {
      const mockResponse = {
        data: { ...mockStatus, favourited: true },
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await service.favoriteStatus('456');
      expect(result.favourited).toBe(true);
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/statuses/456/favourite');
    });
  });

  describe('reblogStatus', () => {
    it('should reblog a status', async () => {
      const mockResponse = {
        data: { ...mockStatus, reblogged: true },
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await service.reblogStatus('456');
      expect(result.reblogged).toBe(true);
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/statuses/456/reblog');
    });
  });

  describe('followAccount', () => {
    it('should follow an account', async () => {
      const mockResponse = {
        data: { ...mockAccount, following: true },
        status: 200,
        statusText: 'OK',
        headers: {}
      } as AxiosResponse;

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await service.followAccount('123');
      expect(result).toEqual(mockResponse.data);
      expect(mockClient.post).toHaveBeenCalledWith('/api/v1/accounts/123/follow');
    });
  });
}); 