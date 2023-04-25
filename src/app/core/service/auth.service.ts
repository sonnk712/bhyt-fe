import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  AuthResponse
} from '../model/auth';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'agri_admin_token';
  private REFRESH_TOKEN_KEY = 'agri_admin_refresh_token';
  private FIRST_REFRESH_TOKEN_KEY = 'agri_admin_frt';
  private PERIOD_REFRESH_TOKEN_KEY = 'agri_admin_period';

  constructor(private http: HttpClient) {}

  requestAccessToken(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}${environment.basePath}/auth/login`, request);
  }

  requestRefreshToken(): Observable<AuthResponse> {
    const formData: FormData = new FormData();
    formData.append('refreshToken', this.getRefreshToken());
    return this.http.post<AuthResponse>(`${environment.baseUrl}${environment.basePath}/auth/refresh-token`, formData);
  }

  isHasToken(): boolean {
    return this.getCookie(this.TOKEN_KEY) != '';
  }

  isHasRefreshToken(): boolean {
    return this.getCookie(this.REFRESH_TOKEN_KEY) != '';
  }

  getToken(): string {
    return this.getCookie(this.TOKEN_KEY);
  }

  getRefreshToken(): string {
    return this.getCookie(this.REFRESH_TOKEN_KEY);
  }

  /**
   * @param token: access token
   * @param expireIn: time expire of token, use second unit
   */
  setToken(token: string, expireIn: number): void {
    this.deleteCookie(this.TOKEN_KEY);
    const dateExpire = new Date();
    dateExpire.setTime(dateExpire.getTime() + (expireIn * 1000));
    // set first refresh token 80 percent live time of access token
    const timeRefreshToken = dateExpire.getTime() - (0.2 * expireIn * 1000);
    localStorage.setItem(this.FIRST_REFRESH_TOKEN_KEY, timeRefreshToken.toString());
    localStorage.setItem(this.PERIOD_REFRESH_TOKEN_KEY, (0.8 * expireIn * 1000).toString());
    // set access token
    this.setCookie(this.TOKEN_KEY, token, dateExpire);
  }

  getFirstTimeRefreshToken(): number {
    const now = new Date();
    const dateStr = localStorage.getItem(this.FIRST_REFRESH_TOKEN_KEY);
    if (dateStr) {
      return Number(dateStr) - now.getTime();
    }
    return 0;
  }

  getPeriodRefreshToken(): number {
    const data = localStorage.getItem(this.PERIOD_REFRESH_TOKEN_KEY);
    return data ? Number(data) : 50000;
  }

  /**
   * @param token: access token
   * @param expireIn: time expire of token, use second unit
   */
  setRefreshToken(token: string, expireIn: number): void {
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
    const dateExpire = new Date();
    dateExpire.setTime(dateExpire.getTime() + (expireIn * 1000));
    this.setCookie(this.REFRESH_TOKEN_KEY, token, dateExpire);
  }

  removeToken(): void {
    this.deleteCookie(this.TOKEN_KEY);
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
  }

  setCookie(cName: string, cValue: any, expireDate: Date): void {
    const expires = 'expires=' + expireDate.toUTCString();
    document.cookie = cName + '=' + cValue + ';' + expires + ';path=/';
  }

  getCookie(cName: string): string {
    const name = cName + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(cName: string): void {
    const cValue = this.getCookie(cName);
    if (cValue !== '') {
      document.cookie = cName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}
