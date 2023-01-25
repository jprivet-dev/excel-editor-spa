export interface Credentials {
  username: string;
  password: string;
}

export interface LoginCheck {
  token: string;
}

export interface User {}

export enum URL {
  Domain = '/',
  Login = '/login',
}
