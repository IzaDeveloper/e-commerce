import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://e-commerce-em5x.onrender.com/products';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  getByTag(tag: string): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p => Array.isArray(p.tags) && p.tags.includes(tag))
      )
    );
  }

  getOffers(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?offer=true`);
  }
}
