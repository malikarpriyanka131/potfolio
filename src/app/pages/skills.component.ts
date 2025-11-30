import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../services/animation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './skills.component.css',
  template: `
<!-- Hero Section -->
<section class="skills-hero py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-white dark:text-white mb-6">
        Technical <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Skills</span>
      </h1>
      <p class="text-xl text-white dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        A comprehensive overview of my technical expertise across programming languages, frameworks, tools, and technologies accumulated over 4+ years of professional development experience.
      </p>
    </div>
  </div>
</section>

<!-- Programming Languages -->
<section class="languages-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Programming <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Languages</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Core programming languages I use to build robust applications
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (language of getProgrammingLanguages(); track language.id) {
          <div class="skill-card bg-gray-50 dark:bg-secondary-800 p-8 rounded-xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
            <div class="w-20 h-20 mx-auto mb-6 relative">
              <div class="absolute inset-0 bg-gradient-to-br {{language.gradient}} rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
              <div class="relative w-full h-full bg-white dark:bg-secondary-700 rounded-xl flex items-center justify-center text-3xl">
                {{language.icon}}
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {{language.name}}
            </h3>
            <div class="mb-4">
              <div class="w-full bg-gray-200 dark:bg-secondary-700 rounded-full h-3 mb-2">
                <div class="bg-gradient-to-r {{language.gradient}} h-3 rounded-full transition-all duration-1000"
                     [style.width.%]="language.level"></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-300 font-semibold">{{language.level}}% Proficiency</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {{language.description}}
            </p>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Frontend Frameworks -->
<section class="frontend-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Frontend <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">Technologies</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Modern frontend frameworks and libraries for building responsive web applications
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (tech of getFrontendTechnologies(); track tech.id) {
          <div class="tech-card bg-white dark:bg-secondary-900 p-8 rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-16 h-16 rounded-lg bg-gradient-to-br {{tech.gradient}} flex items-center justify-center text-2xl text-white">
                {{tech.icon}}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{tech.name}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{tech.category}}</p>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Experience</span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">{{tech.experience}}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-secondary-700 rounded-full h-2">
                <div class="bg-gradient-to-r {{tech.gradient}} h-2 rounded-full transition-all duration-1000"
                     [style.width.%]="tech.proficiency"></div>
              </div>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {{tech.description}}
            </p>
            
            <div class="flex flex-wrap gap-2">
              @for (project of tech.projects; track project) {
                <span class="bg-gray-100 dark:bg-secondary-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  {{project}}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Backend Technologies -->
<section class="backend-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Backend <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Technologies</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Server-side technologies and databases for building scalable applications
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (backend of getBackendTechnologies(); track backend.id) {
          <div class="backend-card bg-gray-50 dark:bg-secondary-800 p-8 rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-300">
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-16 h-16 rounded-lg bg-gradient-to-br {{backend.gradient}} flex items-center justify-center text-2xl text-white">
                {{backend.icon}}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{backend.name}}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{backend.type}}</p>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Proficiency</span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">{{backend.level}}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-secondary-700 rounded-full h-2">
                <div class="bg-gradient-to-r {{backend.gradient}} h-2 rounded-full transition-all duration-1000"
                     [style.width.%]="backend.level"></div>
              </div>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {{backend.description}}
            </p>
            
            <div class="flex flex-wrap gap-2">
              @for (feature of backend.features; track feature) {
                <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs">
                  {{feature}}
                </span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Tools & DevOps -->
<section class="tools-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tools & <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">DevOps</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Development tools, version control, and deployment technologies I use daily
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (tool of getToolsAndDevOps(); track tool.id) {
          <div class="tool-card bg-white dark:bg-secondary-900 p-6 rounded-xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br {{tool.gradient}} flex items-center justify-center text-2xl text-white transform group-hover:scale-110 transition-transform">
              {{tool.icon}}
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {{tool.name}}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {{tool.category}}
            </p>
            <div class="w-full bg-gray-200 dark:bg-secondary-700 rounded-full h-1">
              <div class="bg-gradient-to-r {{tool.gradient}} h-1 rounded-full transition-all duration-1000"
                   [style.width.%]="tool.proficiency"></div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Skills Summary -->
 
  `
})
export class SkillsComponent implements OnInit {
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  private initializeAnimations(): void {
    // Hero section animations
    this.animationService.fadeIn('.hero-title', { delay: 0.3 });
    
    // Skill cards animations
    this.animationService.scrollTriggerAnimation('.skill-card', {
      trigger: '.languages-section',
      stagger: 0.1
    });
    
    // Tech cards animations
    this.animationService.scrollTriggerAnimation('.tech-card', {
      trigger: '.frontend-section',
      stagger: 0.1
    });
    
    // Backend cards animations
    this.animationService.scrollTriggerAnimation('.backend-card', {
      trigger: '.backend-section',
      stagger: 0.1
    });
    
    // Tools cards animations
    this.animationService.scrollTriggerAnimation('.tool-card', {
      trigger: '.tools-section',
      stagger: 0.05
    });
    
    // Summary section animation
    this.animationService.scrollTriggerAnimation('.summary-section');
  }

