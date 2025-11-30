import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';
import { experienceData } from '../data/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './experience.component.css',
  template: `
<!-- Hero Section -->
<section class="experience-hero py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-white dark:text-white mb-6">
        Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Experience</span>
      </h1>
      <p class="text-xl text-white dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        2+ years of professional development experience building scalable web applications and APIs using modern frontend and backend technologies.
      </p>
      <div class="mt-8 inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-6 py-3 rounded-full font-semibold">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
          {{getTotalExperience()}} Years of Experience
      </div>
    </div>
  </div>
</section>

<!-- Timeline Section -->
<section class="timeline-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Career <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Journey</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          My professional journey across leading technology companies
        </p>
      </div>

      <!-- Timeline Container -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

        @for (experience of getExperiences(); track experience.id; let i = $index) {
          <div class="experience-item relative flex items-center mb-16 {{i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}}">
            <!-- Timeline Dot -->
            <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r {{experience.dotColor}} rounded-full border-4 border-white dark:border-secondary-900 shadow-lg z-10"></div>
            
            <!-- Content Card -->
            <div class="ml-20 md:ml-0 {{i % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'}} md:w-1/2">
              <div class="experience-card bg-white dark:bg-secondary-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-secondary-700 group hover:shadow-2xl transition-all duration-300">
                <!-- Company Header -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br {{experience.companyColor}} flex items-center justify-center text-white font-bold text-lg">
                      {{experience.companyInitials}}
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{experience.company}}</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{experience.location}}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {{experience.duration}}
                    </div>
                  </div>
                </div>

                <!-- Position -->
                <div class="mb-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{experience.position}}</h4>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{experience.description}}</p>
                </div>

                <!-- Key Achievements -->
                <div class="mb-6">
                  <h5 class="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                    Key Achievements
                  </h5>
                  <ul class="space-y-2">
                    @for (achievement of experience.achievements; track achievement) {
                      <li class="flex items-start space-x-2">
                        <svg class="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-gray-600 dark:text-gray-300 text-sm">{{achievement}}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Technologies -->
                <div class="mb-6">
                  <h5 class="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                    Technologies Used
                  </h5>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of experience.technologies; track tech) {
                      <span class="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                        {{tech}}
                      </span>
                    }
                  </div>
                </div>

                <!-- Projects -->
                <!-- @if (experience.projects && experience.projects.length > 0) {
                  <div>
                    <h5 class="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                      Key Projects
                    </h5>
                    <div class="space-y-2">
                      @for (project of experience.projects; track project) {
                        <div class="bg-gray-50 dark:bg-secondary-700 p-3 rounded-lg">
                          <span class="text-sm font-medium text-gray-900 dark:text-white">{{project}}</span>
                        </div>
                      }
                    </div>
                  </div>
                } -->
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Skills Developed Section -->
<section class="skills-developed-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Skills <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Developed</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Core competencies gained through professional experience
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        @for (skillCategory of getSkillCategories(); track skillCategory.id) {
          <div class="skill-category-card bg-white dark:bg-secondary-900 p-8 rounded-xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br {{skillCategory.gradient}} flex items-center justify-center text-2xl text-white transform group-hover:scale-110 transition-transform">
              {{skillCategory.icon}}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {{skillCategory.title}}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{skillCategory.description}}
            </p>
            <div class="space-y-2">
              @for (skill of skillCategory.skills; track skill) {
                <div class="bg-gray-50 dark:bg-secondary-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  {{skill}}
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Career Stats -->
<section class="career-stats-section py-20 bg-gradient-to-r from-blue-600 to-purple-600">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">
          Career Highlights
        </h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          Key metrics from my professional journey
        </p>
      </div>

      <div class="grid md:grid-cols-4 gap-8">
        @for (stat of getCareerStats(); track stat.id) {
          <div class="stat-card text-center group">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform">
              {{stat.icon}}
            </div>
            <div class="text-4xl font-bold text-white mb-2 counter" [attr.data-target]="stat.value">
              {{stat.value}}{{stat.suffix}}
            </div>
            <div class="text-blue-200 font-medium">{{stat.label}}</div>
            <div class="text-blue-100 text-sm mt-2">{{stat.description}}</div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Ready to Work Together?
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Let's discuss how my experience can contribute to your next project. I'm always excited to take on new challenges.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a routerLink="/projects" 
           class="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          View My Work
        </a>
        
        <a routerLink="/contact" 
           class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Get In Touch
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class ExperienceComponent implements OnInit {
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
    
    // Timeline animations
    this.animationService.scrollTriggerAnimation('.experience-item', {
      trigger: '.timeline-section',
      stagger: 0.2
    });
    
    // Skills category animations
    this.animationService.scrollTriggerAnimation('.skill-category-card', {
      trigger: '.skills-developed-section',
      stagger: 0.1
    });
    
    // Stats animations
    this.animationService.scrollTriggerAnimation('.stat-card', {
      trigger: '.career-stats-section',
      stagger: 0.1
    });
    
    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section');
  }

  getTotalExperience(): string {
    return "2+";
  }

  getExperiences() {
    // Map central experienceData signal to the component format used in the template
    return experienceData().map((exp, index) => ({
      id: index + 1,
      company: exp.company,
      location: exp.location,
      position: exp.role,
      duration: exp.duration,
      // Use the first line of description as short summary and keep full list as achievements
      description: (exp.description && exp.description.length > 0) ? exp.description[0] : '',
      companyInitials: exp.company.split(' ').slice(0,2).map(s => s[0] || '').join('').toUpperCase(),
      companyColor: index === 0 ? 'from-indigo-500 to-indigo-700' : 'from-green-500 to-emerald-600',
      dotColor: index === 0 ? 'from-indigo-500 to-indigo-700' : 'from-green-500 to-emerald-600',
      achievements: exp.description || [],
      technologies: exp.technologies || []
    }));
  }

  getSkillCategories() {
    return [
      {
        id: 1,
        title: "Languages",
        icon: "💻",
        gradient: "from-blue-500 to-cyan-500",
        description: "Core programming languages and markup technologies",
        skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"]
      },
      {
        id: 2,
        title: "Frameworks & Tools",
        icon: "⚙️",
        gradient: "from-green-500 to-emerald-500", 
        description: "Modern frameworks and development tools",
        skills: ["Angular", "AngularJS", "NodeJS", "ExpressJS", "Webpack", "Gulp", "NPM Scripts"]
      },
      {
        id: 3,
        title: "Architecture & Databases",
        icon: "🏗️",
        gradient: "from-purple-500 to-pink-500",
        description: "Development patterns and data management",
        skills: ["MongoDB", "MySQL", "MVC", "MVVM", "Component Architecture", "Responsive Design"]
      }
    ];
  }

  getCareerStats() {
    return [
      {
        id: 1,
        icon: "💼",
        value: 2,
        suffix: "+",
        label: "Years Experience",
        description: "Professional development"
      },
      {
        id: 2,
        icon: "🏢",
        value: 2,
        suffix: "",
        label: "Companies",
        description: "Worked with"
      },
      {
        id: 3,
        icon: "🚀",
        value: 5,
        suffix: "",
        label: "Projects",
        description: "Successfully delivered"
      },
      {
        id: 4,
        icon: "🛠️",
        value: 18,
        suffix: "+",
        label: "Technologies",
        description: "Mastered & used"
      }
    ];
  }
}