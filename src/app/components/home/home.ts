import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { ProductCardComponent } from "../product-card/product-card";
import { LoadingComponent } from '../../shared/loading/loading';
import { BannerCarouselComponent } from "../../shared/banner-carousel/banner-carousel";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    LoadingComponent,
    BannerCarouselComponent
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

  loading = false;

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
    this.loading = true;
    this.productService.getAll().subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      }
    });
  }

  loadOffers(): void {
    this.loading = true;
    this.productService.getOffers().subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      }
    });
  }

  loadByTag(tag: string): void {
    this.loading = true;
    this.productService.getByTag(tag).subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      }
    });
  }

  loadCategory(category: string): void {
    this.loading = true;
    this.productService.getByCategory(category).subscribe({
      next: prods => {
        this.products = prods;
        this.loading = false;
      },
      error: () => {
        this.products = [];
        this.loading = false;
      }
    });
  }
}
