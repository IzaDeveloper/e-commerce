import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart';
import { CommonModule, Location } from '@angular/common';
import { Modal } from '../../shared/modal/modal';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    Modal
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductComponent implements OnInit {
  product?: Product;
  showModal = false;
  selectedProduct: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data) => this.product = data,
        error: (error) => console.error('Erro ao buscar produto:', error)
      });
    }
  }

  calculateDiscount(original: number, discounted: number): number {
    const discount = ((original - discounted) / original) * 100;
    return Math.round(discount);
  }

  addToCart(product: Product): void {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProduct = null;
  }

  onConfirmAdd(event: { product: Product; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
    this.closeModal();
    this.router.navigate(['/']);
  }
}
