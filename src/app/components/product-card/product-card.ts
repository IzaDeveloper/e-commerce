import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { ModalComponnent } from '../../shared/modal/modal';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    RouterModule,
    ModalComponnent,
    TranslateModule
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  selectedProduct: Product | null = null;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  showModal = false;

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
