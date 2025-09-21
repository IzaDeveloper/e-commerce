import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { ProductCardComponent } from "../product-card/product-card";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  lancamentos: Product[] = [];
  maisVendidos: Product[] = [];
  ofertas: Product[] = [];
  currentCategory: string = '';
  activeFilter: 'all' | 'lancamentos' | 'mais-vendidos' | 'ofertas' | 'categoria' = 'all';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      const offerParam = params['offer'];
      const category = params['category'];
      const offer = offerParam === 'true' || offerParam === true;

      if (tag === 'lancamento') {
        this.activeFilter = 'lancamentos';
        this.loadByTag(tag);
      } else if (tag === 'mais-vendido') {
        this.activeFilter = 'mais-vendidos';
        this.loadByTag(tag);
      } else if (offer) {
        this.activeFilter = 'ofertas';
        this.loadOffers();
      } else if (category) {
        this.activeFilter = 'categoria';
        this.currentCategory = category;
        this.loadCategory(category);
      } else {
        this.activeFilter = 'all';
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.productService.getAll().subscribe(prods => {
      this.products = prods;
    });
  }

  loadOffers(): void {
    this.productService.getOffers().subscribe(prods => {
      this.products = prods;
    });
  }

  loadByTag(tag: string): void {
    this.productService.getAll().subscribe(prods => {
      this.products = prods.filter(p => Array.isArray(p.tags) && p.tags.includes(tag));
    });
  }

  loadCategory(category: string): void {
    this.productService.getByCategory(category).subscribe(prods => {
      this.products = prods;
    });
  }
}
