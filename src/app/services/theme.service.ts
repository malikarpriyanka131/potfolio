import { Injectable, signal, effect, inject, PLATFORM_ID, computed, Signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

export type ColorMode = 'light' | 'dark';
export type ThemeVariant = 'modern' | 'elegant' | 'nature' | 'tech';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private readonly THEME_KEY = 'priyanka-portfolio-theme-mode';
  private readonly VARIANT_KEY = 'priyanka-portfolio-theme-variant';
  
  // Theme State Signals
  readonly currentMode = signal<ColorMode>('light');
  readonly currentVariant = signal<ThemeVariant>('modern');
  readonly isDarkMode = computed(() => this.currentMode() === 'dark');

  // CSS Variable Names
  private readonly cssVars = {
    primary: '--color-primary',
    secondary: '--color-secondary',
    accent: '--color-accent',
    background: '--color-background',
    surface: '--color-surface',
    text: '--color-text',
    muted: '--color-muted',
    border: '--color-border',
  };

  // Theme Variants Configuration
  private readonly variants: Record<ThemeVariant, Partial<ThemeColors>> = {
    modern: {
      primary: '#0098ff',
      secondary: '#4f7db5',
      accent: '#d946ef',
    },
    elegant: {
      primary: '#6366f1',
      secondary: '#3f3f46',
      accent: '#ec4899',
    },
    nature: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#ca8a04',
    },
    tech: {
      primary: '#2563eb',
      secondary: '#1e293b',
      accent: '#7c3aed',
    },
  };

  // Mode-specific colors
  private readonly modeColors: Record<ColorMode, Partial<ThemeColors>> = {
    light: {
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      muted: '#64748b',
      border: '#e2e8f0',
    },
    dark: {
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#94a3b8',
      border: '#334155',
    },
  };

  constructor() {
    if (this.isBrowser) {
      this.initializeTheme();
      
      // Set up effects for theme changes
      effect(() => {
        this.applyTheme(this.currentMode(), this.currentVariant());
      });
    }
  }

  // Called by App component to initialize theme
  initializeTheme(): void {
    if (this.isBrowser) {
      // Initialize color mode (light/dark)
      const savedMode = localStorage.getItem(this.THEME_KEY) as ColorMode | null;
      const prefersDark = globalThis?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
      
      this.currentMode.set(savedMode ?? (prefersDark ? 'dark' : 'light'));

      // Initialize theme variant
      const savedVariant = localStorage.getItem(this.VARIANT_KEY) as ThemeVariant | null;
      this.currentVariant.set(savedVariant ?? 'modern');

      // Listen for system theme changes
      globalThis?.matchMedia?.('(prefers-color-scheme: dark)')
        ?.addEventListener('change', (e) => {
          if (!localStorage.getItem(this.THEME_KEY)) {
            this.setColorMode(e.matches ? 'dark' : 'light');
          }
        });

      // Initial theme application
      this.applyTheme(this.currentMode(), this.currentVariant());
    }
  }

  private applyTheme(mode: ColorMode, variant: ThemeVariant): void {
    if (!this.isBrowser) return;

    const root = document.documentElement;
    const colors = this.computeThemeColors(mode, variant);

    // Apply color mode class
    root.classList.toggle('dark', mode === 'dark');

    // Apply CSS variables
    for (const [key, cssVar] of Object.entries(this.cssVars)) {
      root.style.setProperty(cssVar, colors[key as keyof ThemeColors]);
    }
  }

  private computeThemeColors(mode: ColorMode, variant: ThemeVariant): ThemeColors {
    return {
      ...this.modeColors[mode],
      ...this.variants[variant],
    } as ThemeColors;
  }

  // Public API
  // initializeTheme(): void {
  //   if (this.isBrowser) {
  //     // Initialize color mode (light/dark)
  //     const savedMode = localStorage.getItem(this.THEME_KEY) as ColorMode | null;
  //     const prefersDark = globalThis?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
      
  //     this.currentMode.set(savedMode ?? (prefersDark ? 'dark' : 'light'));

  //     // Initialize theme variant
  //     const savedVariant = localStorage.getItem(this.VARIANT_KEY) as ThemeVariant | null;
  //     this.currentVariant.set(savedVariant ?? 'modern');

  //     // Listen for system theme changes
  //     globalThis?.matchMedia?.('(prefers-color-scheme: dark)')
  //       ?.addEventListener('change', (e) => {
  //         if (!localStorage.getItem(this.THEME_KEY)) {
  //           this.setColorMode(e.matches ? 'dark' : 'light');
  //         }
  //       });

  //     // Initial theme application
  //     this.applyTheme(this.currentMode(), this.currentVariant());
  //   }
  // }

  setColorMode(mode: ColorMode): void {
    if (this.isBrowser) {
      this.addTransition();
      this.currentMode.set(mode);
      localStorage.setItem(this.THEME_KEY, mode);
    }
  }

  setThemeVariant(variant: ThemeVariant): void {
    if (this.isBrowser) {
      this.addTransition();
      this.currentVariant.set(variant);
      localStorage.setItem(this.VARIANT_KEY, variant);
    }
  }

  toggleDarkMode(): void {
    const newMode = this.currentMode() === 'light' ? 'dark' : 'light';
    this.setColorMode(newMode);
  }

  private addTransition(): void {
    if (!this.isBrowser) return;

    const transition = document.createElement('style');
    transition.innerHTML = `
      * {
        transition: background-color 0.3s ease,
                    color 0.3s ease,
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
      }
    `;
    document.head.appendChild(transition);
    
    setTimeout(() => {
      transition.remove();
    }, 300);
  }

  // Helper to get current theme colors
  getThemeColors(): ThemeColors {
    return this.computeThemeColors(
      this.currentMode(),
      this.currentVariant()
    );
  }
}