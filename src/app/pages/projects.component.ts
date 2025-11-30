import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  type: string;
  status: string;
  statusClass: string;
  client: string;
  gradientBg: string;
  features: string[];
  technologies: string[];
  stats?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './projects.component.css',
  template: `
<!-- Hero Section -->
<section class="projects-hero py-20 bg-gradient-to-br from-white via-purple-50 to-indigo-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-white dark:text-white mb-6">
        Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-700">Projects</span>
      </h1>
      <p class="text-xl text-white dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Selected projects from my work: web and native apps, PWAs, and automation tools delivered for clients and personal initiatives.
      </p>
      <div class="mt-8 inline-flex items-center bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-6 py-3 rounded-full font-semibold">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
        5 Projects Delivered
      </div>
    </div>
  </div>
</section>

<!-- Filter Section -->
<section class="filter-section py-12 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-wrap justify-center gap-4">
        @for (filter of getProjectFilters(); track filter.id) {
          <button 
            (click)="setActiveFilter(filter.id)"
            [class]="'px-6 py-3 rounded-full font-semibold transition-all duration-300 ' + 
                     (activeFilter() === filter.id 
                       ? 'bg-purple-600 text-white shadow-lg' 
                       : 'bg-gray-100 dark:bg-secondary-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900')">
            {{filter.label}}
          </button>
        }
      </div>
    </div>
  </div>
</section>

<!-- Projects Grid -->
<section class="projects-grid-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        @for (project of getFilteredProjects(); track project.id) {
          <div class="project-card bg-white dark:bg-secondary-900 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <!-- Project Image -->
            <div class="relative h-64 bg-gradient-to-br {{project.gradientBg}} overflow-hidden">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="relative h-full flex items-center justify-center">
                <img [src]="project.image" [alt]="project.title" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <!-- Project Type Badge -->
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 dark:bg-secondary-800/90 backdrop-blur-sm text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                  {{project.type}}
                </span>
              </div>
              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                <span [class]="'px-3 py-1 rounded-full text-sm font-medium ' + project.statusClass">
                  {{project.status}}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-8">
              <!-- Project Header -->
              <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {{project.title}}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{project.client}}</p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {{project.description}}
                </p>
              </div>

              <!-- Key Features -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Key Features
                </h4>
                <ul class="space-y-2">
                  @for (feature of project.features; track feature) {
                    <li class="flex items-start space-x-2">
                      <svg class="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span class="text-gray-600 dark:text-gray-300 text-sm">{{feature}}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Technologies -->
              <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  Tech Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of project.technologies; track tech) {
                    <span class="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                      {{tech}}
                    </span>
                  }
                </div>
              </div>

              <!-- Project Stats -->
              @if (project.stats && project.stats.length > 0) {
                <div class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Project Impact
                  </h4>
                  <div class="grid grid-cols-2 gap-4">
                    @for (stat of project.stats; track stat.label) {
                      <div class="text-center">
                        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{stat.value}}</div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">{{stat.label}}</div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Project Links -->
              <div class="flex flex-wrap gap-3">
                @if (project.liveUrl) {
                  <a [href]="project.liveUrl" target="_blank" 
                     class="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:bg-purple-700 hover:shadow-lg inline-flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    Live Demo
                  </a>
                }
                @if (project.githubUrl) {
                  <a [href]="project.githubUrl" target="_blank" 
                     class="flex-1 border-2 border-purple-600 text-purple-600 px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:bg-purple-600 hover:text-white inline-flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source Code
                  </a>
                }
                @if (!project.liveUrl && !project.githubUrl) {
                  <div class="w-full bg-gray-100 dark:bg-secondary-800 text-gray-600 dark:text-gray-400 px-4 py-3 rounded-lg font-semibold text-center">
                    <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Confidential Project
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="cta-section py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-6">
        Ready to Start Your Next Project?
      </h2>
      <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
        Let's collaborate to bring your ideas to life with cutting-edge technology and innovative solutions.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a routerLink="/contact" 
           class="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Discuss Your Project
        </a>
        
        <a routerLink="/experience" 
           class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-purple-600 hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
          </svg>
          View Experience
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class ProjectsComponent implements OnInit {
  private animationService = inject(AnimationService);
  
  activeFilter = signal('all');

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  private initializeAnimations(): void {
    // ===== ANIMATION 4: Text Reveal on Hero =====
    this.animationService.textReveal('.hero-title', { stagger: 0.05, duration: 1 });
    this.animationService.fadeIn('.hero-subtitle', { delay: 0.5 });
    
    // ===== ANIMATION 6: Floating Count Animation =====
    this.animationService.floatingAnimation('.projects-count', { y: 15, duration: 2 });
    
    // ===== ANIMATION 5: Floating Animation on Filter Buttons =====
    document.querySelectorAll('.filter-section button').forEach((button, index) => {
      if (button instanceof HTMLElement) {
        this.animationService.magneticEffect(button, 0.2);
        // Add subtle floating to selected filter
        if (this.activeFilter() === (button as any).dataset.filter) {
          this.animationService.floatingElementAnimation(button, {
            floatY: 3,
            rotation: 0,
            duration: 2.5,
            delay: 0.1 * index
          });
        }
      }
    });
    
    // ===== ANIMATION 2 & 3: Project Cards with Staggered Entrance + Hover Effect =====
    document.querySelectorAll('.project-card').forEach((card, index) => {
      if (card instanceof HTMLElement) {
        // Staggered entrance with rotation (ANIMATION 2)
        this.animationService.scrollTriggerAnimation(card, {
          trigger: '.projects-grid-section',
          delay: index * 0.2,
          start: "top 85%"
        });
        
        // Card hover effect (ANIMATION 3)
        this.animationService.cardHoverEffect(card, {
          scaleAmount: 1.08,
          shadowIntensity: 28
        });
        
        // Parallax effect on project images
        const image = card.querySelector('img');
        if (image instanceof HTMLElement) {
          this.animationService.parallaxScroll(image, 0.2);
        }
        
        // Counter animations for project stats (ANIMATION 6)
        card.querySelectorAll('.stat-number').forEach(stat => {
          if (stat instanceof HTMLElement) {
            const value = parseInt(stat.textContent || '0', 10);
            this.animationService.animateCounter(stat, value, {
              duration: 2,
              suffix: stat.textContent?.includes('+') ? '+' : ''
            });
          }
        });
      }
    });
    
    // Add glitch effect on hover for project titles
    document.querySelectorAll('.project-card h3').forEach(title => {
      if (title instanceof HTMLElement) {
        title.addEventListener('mouseenter', () => {
          this.animationService.glitchEffect(title, { duration: 0.3, intensity: 3 });
        });
      }
    });
    
    // ===== ANIMATION 2: Staggered Entrance for Tech Badges =====
    this.animationService.staggerIn('.project-card .technologies span', {
      stagger: 0.05,
      scrollTrigger: {
        trigger: '.projects-grid-section',
        start: "top 70%"
      }
    });
    
    // Enhanced CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section', {
      start: "top 80%",
      onEnter: () => {
        // Add gradient text animation
        this.animationService.scrollTextAnimation('.cta-section h2');
      }
    });
  }

  getProjectsCount(): number {
    return this.getAllProjects().length;
  }

  getProjectFilters() {
    return [
      { id: 'all', label: 'All Projects' },
      { id: 'enterprise', label: 'Enterprise Systems' },
      { id: 'web-app', label: 'Web Applications' }
    ];
  }

  setActiveFilter(filterId: string): void {
    this.activeFilter.set(filterId);
  }

  getFilteredProjects() {
    const allProjects = this.getAllProjects();
    const filter = this.activeFilter();
    
    if (filter === 'all') {
      return allProjects;
    }
    
    return allProjects.filter(project => project.category === filter);
  }

  getAllProjects() {
    return [
      {
        id: 1,
        title: "Purchase Store & Logistics Management System",
        client: "Client / WordPress Project",
        type: "Web Application",
        category: "enterprise",
        status: "Completed",
        statusClass: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
        description: "Modules for purchase store and logistics management built using WordPress with custom plugins and workflows. Led a small team to deliver the solution.",
        image: "/assets/images/projects/purchase-logistics.jpg",
        gradientBg: "from-blue-600 to-indigo-600",
        features: [
          "Purchase & inventory modules",
          "Logistics tracking and reporting",
          "Custom WordPress plugins",
          "Team-led delivery and client coordination",
          "Export/import and reporting features"
        ],
        technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
        stats: [
          { label: "Team Size", value: "5" },
          { label: "Modules", value: "6+" }
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        id: 2,
        title: "Sticky Notes (PWA)",
        client: "Personal Project",
        type: "Progressive Web App",
        category: "web-app",
        status: "Completed",
        statusClass: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
        description: "A Progressive Web App that supports offline note creation, local storage sync, and installable experience for quick note-taking.",
        image: "/assets/images/projects/sticky-notes.jpg",
        gradientBg: "from-green-600 to-teal-600",
        features: [
          "Offline support via Service Workers",
          "Local storage and sync",
          "Add/edit/delete notes with tags",
          "Installable PWA experience"
        ],
        technologies: ["JavaScript", "Service Workers", "HTML5", "CSS3"],
        stats: [
          { label: "Offline Ready", value: "Yes" },
          { label: "Notes Stored", value: "100+" }
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        id: 3,
        title: "Mind Trainer",
        client: "Personal Project",
        type: "Mobile / Web App",
        category: "web-app",
        status: "Completed",
        statusClass: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
        description: "Logic-based arithmetic training app designed to improve cognitive skills with progressive difficulty levels and scoring.",
        image: "/assets/images/projects/mind-trainer.jpg",
        gradientBg: "from-purple-600 to-pink-600",
        features: [
          "Configurable difficulty levels",
          "Scoring and progress tracking",
          "Timer-based challenges",
          "Lightweight and responsive UI"
        ],
        technologies: ["JavaScript", "HTML5", "CSS3"],
        stats: [
          { label: "Levels", value: "20+" },
          { label: "Sessions", value: "500+" }
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        id: 4,
        title: "e-Kshiralayh",
        client: "NGO / Farmers App",
        type: "Native Mobile App",
        category: "web-app",
        status: "Completed",
        statusClass: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
        description: "A native app for dairy farmer registration and livestock product management, enabling simple onboarding and product listings.",
        image: "/assets/images/projects/ekshiralayh.jpg",
        gradientBg: "from-yellow-500 to-orange-500",
        features: [
          "Farmer registration and profiles",
          "Product management and listings",
          "Offline-first data capture",
          "Simple native UX for field use"
        ],
        technologies: ["Kotlin", "Android", "SQLite"],
        stats: [
          { label: "Registered Farmers", value: "100+" }
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      {
        id: 5,
        title: "Computer Lab Auto Controller",
        client: "Personal / Institutional",
        type: "Automation Tool",
        category: "enterprise",
        status: "Completed",
        statusClass: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
        description: "Automation modules for controlling and monitoring a computer lab environment, including scheduling and remote control features.",
        image: "/assets/images/projects/lab-controller.jpg",
        gradientBg: "from-gray-600 to-gray-800",
        features: [
          "Remote control and scheduling",
          "Monitoring and alerts",
          "Automated startup/shutdown sequences",
          "User-level access controls"
        ],
        technologies: ["Python", "Flask", "SQLite", "Shell Scripts"],
        stats: [
          { label: "Machines Controlled", value: "30+" }
        ],
        liveUrl: undefined,
        githubUrl: undefined
      },
      
    ];
  }
}