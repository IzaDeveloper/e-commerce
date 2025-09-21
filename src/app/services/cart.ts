import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  constructor() { }

  addToCart(product: Product, quantity: number): void {
    const existing = this.items.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getItemsWithQuantity(): CartItem[] {
    return this.items;
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
  }

  removeOne(productId: string): void {
    const index = this.items.findIndex(item => item.id === productId);
    if (index > -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.items.splice(index, 1);
      }
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => {
      const price = item.offer && item.offerPrice ? item.offerPrice : item.price;
      return acc + price * item.quantity;
    }, 0);
  }
}