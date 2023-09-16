import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;
  private headers: Object = {};

  constructor(private httpClient: HttpClient) {
    this.headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF1csOtY2lvIiwiZW1haWwiOiJtYXVyaWNpb2MuYmlsZXNzaW1vQGdtYWlsLmNvbSIsInN1YiI6NywiaWF0IjoxNjk0ODY1NjgxLCJleHAiOjE2OTc0NTc2ODF9.QT_3CtaY3kUC2-0g6cL8pR4IPxC_NZB1t5wYN1aZYEA`
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
