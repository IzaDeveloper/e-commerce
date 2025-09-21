import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen: boolean = false;
  dropdowns: any = {
    products: false,
    categories: false
  };

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
    this.dropdowns = {
      products: false,
      categories: false
    };
  }

  toggleDropdown(dropdownName: 'products' | 'categories') {
    Object.keys(this.dropdowns).forEach((key) => {
      if (key !== dropdownName) {
        this.dropdowns[key] = false;
      }
    });

    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const target = event.target as Window;
    if (target.innerWidth > 768 && this.menuOpen) {
      this.closeMenu();
    }
  }

  ngOnInit(): void {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  ngOnDestroy(): void { }
}
