import { Injectable } from '@angular/core';
import { Token } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthStorage {
  private ID_TOKEN = 'id_token';

  getToken(): string {
    return localStorage.getItem(this.ID_TOKEN) as string;
  }

  setToken(token: Token): void {
    !token ? this.removeToken() : localStorage.setItem(this.ID_TOKEN, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.ID_TOKEN);
  }
}
