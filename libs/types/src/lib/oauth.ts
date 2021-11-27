export interface AccessToken {
  token: {
    url: string;
    id: number;
    user_id: number;
    client_id: number;
    token: number;
    refresh_token: string | null;
    created_at: string;
    expires_at: string | null;
    used_at: string | null;
    scopes: Array<'read' | 'write'>;
    full_token: string;
  };
}

export interface Client {
  url: string;
  id: number;
  user_id: number;
  name: string;
  identifier: string;
  company: string;
  description: string;
  redirect_url: Array<string>;
  secret: string;
  created_at: string;
  updated_at: string;
  global: boolean;
  logo_url: string | null;
}
