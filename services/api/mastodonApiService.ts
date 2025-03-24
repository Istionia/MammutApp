import { MastodonClient } from './mastodonApi';
import { MastodonToken, MastodonAccount, MastodonInstance } from '../../store/slices/authSlice';

/**
 * Service for interacting with the Mastodon API
 */
export class MastodonApiService {
  private client: MastodonClient;
  private instanceUrl: string;

  constructor(instanceUrl: string) {
    this.instanceUrl = instanceUrl;
    this.client = new MastodonClient({
      baseURL: `https://${instanceUrl}/api/v1`,
    });
  }

  /**
   * Set the authentication token
   */
  public setToken(token: string): void {
    this.client.setToken(token);
  }

  /**
   * Get information about a Mastodon instance
   */
  public async getInstance(): Promise<MastodonInstance> {
    try {
      const response = await this.client.get<any>('/instance');
      return {
        url: this.instanceUrl,
        title: response.title,
        description: response.description,
        version: response.version,
      };
    } catch (error) {
      throw new Error(`Failed to get instance information: ${error}`);
    }
  }

  /**
   * Register an application with the Mastodon instance
   */
  public async registerApp(
    clientName: string,
    redirectUris: string,
    scopes: string,
    website?: string
  ): Promise<{ clientId: string; clientSecret: string }> {
    try {
      const response = await this.client.post<any>('/apps', {
        client_name: clientName,
        redirect_uris: redirectUris,
        scopes: scopes,
        website: website,
      });

      return {
        clientId: response.client_id,
        clientSecret: response.client_secret,
      };
    } catch (error) {
      throw new Error(`Failed to register app: ${error}`);
    }
  }

  /**
   * Get an OAuth token using authorization code
   */
  public async getToken(
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    code: string,
    grantType: string = 'authorization_code'
  ): Promise<MastodonToken> {
    try {
      const response = await this.client.post<any>('/oauth/token', {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
        grant_type: grantType,
      });

      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token || null,
        createdAt: response.created_at,
        expiresIn: response.expires_in || null,
        scope: response.scope,
        tokenType: response.token_type,
      };
    } catch (error) {
      throw new Error(`Failed to get token: ${error}`);
    }
  }

  /**
   * Verify credentials and get current user account
   */
  public async verifyCredentials(): Promise<MastodonAccount> {
    try {
      const response = await this.client.get<any>('/accounts/verify_credentials');
      
      return {
        id: response.id,
        username: response.username,
        acct: response.acct,
        displayName: response.display_name,
        avatarUrl: response.avatar,
        headerUrl: response.header,
      };
    } catch (error) {
      throw new Error(`Failed to verify credentials: ${error}`);
    }
  }

  /**
   * Get account information by ID
   */
  public async getAccount(id: string): Promise<MastodonAccount> {
    try {
      const response = await this.client.get<any>(`/accounts/${id}`);
      
      return {
        id: response.id,
        username: response.username,
        acct: response.acct,
        displayName: response.display_name,
        avatarUrl: response.avatar,
        headerUrl: response.header,
      };
    } catch (error) {
      throw new Error(`Failed to get account: ${error}`);
    }
  }

  // Additional API methods will be added as needed
} 