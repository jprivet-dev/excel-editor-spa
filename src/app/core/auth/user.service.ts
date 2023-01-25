import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): User {}
}