  getProgrammingLanguages() {
    return [
      {
        id: 1,
        name: "JavaScript",
        icon: "🟨",
        level: 95,
        gradient: "from-yellow-400 to-orange-500",
        description: "Expert in ES6+, async programming, DOM manipulation, and modern JavaScript features for building dynamic web applications."
      },
      {
        id: 2,
        name: "TypeScript",
        icon: "🔷",
        level: 90,
        gradient: "from-blue-500 to-blue-700",
        description: "Strong experience with type safety, interfaces, generics, and advanced TypeScript features for enterprise applications."
      },
   
      {
        id: 4,
        name: "HTML5/CSS3",
        icon: "🎨",
        level: 95,
        gradient: "from-orange-500 to-red-500",
        description: "Expert in semantic HTML5, modern CSS3, Flexbox, Grid, animations, and responsive design techniques."
      }
    ];
  }

  getFrontendTechnologies() {
    return [
      {
        id: 1,
        name: "Angular",
        category: "Framework",
        icon: "⚡",
        gradient: "from-red-500 to-red-700",
        experience: "1.6 + Years",
        proficiency: 95,
        description: "Expert in Angular development with deep knowledge of components, services, routing, RxJS, and state management.",
        projects: ["NavYojana ERP", "Courtyardly", "MeetWise"]
      },
      
      {
        id: 3,
        name: "React",
        category: "Library",
        icon: "⚛️",
        gradient: "from-blue-400 to-cyan-500",
        experience: "1+ Year",
        proficiency: 70,
        description: "Growing expertise in React, hooks, state management, and modern React patterns.",
        projects: ["Component Libraries", "Small Apps"]
      },
      {
        id: 4,
        name: "Tailwind CSS",
        category: "CSS Framework",
        icon: "🎯",
        gradient: "from-cyan-500 to-blue-500",
        experience: "2+ Years",
        proficiency: 90,
        description: "Expert in utility-first CSS framework for rapid UI development and responsive design.",
        projects: ["NanoCV", "Multiple Projects"]
      },
      {
        id: 5,
        name: "Bootstrap",
        category: "CSS Framework",
        icon: "🅱️",
        gradient: "from-purple-500 to-indigo-500",
        experience: "2+ Years",
        proficiency: 85,
        description: "Extensive experience with Bootstrap components, grid system, and responsive utilities.",
        projects: ["Legacy Projects", "Client Work"]
      },
      {
        id: 6,
        name: "SASS/SCSS",
        category: "CSS Preprocessor",
        icon: "💎",
        gradient: "from-pink-500 to-rose-500",
        experience: "2+ Years",
        proficiency: 85,
        description: "Proficient in SASS/SCSS for advanced CSS with variables, mixins, and nested rules.",
        projects: ["Angular Projects", "Custom Themes"]
      }
    ];
  }

  getBackendTechnologies() {
    return [
      {
        id: 1,
        name: "Node.js",
        type: "Runtime",
        icon: "💚",
        gradient: "from-green-500 to-green-700",
        level: 85,
        description: "Strong experience building scalable server-side applications and RESTful APIs with Node.js.",
        features: ["Express.js", "API Development", "Middleware", "Authentication"]
      },
    
     
     
     
    ];
  }

  getToolsAndDevOps() {
    return [
      {
        id: 1,
        name: "Git",
        category: "Version Control",
        icon: "🌿",
        gradient: "from-orange-500 to-red-500",
        proficiency: 90
      },
      {
        id: 2,
        name: "VS Code",
        category: "IDE",
        icon: "💙",
        gradient: "from-blue-500 to-indigo-500",
        proficiency: 95
      },
      {
        id: 3,
        name: "Docker",
        category: "Containerization",
        icon: "🐳",
        gradient: "from-blue-400 to-cyan-500",
        proficiency: 75
      },
    
       
      {
        id: 6,
        name: "Figma",
        category: "Design",
        icon: "🎨",
        gradient: "from-purple-500 to-pink-500",
        proficiency: 80
      },
      {
        id: 7,
        name: "npm/yarn",
        category: "Package Manager",
        icon: "📦",
        gradient: "from-red-500 to-pink-500",
        proficiency: 50
      },
    
    ];
  }
}