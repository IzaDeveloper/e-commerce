import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://e-commerce-em5x.onrender.com/products';

  constructor(private http: HttpClient, private translate: TranslateService) { }

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
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => products.map(p => this.translateProduct(p)))
    );
  }

  getById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.translateProduct(p))
    );
  }

  getAllRaw(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByTag(tag: string): Observable<Product[]> {
    console.log('[Service - tag recebida]', tag);
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
    return this.getAllRaw().pipe(
      map(products =>
        products.filter(p =>
          p.category.pt.toLowerCase() === category.toLowerCase() ||
          p.category.en.toLowerCase() === category.toLowerCase()
        )
      ),
      map(products => products.map(p => this.translateProduct(p)))
    );
  }

  getOffers(): Observable<Product[]> {
    return this.getAll().pipe(
      map(products => products.filter(p => p.offer))
    );
  }
}
