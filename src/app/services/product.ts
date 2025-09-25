import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://e-commerce-em5x.onrender.com/products';
  private productsCache$: Observable<Product[]> | null = null;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  private translateProduct(product: any): Product {
    const lang = this.translate.currentLang || 'pt';
    return {
      ...product,
      name: product.name[lang],
      description: product.description[lang],
      category: product.category[lang],
      brand: product.brand[lang],
    };
  }

  getAll(): Observable<Product[]> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http.get<any[]>(this.apiUrl).pipe(
        map(products => products.map(p => this.translateProduct(p))),
        shareReplay(1)
      );
    }
    return this.productsCache$;
  }

  clearCache(): void {
    this.productsCache$ = null;
  }

  getById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.translateProduct(p))
    );
  }

  getByTag(tag: string): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p =>
          Array.isArray(p.tags) &&
          p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        )
      )
    );
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.getAll().pipe(
      map(products =>
        products.filter(p =>
          p.category?.toLowerCase() === category.toLowerCase()
        )
      )
    );
  }

  getOffers(): Observable<Product[]> {
    return this.getAll().pipe(
      map(products => products.filter(p => p.offer))
    );
  }
}