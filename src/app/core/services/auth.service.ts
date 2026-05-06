import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://localhost:7149/api/Auth';

  constructor(private http: HttpClient) {}

  login(user: LoginRequest) {
    return this.http.post<any>(`${this.apiUrl}/login`, user)
      .pipe(
        tap((res: any) => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
          }
          if (res?.role) {
            localStorage.setItem('role', res.role);
          }
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}