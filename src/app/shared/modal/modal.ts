import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class ModalComponnent {
  @Input() product!: Product | null;
  @Input() show: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ product: Product; quantity: number }>();

  quantity: number = 1;
  totalPrice: number = 0;

  constructor(private router: Router) { }

  ngOnChanges(): void {
    this.quantity = 1;
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    if (this.product) {
      const unitPrice = this.product.offer && this.product.offerPrice
        ? this.product.offerPrice
        : this.product.price;

      this.totalPrice = this.quantity * unitPrice;
    }
  }

  onQuantityChange(event: any): void {
    let value = Number(event.target.value);

    const stock = this.product?.stock ?? 0;

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > stock) {
      value = stock;
    }

    this.quantity = value;
    this.updateTotalPrice();
  }

  onCheckout(): void {
    if (this.product) {
      this.confirm.emit({ product: this.product, quantity: this.quantity });
      this.close.emit();
      this.router.navigate(['/cart']);
    }
  }

  addItems(): void {
    if (this.product) {
      this.confirm.emit({ product: this.product, quantity: this.quantity });
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
