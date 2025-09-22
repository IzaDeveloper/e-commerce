import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { ProductCardComponent } from "../product-card/product-card";
import { LoadingComponent } from '../../shared/loading/loading';
import { BannerCarouselComponent } from "../../shared/banner-carousel/banner-carousel";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductCardComponent,
    LoadingComponent,
    BannerCarouselComponent,
    TranslateModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentCategory: string = '';
  loading = false;

  activeFilter: 'all' | 'new' | 'bestsellers' | 'offer' | 'category' = 'all';

  private tagMap: Record<string, string> = {
    'new': 'new',
    'bestsellers': 'bestsellers',
    'offer': 'offer'
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      const offerParam = params['offer'];
      const category = params['category'];
      const offer = offerParam === 'true' || offerParam === true;

      if (tag === 'new' || tag === 'bestsellers') {
        this.activeFilter = tag;
        this.loadByTag(tag);
      } else if (offer) {
        this.activeFilter = 'offer';
        this.loadOffers();
      } else if (category) {
        this.activeFilter = 'category';
        this.currentCategory = category;
        this.loadCategory(category);
      } else {
        this.activeFilter = 'all';
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.setLoading(true);
    this.productService.getAll().subscribe({
      next: products => this.setProducts(products),
      error: () => this.setProducts([])
    });
  }

  loadOffers(): void {
    this.setLoading(true);
    this.productService.getOffers().subscribe({
      next: products => this.setProducts(products),
      error: () => this.setProducts([])
    });
  }

  loadByTag(tag: string): void {
    const translatedTag = this.tagMap[tag] || tag;

    this.setLoading(true);
    this.productService.getByTag(translatedTag).subscribe({
      next: products => this.setProducts(products),
      error: () => this.setProducts([])
    });
  }

  loadCategory(category: string): void {
    this.setLoading(true);
    this.productService.getByCategory(category).subscribe({
      next: products => this.setProducts(products),
      error: () => this.setProducts([])
    });
  }

  private setProducts(products: Product[]): void {
    this.products = products;
    this.loading = false;
  }

  private setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}