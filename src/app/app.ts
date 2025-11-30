import { Component, signal, inject, OnInit, afterNextRender } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { AnimationService } from './services/animation.service';
import { TawkService } from './services/tawk.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly animationService = inject(AnimationService);
  private readonly tawkService = inject(TawkService);
  
  protected readonly title = signal('Priyanka Nandkishor Malikar');
  protected readonly subtitle = signal('Software Developer | Angular | JavaScript | TypeScript | Python | SQL | REST API');
  protected readonly mobileMenuOpen = signal(false);
  protected readonly isDarkMode = this.themeService.isDarkMode;

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Initialize theme
    this.themeService.initializeTheme();
    
    // Show loading animation on initial load
    if (globalThis.window) {
      this.animationService.pageLoadAnimation();
    }

    // Initialize tawk.to chat if property id is provided in environment
    try {
      const id = environment.tawk?.propertyId;
      if (id) {
        this.tawkService.load(id);
      }
    } catch (e) {
      // ignore errors loading chat
    }
  }

  private initializeAnimations(): void {
    // Animate header on load
    this.animationService.fadeIn('header', { delay: 0.2 });
    this.animationService.slideInLeft('.logo', { delay: 0.3 });
    this.animationService.slideInRight('.nav-links', { delay: 0.4 });
    
    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    for (const link of navLinks) {
      this.animationService.hoverScale(link as HTMLElement);
    }
  }
  
  protected toggleMobileMenu(): void {
    const isOpen = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(isOpen);
    
    const menuElement = document.querySelector('.mobile-menu') as HTMLElement;
    if (menuElement) {
      this.animationService.animateNavMenu(isOpen, menuElement);
    }
  }
  
  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    
    const menuElement = document.querySelector('.mobile-menu') as HTMLElement;
    if (menuElement) {
      this.animationService.animateNavMenu(false, menuElement);
    }
  }
  
  protected toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
  
  protected currentYear(): number {
    return new Date().getFullYear();
  }

  protected getNavLinks() {
    return [
      { path: '/home', label: 'Home', icon: '🏠' },
      { path: '/about', label: 'About', icon: '👨‍💻' },
      { path: '/skills', label: 'Skills', icon: '⚡' },
      { path: '/projects', label: 'Projects', icon: '💼' },
      { path: '/experience', label: 'Experience', icon: '🌟' },
        { path: '/education', label: 'Education', icon: '🎓' },
      { path: '/contact', label: 'Contact', icon: '📞' }
    ];
  }
}
