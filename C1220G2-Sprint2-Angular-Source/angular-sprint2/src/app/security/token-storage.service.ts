import {Injectable} from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }
  signOut(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenInLocalStorage(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    if (sessionStorage.getItem(TOKEN_KEY) != null) {
      return sessionStorage.getItem(TOKEN_KEY);
    } else {
      return localStorage.getItem(TOKEN_KEY);
    }
  }
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserInLocalStorage(user){
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    if (sessionStorage.getItem(USER_KEY) != null) {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    } else {
      return JSON.parse(localStorage.getItem(USER_KEY));
    }
  }
}
