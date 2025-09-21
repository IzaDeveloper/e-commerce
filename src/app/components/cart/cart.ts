import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/product.model';
import { CartService } from '../../services/cart';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      quantity = 1;
    }
    this.cartService.updateQuantity(productId, quantity);
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItemsWithQuantity();
    this.calculateTotal();
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acc, item) => {
      const price = item.offer && item.offerPrice ? item.offerPrice : item.price;
      return acc + price * item.quantity;
    }, 0);
  }

  removeOneItem(index: number): void {
    const item = this.items[index];
    if (!item) return;

    this.cartService.removeOne(item.id);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  checkout(): void {
    if (this.items.length !== 0) {
      alert('Compra realizada com sucesso!')
      return;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
