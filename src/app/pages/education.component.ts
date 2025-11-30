import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../services/animation.service';
import { educationData } from '../data/education';

interface Education {
  school: string;
  degree: string;
  field: string;
  score: string;
  duration: string;
  logo?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="education-section py-20 bg-gray-50 dark:bg-secondary-900">
      <div class="container mx-auto px-6">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600dark:text-white mb-4">
            Educational <span class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic background and qualifications that shape my professional expertise
          </p>
        </div>

        <!-- Education Timeline --> 
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>

          <!-- Education Items -->
          <div class="space-y-16">
            @for(edu of education(); track edu.school) {
              <div class="relative">
                <!-- Timeline Dot -->
                <div class="absolute left-1/2 transform -translate-x-1/2 -mt-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-secondary-900"></div>
                </div>

                <!-- Education Card -->
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <!-- Left Side (even items) or Right Side (odd items) -->
                  <div [class.md:col-start-1.md:text-right]="$index % 2 === 0" 
                       [class.md:col-start-2]="$index % 2 === 1"
                       class="education-card bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    
                    <div class="flex flex-col">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ edu.school }}</h3>
                      <div class="text-primary-600 dark:text-primary-400 font-medium mb-2">{{ edu.degree }}</div>
                      <div class="text-gray-600 dark:text-gray-300">{{ edu.field }}</div>
                      <div class="flex items-center justify-between mt-4">
                        <div class="text-accent-600 dark:text-accent-400 font-medium">{{ edu.score }}</div>
                        <div class="text-gray-500 dark:text-gray-400">{{ edu.duration }}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Certifications Section -->
        <div class="mt-20">
          <h3 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Professional <span class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Certifications</span>
          </h3>

          <div class="grid md:grid-cols-3 gap-8">
            @for(cert of certifications(); track cert) {
              <div class="certification-card bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">
                  🎓
                </div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ cert }}</h4>
              </div>
            }
          </div>
        </div>

        <!-- Achievements Section -->
        <div class="mt-20">
          <h3 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Notable <span class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Achievements</span>
          </h3>

          <div class="grid md:grid-cols-2 gap-8">
            @for(achievement of achievements(); track achievement) {
              <div class="achievement-card bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    🏆
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ achievement }}</h4>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .education-card {
      position: relative;
      overflow: hidden;
    }

    .education-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .education-card:hover::before {
      opacity: 1;
    }

    .certification-card::before,
    .achievement-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to));
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 1rem;
      z-index: -1;
    }

    .certification-card:hover::before,
    .achievement-card:hover::before {
      opacity: 0.1;
    }
  `]
})
export class EducationComponent {
  education = educationData;
  
  certifications = signal([
    'Smart India Hackathon 2022 — Senior Software Edition (Grand Finalist)',
    'Responsive Web Development - FreeCodeCamp (JavaScript, HTML5, CSS3)',
    'Android Development (Java)',
    'Android App Development with Kotlin — Top Performer',
    'Core Python & Web Designing',
    'Oracle Certified Java SE 8',
    'Google Analytics for Beginners',
    'Entrepreneurship Development'
  ]);

  achievements = signal([
    'Smart India Hackathon 2022 — Grand Finalist',
    'Delivered multiple production-ready web applications and PWAs',
    'Recognized for performance optimizations and high-quality deliveries'
  ]);

  constructor(private animationService: AnimationService) {
    // Initialize animations after view init
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Animate education cards
    this.animationService.fadeIn('.education-card', { delay: 0.3 });
    
    // Animate certification cards
    this.animationService.fadeIn('.certification-card', { delay: 0.5 });
    
    // Animate achievement cards
    this.animationService.fadeIn('.achievement-card', { delay: 0.7 });
    
    // Animate timeline
    this.animationService.scrollTriggerAnimation('.timeline-line');
  }
}