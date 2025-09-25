import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOpen = false;

  dropdowns: Record<'products' | 'categories', boolean> = {
    products: false,
    categories: false
  };

  currentLang: 'pt' | 'en' = 'pt';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }

    const initialLang = this.getValidLang(
      this.translate.currentLang ?? this.translate.getDefaultLang() ?? 'pt'
    );
    this.currentLang = initialLang;
    this.translate.use(initialLang);

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = this.getValidLang(event.lang);
    });
  }

  setLanguage(lang: 'pt' | 'en'): void {
    this.translate.use(lang);
  }

  private getValidLang(lang: string): 'pt' | 'en' {
    return lang === 'en' ? 'en' : 'pt';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.closeDropdowns();
  }

  toggleDropdown(dropdownName: 'products' | 'categories'): void {
    for (const key in this.dropdowns) {
      this.dropdowns[key as keyof typeof this.dropdowns] = key === dropdownName
        ? !this.dropdowns[key as keyof typeof this.dropdowns]
        : false;
    }
  }

  private closeDropdowns(): void {
    this.dropdowns = {
      products: false,
      categories: false
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    if ((event.target as Window).innerWidth > 768 && this.menuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.header')) {
      this.closeDropdowns();
      this.closeMenu();
    }
  }

  ngOnDestroy(): void { }
}