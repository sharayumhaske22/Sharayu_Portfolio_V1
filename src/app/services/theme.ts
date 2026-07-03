import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isDark = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      const saved = localStorage.getItem('theme');
      this.isDark.set(saved === 'galaxy');
      this.applyTheme();
    }

    effect(() => {
      if (this.isBrowser) {
        this.applyTheme();
      }
    });
  }

  toggle() {
    this.isDark.update(v => !v);
    if (this.isBrowser) {
      localStorage.setItem('theme', this.isDark() ? 'galaxy' : 'beach');
    }
  }

  private applyTheme() {
    if (this.isBrowser) {
      document.documentElement.classList.toggle('dark', this.isDark());
    }
  }
}