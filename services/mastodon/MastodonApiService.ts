import { MastodonClient } from './MastodonClient';
import { MastodonConfig, MastodonAccount, MastodonStatus } from './types';

export class MastodonApiService {
  private client: MastodonClient;

  constructor(config: MastodonConfig) {
    this.client = new MastodonClient(config);
  }

  // Timeline methods
  async getHomeTimeline(limit: number = 20, sinceId?: string): Promise<MastodonStatus[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(sinceId && { since_id: sinceId }),
    });
    const response = await this.client.get<MastodonStatus[]>(`/api/v1/timelines/home?${params}`);
    return response.data;
  }

  async getPublicTimeline(limit: number = 20, sinceId?: string): Promise<MastodonStatus[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(sinceId && { since_id: sinceId }),
    });
    const response = await this.client.get<MastodonStatus[]>(`/api/v1/timelines/public?${params}`);
    return response.data;
  }

  // Account methods
  async getAccount(id: string): Promise<MastodonAccount> {
    const response = await this.client.get<MastodonAccount>(`/api/v1/accounts/${id}`);
    return response.data;
  }

  async getAccountStatuses(id: string, limit: number = 20, sinceId?: string): Promise<MastodonStatus[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(sinceId && { since_id: sinceId }),
    });
    const response = await this.client.get<MastodonStatus[]>(`/api/v1/accounts/${id}/statuses?${params}`);
    return response.data;
  }

  async followAccount(id: string): Promise<MastodonAccount> {
    const response = await this.client.post<MastodonAccount>(`/api/v1/accounts/${id}/follow`);
    return response.data;
  }

  async unfollowAccount(id: string): Promise<MastodonAccount> {
    const response = await this.client.post<MastodonAccount>(`/api/v1/accounts/${id}/unfollow`);
    return response.data;
  }

  // Status methods
  async getStatus(id: string): Promise<MastodonStatus> {
    const response = await this.client.get<MastodonStatus>(`/api/v1/statuses/${id}`);
    return response.data;
  }

  async createStatus(
    content: string,
    options: {
      visibility?: 'public' | 'unlisted' | 'private' | 'direct';
      inReplyToId?: string;
      sensitive?: boolean;
      spoilerText?: string;
    } = {}
  ): Promise<MastodonStatus> {
    const response = await this.client.post<MastodonStatus>('/api/v1/statuses', {
      status: content,
      visibility: options.visibility || 'public',
      in_reply_to_id: options.inReplyToId,
      sensitive: options.sensitive,
      spoiler_text: options.spoilerText,
    });
    return response.data;
  }

  async deleteStatus(id: string): Promise<void> {
    await this.client.delete(`/api/v1/statuses/${id}`);
  }

  async favoriteStatus(id: string): Promise<MastodonStatus> {
    const response = await this.client.post<MastodonStatus>(`/api/v1/statuses/${id}/favourite`);
    return response.data;
  }

  async unfavoriteStatus(id: string): Promise<MastodonStatus> {
    const response = await this.client.post<MastodonStatus>(`/api/v1/statuses/${id}/unfavourite`);
    return response.data;
  }

  async reblogStatus(id: string): Promise<MastodonStatus> {
    const response = await this.client.post<MastodonStatus>(`/api/v1/statuses/${id}/reblog`);
    return response.data;
  }

  async unreblogStatus(id: string): Promise<MastodonStatus> {
    const response = await this.client.post<MastodonStatus>(`/api/v1/statuses/${id}/unreblog`);
    return response.data;
  }
} 