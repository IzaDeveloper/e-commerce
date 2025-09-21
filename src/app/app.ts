import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer";
import { HeaderComponent } from "./components/header/header";
import { LoadingService } from './services/loading';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');
  protected readonly loadingService = inject(LoadingService);
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}
