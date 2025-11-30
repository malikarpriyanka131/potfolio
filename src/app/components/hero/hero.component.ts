import { Component, inject, OnInit, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../../services/animation.service';
import { TechBgComponent } from '../tech-bg/tech-bg.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, TechBgComponent],
  template: `
    <section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Tech Background -->
      <app-tech-bg />
      
      <!-- Glass Card Container -->
      <div class="hero-content relative z-10 w-full max-w-6xl mx-auto px-6">
        <div class="glass-card bg-white/10 dark:bg-secondary-900/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-secondary-700/20">
          <div class="text-center">
            <!-- Name and Title -->
            <h1 class="hero-title text-5xl md:text-7xl font-bold text-secondary-800 dark:text-white mb-6">
              Hi, I'm <span class="hero-name-gradient bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Priyanka Nandkishor Malikar</span>
            </h1>
            
            <div class="hero-subtitle mb-8">
              <p class="text-xl md:text-2xl text-secondary-700 dark:text-gray-300 mb-4">
                Software Developer | Angular | JavaScript | TypeScript | Python | SQL
              </p>
              <div class="typed-text text-lg text-primary-600 dark:text-primary-400 font-medium h-8 overflow-hidden">
                <span id="typed-output"></span>
              </div>
            </div>
            
            <!-- Description -->
            <p class="hero-description text-lg text-secondary-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              I craft digital experiences that blend innovative design with robust functionality. 
              Passionate about creating solutions that make a real impact in the digital world.
            </p>
            
            <!-- Tech Stack Icons -->
            <div class="tech-stack flex flex-wrap justify-center gap-4 mb-12">
              <div *ngFor="let tech of techStack" 
                   class="tech-icon w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/5 dark:to-accent-500/5 
                          backdrop-blur-sm border border-white/20 dark:border-secondary-700/20 flex items-center justify-center
                          transform hover:scale-110 transition-transform duration-300">
                <span class="text-2xl">{{ tech.icon }}</span>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div class="hero-buttons flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a routerLink="/projects" 
                 class="cta-primary bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full font-semibold 
                        transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105">
                <span class="flex items-center">
                  View My Work
                  <svg class="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </span>
              </a>
              
              <a routerLink="/contact" 
                 class="cta-secondary bg-white/10 dark:bg-secondary-800/30 backdrop-blur-sm border border-white/20 dark:border-secondary-700/20 
                        text-secondary-800 dark:text-white px-8 py-4 rounded-full font-semibold 
                        transition-all duration-300 hover:bg-white/20 dark:hover:bg-secondary-800/50 hover:scale-105">
                <span class="flex items-center">
                  <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Let's Talk
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div class="flex flex-col items-center animate-bounce">
          <span class="text-sm text-secondary-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <svg class="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .glass-card {
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    .tech-icon {
      animation: float 3s ease-in-out infinite;
      animation-delay: calc(var(--delay) * 0.2s);
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .hero-section {
      background: linear-gradient(135deg, rgb(239 246 255 / 0.8) 0%, rgb(248 250 252 / 0.8) 100%);
    }

    :host-context(.dark) .hero-section {
      background: linear-gradient(135deg, rgb(15 23 42 / 0.8) 0%, rgb(30 41 59 / 0.8) 100%);
    }
  `]
})
export class HeroComponent implements OnInit {
  private animationService = inject(AnimationService);

  techStack = [
    { icon: '🅰️', label: 'Angular' },
    { icon: '🔷', label: 'TypeScript' },
    { icon: '📜', label: 'JavaScript' },
    { icon: '🐍', label: 'Python' },
    { icon: '🗄️', label: 'SQL' },
    { icon: '🔗', label: 'REST APIs' }
  ];

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
      this.initializeTypedText();
    });
  }

  ngOnInit(): void {
    this.initializeTechStackAnimations();
  }

  private initializeAnimations(): void {
    this.animationService.fadeIn('.hero-content', {
      y: 30,
      duration: 1,
      ease: 'power4.out'
    });

    this.animationService.fadeIn('.hero-title', {
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });

    this.animationService.fadeIn('.hero-subtitle', {
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out'
    });

    this.animationService.fadeIn('.hero-description', {
      duration: 0.8,
      delay: 0.7,
      ease: 'power2.out'
    });

    this.animationService.fadeIn('.tech-stack', {
      duration: 0.8,
      delay: 0.9,
      ease: 'power2.out'
    });

    this.animationService.fadeIn('.hero-buttons', {
      duration: 0.8,
      delay: 1.1,
      ease: 'power2.out'
    });

    // Animated gradient on the name
    this.animationService.animatedGradientText('.hero-name-gradient', {
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
      duration: 6
    });

    // Floating animation for tech icons (slight, staggered)
    const techIcons = document.querySelectorAll('.tech-icon') as NodeListOf<HTMLElement>;
    techIcons.forEach((el, i) => {
      this.animationService.floatingElementAnimation(el, {
        floatY: 8 + i,
        rotation: 0,
        duration: 3 + i * 0.2,
        delay: i * 0.05
      });
    });

    // Hover effects for CTA buttons
    const primary = document.querySelector('.cta-primary') as HTMLElement;
    const secondary = document.querySelector('.cta-secondary') as HTMLElement;
    if (primary) this.animationService.cardHoverEffect(primary, { scaleAmount: 1.06, shadowIntensity: 18 });
    if (secondary) this.animationService.cardHoverEffect(secondary, { scaleAmount: 1.04, shadowIntensity: 14 });
  }

  private initializeTechStackAnimations(): void {
    const techIcons = document.querySelectorAll('.tech-icon');
    let index = 0;
    for (const icon of Array.from(techIcons)) {
      (icon as HTMLElement).style.setProperty('--delay', index.toString());
      index++;
    }
  }

  private initializeTypedText(): void {
    const texts = [
      'Software Developer { Angular | Python | SQL }',
      '2+ years of professional experience',
      'Specialized in SPAs and API integration',
      'Expert in performance optimization',
      'Passionate about scalable web solutions'
    ];
    
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    
    const typeWriter = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      const outputElement = document.getElementById('typed-output');
      if (outputElement) {
        outputElement.innerHTML = `${currentText}<span class="cursor">|</span>`;
      }
      
      let typeSpeed = isDeleting ? 30 : 50;
      
      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typeSpeed = 500;
      }
      
      setTimeout(typeWriter, typeSpeed);
    };
    
    setTimeout(typeWriter, 1000);
  }
}