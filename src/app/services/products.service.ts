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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF1csOtY2lvIiwiZW1haWwiOiJtYXVyaWNpb2MuYmlsZXNzaW1vQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjk0OTE0NDc5LCJleHAiOjE2OTc1MDY0Nzl9.owZKSL0fQPSqyStPDrYX1a6tTUo1j3WUvj8lZwGXIIc`
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
