import { Component, signal, inject, afterNextRender } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';
 @Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, HeroComponent],
  template: `
<!-- Hero Section -->
<section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-50 via-primary-50 to-accent-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <!-- Background Elements -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Reduced size/opacity glows for better readability -->
    <div class="absolute top-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-accent-400/10 to-primary-400/10 rounded-full blur-2xl opacity-60 sm:opacity-40"></div>
    <div class="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-primary-400/10 to-accent-400/10 rounded-full blur-2xl opacity-60 sm:opacity-40"></div>
  </div>
  
  <div class="relative z-10 container mx-auto px-6 text-center">
    <div class="hero-content">
      <!-- Professional Icon -->
      <div class="profile-icon mb-8">
        <div class="relative w-48 h-48 mx-auto mb-8 group">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full animate-spin-slower opacity-40"></div>
          <div class="absolute inset-2 bg-white dark:bg-secondary-800 rounded-full overflow-hidden flex items-center justify-center">
      <img [src]="'/assets/images/New_Passport_1.jpg'" 
        alt="Priyanka Nandkishor Malikar - Software Developer"
                 class="w-full h-full object-cover">
          </div>
        </div>
      </div>
      
      <!-- Name and Title -->
      <h1 class="hero-title text-5xl md:text-7xl font-bold text-secondary-500 dark:text-white mb-6">
        Hi, I'm <span class="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">Priyanka Nandkishor Malikar</span>
      </h1>
      
      <div class="hero-subtitle mb-8">
        <p class="text-xl md:text-2xl text-white dark:text-gray-300 mb-4">
          Software Developer | Angular | JavaScript | TypeScript | Python | SQL
        </p>
        <div class="typed-text text-lg text-primary-600 dark:text-primary-400 font-medium h-8">
          <span id="typed-output"></span>
        </div>
      </div>
      
      <!-- Description -->
      <p class="hero-description text-lg text-white dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
        I craft digital experiences that blend innovative design with robust functionality. 
        Passionate about creating solutions that make a real impact in the digital world.
      </p>
      
      <!-- CTA Buttons -->
      <div class="hero-buttons flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
        <a routerLink="/projects" 
           class="group bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:scale-105">
          <span class="flex items-center">
            View My Work
            <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </span>
        </a>
        
        <a routerLink="/contact" 
           class="group border-2 border-primary-600 text-primary-600 dark:text-primary-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:scale-105">
          <span class="flex items-center">
            <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Let's Talk
          </span>
        </a>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator">
        <div class="flex flex-col items-center animate-bounce">
          <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Quick Stats Section -->
<section class="stats-section py-20 bg-white dark:bg-secondary-800 border-t border-gray-200 dark:border-secondary-700">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="stat-item text-center group">
        <div class="stat-number text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {{ stats().experience }}+
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-medium">Years Experience</p>
      </div>
      
      <div class="stat-item text-center group">
        <div class="stat-number text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {{ stats().projects }}+
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-medium">Projects Completed</p>
      </div>
      
      <div class="stat-item text-center group">
        <div class="stat-number text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {{ stats().clients }}+
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-medium">Happy Clients</p>
      </div>
      
      <div class="stat-item text-center group">
        <div class="stat-number text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform duration-300">
          {{ stats().technologies }}+
        </div>
        <p class="text-gray-600 dark:text-gray-300 font-medium">Technologies</p>
      </div>
    </div>
  </div>
</section>

<!-- Featured Skills Section -->
<section class="skills-preview py-20 bg-gray-50 dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Core <span class="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Technologies and tools I use to bring ideas to life
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      @for (skill of getFeaturedSkills(); track skill.category) {
        <div class="skill-category bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-secondary-700 group hover:-translate-y-2">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mr-4">
              {{ skill.icon }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ skill.category }}</h3>
          </div>
          
          <div class="space-y-3">
            @for (tech of skill.technologies; track tech) {
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span class="text-gray-600 dark:text-gray-300">{{ tech }}</span>
              </div>
            }
          </div>
          
          <div class="mt-6">
            <a routerLink="/skills" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
              Learn more
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      }
    </div>
  </div>
</section>

<!-- Recent Projects Preview -->
<section class="projects-preview py-20 bg-white dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Featured <span class="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        A showcase of my recent work and creative solutions
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (project of getFeaturedProjects(); track project.id) {
        <div class="project-card bg-gray-50 dark:bg-secondary-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-200 dark:border-secondary-700">
          <div class="relative h-48 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 overflow-hidden flex items-center justify-center">
            <div class="project-icon text-6xl transform group-hover:scale-110 transition-transform duration-500">
              {{ project.icon }}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tech of project.technologies; track tech) {
                <span class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                  {{ tech }}
                </span>
              }
            </div>
            
            <div class="flex items-center justify-between">
              <a [href]="project.liveUrl" target="_blank" rel="noopener" 
                 class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium text-sm inline-flex items-center">
                View Project
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              
              <a [href]="project.githubUrl" target="_blank" rel="noopener" 
                 class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      }
    </div>
    
    <div class="text-center mt-12">
      <a routerLink="/projects" 
         class="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:scale-105 inline-flex items-center">
        View All Projects
        <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="cta-section py-20 bg-gradient-to-r from-primary-600 to-purple-600">
  <div class="container mx-auto px-6 text-center">
    <h2 class="cta-heading text-4xl font-bold text-white mb-4">
      Ready to Start Your Next Project?
    </h2>
    <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
      Let's collaborate and bring your ideas to life with innovative solutions and creative expertise.
    </p>
    
    <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <a routerLink="/contact" 
         class="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
        <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        Get In Touch
      </a>
      
      <a (click)="downloadResume()" 
         class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-primary-600 hover:scale-105 inline-flex items-center cursor-pointer">
        <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        Download Resume
        </a>
          </div>
  </div>
</section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private animationService = inject(AnimationService);
  
  stats = signal({
    experience: 2,
    projects: 5,
    clients: 5,
    technologies: 18
  });
filePath = '../../../../';
  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
      this.initializeTypedText();
    });
  }

  // ngOnInit removed — initialization handled in constructor/afterNextRender

  private initializeAnimations(): void {
    // ===== ANIMATION 1: Hero Parallax with Tilt =====
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    if (heroSection) {
      this.animationService.heroParallaxTilt(heroSection, { intensity: 15, speed: 0.4 });
    }
    
    // Hero content fade-in
    this.animationService.fadeIn('.hero-content', { delay: 0.3 });
    this.animationService.scaleIn('.profile-icon', { delay: 0.5 });
    this.animationService.fadeIn('.hero-title', { delay: 0.7 });
    this.animationService.fadeIn('.hero-subtitle', { delay: 0.9 });
    this.animationService.fadeIn('.hero-description', { delay: 1.1 });
    this.animationService.fadeIn('.hero-buttons', { delay: 1.3 });

    // ===== ANIMATION 2 & 3: Staggered Card Entrance + Card Hover Effects =====
    const skillCategories = document.querySelectorAll('.skill-category') as NodeListOf<HTMLElement>;
    if (skillCategories.length > 0) {
      // Staggered entrance with rotation
      this.animationService.staggerCardEntrance(Array.from(skillCategories), {
        staggerDelay: 0.15,
        rotation: 3,
        duration: 0.7
      });
      
      // Card hover effects
      skillCategories.forEach(category => {
        this.animationService.cardHoverEffect(category, { scaleAmount: 1.08, shadowIntensity: 25 });
      });
    }

    // ===== ANIMATION 6: Statistics Counter with Pulse =====
    const statItems = document.querySelectorAll('.stat-number') as NodeListOf<HTMLElement>;
    statItems.forEach((item, index) => {
      const endValue = Object.values(this.stats())[index] as number;
      setTimeout(() => {
        this.animationService.counterWithPulse(item, 0, endValue, {
          duration: 2.5,
          suffix: '+',
          pulseScale: 1.2
        });
      }, 800 + index * 150);
    });

    // ===== ANIMATION 5: Floating Icons on Project Cards =====
    const projectCards = document.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
    if (projectCards.length > 0) {
      // Staggered entrance for project cards
      this.animationService.staggerCardEntrance(Array.from(projectCards), {
        staggerDelay: 0.12,
        rotation: 4,
        duration: 0.8
      });

      // Floating animation for project icons
      projectCards.forEach((card, index) => {
        const icon = card.querySelector('.project-icon') as HTMLElement;
        if (icon) {
          this.animationService.floatingElementAnimation(icon, {
            floatY: 12,
            rotation: 360,
            duration: 3.5 + index * 0.3,
            delay: index * 0.1
          });
        }
        
        // Card hover effect
        this.animationService.cardHoverEffect(card, { scaleAmount: 1.06, shadowIntensity: 30 });
      });
    }

    // ===== ANIMATION 4: Animated Gradient Text on CTA =====
    const ctaHeading = document.querySelector('.cta-heading') as HTMLElement;
    if (ctaHeading) {
      this.animationService.animatedGradientText(ctaHeading, {
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
        duration: 8
      });
    }

    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section', {
      trigger: '.cta-section',
      start: "top 80%"
    });
  }

  private initializeTypedText(): void {
    const texts = [
      'Software Developer { Angular | Python }'
    ];
    
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 80; // Slightly faster typing
    let cursorVisible = true;
    
    // Add cursor blink animation
    const toggleCursor = () => {
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursorVisible = !cursorVisible;
        cursor.style.opacity = cursorVisible ? '1' : '0';
      }
    };
    setInterval(toggleCursor, 530); // Cursor blink interval
    
    const typeWriter = () => {
      const fullText = texts[currentIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
        typeSpeed = 40; // Faster deletion
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
        typeSpeed = 80; // Normal typing speed
      }
      
      const outputElement = document.getElementById('typed-output');
      if (outputElement) {
        outputElement.innerHTML = currentText + '<span id="cursor" class="opacity-100">|</span>';
      }
      
      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2500; // Longer pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
        typeSpeed = 700; // Pause before next word
      }
      
      setTimeout(typeWriter, typeSpeed);
    };
    
    setTimeout(typeWriter, 1000); // Start sooner
  }

  getFeaturedSkills() {
    return [
      {
        category: 'Frontend',
        icon: '🎨',
        technologies: ['Angular', 'AngularJS', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
      },
      {
        category: 'Backend & Tools',
        icon: '⚙️',
        technologies: ['NodeJS', 'ExpressJS', 'Webpack', 'Gulp', 'NPM Scripts']
      },
      {
        category: 'Database & Concepts',
        icon: '🗄️',
        technologies: ['MongoDB', 'MySQL', 'MVC', 'MVVM', 'Component Architecture', 'Responsive Design']
      }
    ];
  }

  async downloadResume() {
    try {
      const response = await fetch('assets/resume/Priyanka_resume_latest.pdf');
      const blob = await response.blob();
      const url = globalThis?.URL?.createObjectURL(blob) ?? '';
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Priyanka_Resume.pdf';
      document.body.appendChild(link);
      link.click();
  globalThis?.URL?.revokeObjectURL?.(url);
  // modern DOM removal
  link.remove();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  }

  getFeaturedProjects() {
    return [
      {
        id: 1,
        title: 'Purchase Store & Logistics Management System',
        description: 'Developed functional modules for purchase and logistics workflows using WordPress. Led a team of 5 developers ensuring timely delivery and quality output.',
        icon: '🛒',
        technologies: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 2,
        title: 'Sticky Notes (PWA)',
        description: 'Progressive Web App with offline caching and instant-load features for fast note-taking and local persistence.',
        icon: '🗒️',
        technologies: ['JavaScript', 'Service Workers', 'HTML5', 'CSS3'],
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: 'Mind Trainer',
        description: 'Arithmetic logic training app designed to enhance problem-solving speed and accuracy with progressive difficulty.',
        icon: '🧠',
        technologies: ['JavaScript', 'HTML5', 'CSS3'],
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: 'e-Kshiralayh',
        description: 'Native app for dairy farmer onboarding and livestock product management, enabling simple registration and product listings.',
        icon: '🐄',
        technologies: ['Kotlin', 'Android', 'SQLite'],
        liveUrl: '#',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'Computer Lab Auto Controller',
        description: 'Automation modules for controlling and monitoring a computer lab environment, including scheduling and remote control features.',
        icon: '🖥️',
        technologies: ['Python', 'Flask', 'SQLite', 'Shell Scripts'],
        liveUrl: '#',
        githubUrl: '#'
      }
    ];
  }
}