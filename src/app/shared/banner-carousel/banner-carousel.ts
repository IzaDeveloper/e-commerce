import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-carousel.html',
  styleUrl: './banner-carousel.scss'
})
export class BannerCarouselComponent implements OnInit {
  banners = [
    { imageUrl: 'https://e-commerce-buy-things.vercel.app/images/banner-1', alt: 'Banner 1' },
    { imageUrl: 'https://e-commerce-buy-things.vercel.app/images/banner-2', alt: 'Banner 2' },
    { imageUrl: 'https://e-commerce-buy-things.vercel.app/images/banner-3', alt: 'Banner 3' },
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoSlide(): void {
    clearInterval(this.intervalId);
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }

  goTo(index: number): void {
    this.currentIndex = index;
  }
}