import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  private ID_TOKEN = 'id_token';

  constructor() {}

  getToken(): string {
    return localStorage.getItem(this.ID_TOKEN) as string;
  }

  setToken(token: string): void {
    localStorage.setItem(this.ID_TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.ID_TOKEN);
  }
}
