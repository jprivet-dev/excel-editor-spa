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
  roles: [];
}

export enum URL {
  Domain = '/',
  Login = '/login',
}
