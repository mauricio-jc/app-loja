import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userData = new BehaviorSubject<User>({});

  constructor() {
    const accessToken = this.getAccessToken();
    if(accessToken !== null) {
      this.set(accessToken);
    }
  }

  isLoggedIn(): boolean {
    let isToken = this.getAccessToken();

    if(isToken) {
      return true;
    }

    return false;
  }

  set(accessToken: string): void {
    const user = jwt_decode(accessToken) as User;
    this.userData.next({
      sub: user.sub,
      email: user.email,
      name: user.name
    });
  }

  get(): Observable<User> {
    return this.userData.asObservable();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token') ?? null;
  }
}
