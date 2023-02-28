export interface Credentials {
  username: string;
  password: string;
}

export interface LoginCheck {
  token: string;
}

export interface User {
  email: string;
  username: string;
  roles: Roles[];
}

export type Roles = 'ROLE_USER' | 'ROLE_ADMIN';

export enum URL {
  Home = '/',
  Login = '/login',
}

export type Token = string | null;
