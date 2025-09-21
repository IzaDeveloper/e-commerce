import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductComponent } from './components/product-detail/product-detail';
import { CartComponent } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];