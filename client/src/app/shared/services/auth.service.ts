import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  setToken(value: any) {
    this.token = value;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token && true;
  }

  constructor(private httpClient: HttpClient) {}

  register(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>('/api/auth/register', user);
  }

  login(user: IUser): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }
}
