import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;

  constructor(private httpClient: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/auth/login`, credentials);
  }

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.api}/users/create`, user);
  }
}
