import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeVariant } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <!-- Color Mode Toggle -->
      <button
        type="button"
        (click)="themeService.toggleDarkMode()"
        class="mode-toggle relative inline-flex items-center justify-center rounded-lg 
               bg-white/10 hover:bg-white/20 dark:bg-secondary-800/50 dark:hover:bg-secondary-700/50 
               transition-colors duration-200
               h-8 w-8 sm:h-10 sm:w-10"
        [attr.aria-label]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' mode'"
      >
        <!-- Sun Icon -->
        @if (isDark()) {
          <svg
            class="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        }
        <!-- Moon Icon -->
        @if (!isDark()) {
          <svg
            class="h-4 w-4 sm:h-5 sm:w-5 text-secondary-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        }
      </button>

      <!-- Theme Variant Selector -->
      <div class="theme-variants mt-2 sm:mt-4 grid grid-cols-2 gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-[200px]">
        @for (variant of variants; track variant) {
          <button
            type="button"
            (click)="setVariant(variant)"
            [class]="getVariantButtonClass(variant)"
            [attr.aria-label]="'Switch to ' + variant + ' theme'"
          >
            <span class="relative w-full">
              <span 
                class="block w-full h-1 rounded-full" 
                [style]="getVariantPreviewStyle(variant)"
                [class]="{'opacity-100': currentVariant() === variant, 'opacity-60': currentVariant() !== variant}"
              ></span>
            </span>
            <span class="mt-1 block text-[10px] sm:text-xs font-medium capitalize">{{ variant }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .theme-switcher {
      @apply fixed z-50 flex flex-col items-end;
      @apply right-2 bottom-16 sm:right-4 sm:bottom-4;
      @apply backdrop-blur-sm rounded-lg p-2 sm:p-3;
      @apply bg-white/5 dark:bg-black/5;
      @apply border border-white/10 dark:border-white/5;
      @apply shadow-lg shadow-black/5 dark:shadow-black/10;
    }

    .variant-button {
      @apply relative flex flex-col items-center justify-center;
      @apply p-2 sm:p-3 rounded-lg;
      @apply transition-all duration-200 ease-out;
      @apply hover:scale-105 active:scale-95;
      @apply select-none;
    }

    .variant-button-active {
      @apply bg-white/15 dark:bg-secondary-800/50;
      @apply ring-2 ring-primary-500/50;
      @apply shadow-sm shadow-primary-500/20;
    }

    .variant-button-inactive {
      @apply bg-white/5 dark:bg-secondary-900/30;
      @apply hover:bg-white/10 dark:hover:bg-secondary-800/40;
    }

    @media (hover: hover) {
      .variant-button:hover {
        @apply transform;
      }
    }

    @media (max-width: 640px) {
      .theme-switcher {
        @apply backdrop-saturate-150;
      }
    }
  `]
})
export class ThemeSwitcherComponent {
  protected readonly themeService = inject(ThemeService);

  // Computed signals for template
  protected readonly isDark = this.themeService.isDarkMode;
  protected readonly currentVariant = this.themeService.currentVariant;

  // Available theme variants
  protected readonly variants: ThemeVariant[] = ['modern', 'elegant', 'nature', 'tech'];

  // Theme variant gradients with improved color combinations
  private readonly gradientColors: Record<ThemeVariant, [string, string]> = {
    modern: ['#0098ff', '#d946ef'],  // Blue to Pink
    elegant: ['#6366f1', '#ec4899'], // Indigo to Rose
    nature: ['#059669', '#ca8a04'],  // Emerald to Amber
    tech: ['#2563eb', '#7c3aed'],    // Blue to Violet
  };

  // Helper methods for template
  protected setVariant(variant: ThemeVariant): void {
    this.themeService.setThemeVariant(variant);
  }

  protected getVariantButtonClass(variant: ThemeVariant): string {
    const isActive = this.currentVariant() === variant;
    return `variant-button ${isActive ? 'variant-button-active' : 'variant-button-inactive'}`;
  }

  protected getVariantPreviewStyle(variant: ThemeVariant): string {
    const [color1, color2] = this.gradientColors[variant];
    return `background: linear-gradient(to right, ${color1}, ${color2})`;
  }
}