export interface MastodonConfig {
  baseURL: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export interface MastodonError {
  error: string;
  error_description?: string;
}

export interface MastodonResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface MastodonAccount {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string | null;
}

export interface MastodonStatus {
  id: string;
  uri: string;
  url: string;
  content: string;
  text: string;
  visibility: 'public' | 'unlisted' | 'private' | 'direct';
  sensitive: boolean;
  spoiler_text: string;
  created_at: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  reblog: MastodonStatus | null;
  account: MastodonAccount;
  media_attachments: Array<{
    id: string;
    type: string;
    url: string;
    preview_url: string;
    remote_url: string | null;
    meta: Record<string, any>;
    description: string | null;
    blurhash: string | null;
  }>;
  mentions: Array<{
    id: string;
    username: string;
    url: string;
    acct: string;
  }>;
  tags: Array<{
    name: string;
    url: string;
  }>;
  emojis: Array<{
    shortcode: string;
    url: string;
    static_url: string;
    visible_in_picker: boolean;
  }>;
  card: null | {
    url: string;
    title: string;
    description: string;
    type: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    html: string;
    width: number;
    height: number;
    image: string | null;
    embed_url: string | null;
    blurhash: string | null;
  };
  poll: null | {
    id: string;
    expires_at: string | null;
    expired: boolean;
    multiple: boolean;
    votes_count: number;
    voters_count: number | null;
    voted: boolean;
    own_votes: number[] | null;
    options: Array<{
      title: string;
      votes_count: number | null;
    }>;
    emojis: Array<{
      shortcode: string;
      url: string;
      static_url: string;
      visible_in_picker: boolean;
    }>;
  };
  application: {
    name: string;
    website: string | null;
  } | null;
  language: string | null;
  pinned: boolean | null;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  filtered: Array<{
    filter: {
      id: string;
      title: string;
      context: string[];
      expires_at: string | null;
    };
    keyword_matches: string[] | null;
    status_matches: string[] | null;
  }>;
} 