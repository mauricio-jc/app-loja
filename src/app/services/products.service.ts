import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;
  private headers: Object = {};

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService
  ) {
    this.headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.usersService.getAccessToken()}`
      })
    }
  }

  listAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.api}/products`, this.headers);
  }

  find(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.api}/products/${id}`, this.headers);
  }
}
