import { User } from './user';

export interface UserInfo extends User {
  blog: string;
  company: string;
  created_at: string;
  followers: number;
  following: number;
  hireable: boolean;
  location: string;
  name: string;
  public_repos: number;
  twitter_username: string;
  updated_at: string;
}
