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
    const item = this.items.find(i => i.id === productId);

    if (!item) return;

    const stock = item.stock ?? 0;

    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    } else if (quantity > stock) {
      quantity = stock;
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

  get totalEconomia(): number {
    return this.items.reduce((total, item) => {
      if (item.offer && item.offerPrice !== undefined && item.offerPrice < item.price) {
        const economiaItem = (item.price - item.offerPrice) * item.quantity;
        return total + economiaItem;
      }
      return total;
    }, 0);
  }

  removeOneItem(index: number): void {
    const item = this.items[index];
    if (!item) return;

    this.cartService.removeItem(item.id);
    this.loadCart();
  }

  addItems(): void {
    this.router.navigate(['/']);
  }

  checkout(): void {
    if (this.items.length !== 0) {
      alert('Compra realizada com sucesso!');
      this.router.navigate(['/']);
      return;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
