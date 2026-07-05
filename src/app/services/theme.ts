import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#';

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

    /**
   * Scrambles text into an element letter-by-letter, left to right.
   * Returns a cleanup function — call it in ngOnDestroy to clear the interval
   * if the component might be destroyed mid-animation.
   */
  scrambleText(
    el: HTMLElement,
    text: string,
    options?: { speed?: number; step?: number }
  ): () => void {
    if (!this.isBrowser) {
      el.textContent = text;
      return () => {};
    }

    const speed = options?.speed ?? 40;
    const step = options?.step ?? 3;

    let iteration = 0;
    const maxIterations = text.length * step;

    const interval = setInterval(() => {
      const revealedCount = Math.floor(iteration / step);

      el.textContent = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < revealedCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.textContent = text;
      }
    }, speed);

    return () => clearInterval(interval);
  }
}
