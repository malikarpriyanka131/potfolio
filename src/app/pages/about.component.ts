import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';

interface PersonalInfo {
  description: string;
  email: string;
  phone: string;
  location: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  university: string;
  duration: string;
  percentage: string;
  specialization: string;
}

interface Certification {
  id: number;
  title: string;
  provider: string;
  duration: string;
}

interface Interest {
  id: number;
  title: string;
  icon: string;
  description: string;
}

interface Statistic {
  id: number;
  value: number;
  label: string;
  description: string;
  suffix: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './about.component.css',
  template: `
<!-- Hero Section -->
<section class="about-hero py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Profile Section -->
        <div class="profile-section space-y-6">
          <div class="flex items-center space-x-6">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-spin-slow">
                <div class="w-full h-full rounded-full bg-white dark:bg-secondary-800 flex items-center justify-center">
                  <span class="text-4xl font-bold text-primary-600 dark:text-white">PM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 class="hero-title text-4xl md:text-5xl font-bold text-white dark:text-white mb-4">
                About <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Priyanka Nandkishor Malikar</span>
              </h1>
              <p class="text-xl text-white dark:text-gray-300 leading-relaxed">
                {{personalInfo().description}}
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="contact-info grid gap-4">
          <div class="contact-item bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Email</h3>
              <span class="text-gray-600 dark:text-gray-300">{{personalInfo().email}}</span>
            </div>
          </div>

          <div class="contact-item bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Phone</h3>
              <span class="text-gray-600 dark:text-gray-300">{{personalInfo().phone}}</span>
            </div>
          </div>

          <div class="contact-item bg-white dark:bg-secondary-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">Location</h3>
              <span class="text-gray-600 dark:text-gray-300">{{personalInfo().location}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Statistics Section -->
<section class="stats-section py-20 bg-gradient-to-r from-blue-600 to-purple-600">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-4">
          By the Numbers
        </h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          Some key metrics that showcase my journey and achievements in software development
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (stat of getStatistics(); track stat.id) {
          <div class="stat-card bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
            <div class="stat-number text-4xl md:text-5xl font-bold text-white mb-2" [id]="'stat-' + stat.id">
              0
            </div>
            <div class="text-blue-100 text-lg font-semibold mb-2">{{stat.label}}</div>
            <div class="text-blue-200 text-sm">{{stat.description}}</div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Education Section -->
<section class="education-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Educational <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Journey</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          My academic background in computer science and technology
        </p>
      </div>

      <div class="space-y-6">
        @for (education of getEducation(); track education.id) {
          <div class="education-item bg-gray-50 dark:bg-secondary-800 p-8 rounded-xl shadow-lg">
            <div class="grid md:grid-cols-3 gap-6 items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {{education.degree}}
                </h3>
                <p class="text-blue-600 dark:text-blue-400 font-semibold">
                  {{education.specialization}}
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{education.institution}}
                </h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  {{education.university}}
                </p>
              </div>
              <div class="text-right">
                <div class="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {{education.duration}}
                </div>
                <p class="text-gray-600 dark:text-gray-300 font-semibold">
                  {{education.percentage}}
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Certifications Section -->
<section class="certifications-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Certifications</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Continuous learning and skill development through industry-recognized courses
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (cert of getCertifications(); track cert.id) {
          <div class="cert-card bg-white dark:bg-secondary-900 p-6 rounded-xl shadow-lg">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {{cert.title}}
                </h3>
                <p class="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">
                  {{cert.provider}}
                </p>
                <div class="inline-flex items-center bg-gray-100 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                  {{cert.duration}}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Interests Section -->
<section class="interests-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Personal <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Interests</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          What drives my passion for technology and innovation
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (interest of getInterests(); track interest.id) {
          <div class="interest-card bg-gray-50 dark:bg-secondary-800 p-6 rounded-xl shadow-lg text-center">
            <div class="w-16 h-16 mx-auto mb-4 text-4xl">{{interest.icon}}</div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{interest.title}}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{interest.description}}
            </p>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section py-20 bg-gradient-to-r from-blue-600 to-purple-600">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-6">
        Let's Build Something Amazing Together
      </h2>
      <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Ready to turn your ideas into reality? Let's discuss your next project and create innovative solutions.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a routerLink="/contact" 
           class="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Get In Touch
        </a>
        
        <a routerLink="/projects" 
           class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-primary-600 hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          View Portfolio
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class AboutComponent implements OnInit {
  private animationService = inject(AnimationService);
  
    personalInfo = signal({
    description: "Results-driven Software Developer with 2+ years of experience specializing in Angular, JavaScript, TypeScript, SQL, REST API integration, and Frontend Development. Skilled in building scalable SPAs, improving UI performance, and delivering robust user-centric solutions. Hands-on experience with Python for automation, contributing to workflow efficiency. Strong understanding of SDLC, Agile, CI/CD pipelines, and Git. Recognized for enhancing performance, reducing manual effort, and delivering reliable, production-ready features.",
    email: "malikarpriyanka7@gmail.com",
    phone: "+91 7721997413",
    location: "Pune, Maharashtra, India"
  });

  constructor() {
    afterNextRender(() => {
      this.initializeAnimations();
    });
  }

  ngOnInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Hero section animations
    this.animationService.fadeIn('.profile-section', { delay: 0.3 });
    this.animationService.scaleIn('.profile-section .group', { delay: 0.5 });
    this.animationService.fadeIn('.hero-title', { delay: 0.7 });
    
    // Contact info animations
    this.animationService.staggerIn('.contact-item', { delay: 0.9, stagger: 0.1 });
    
    // Statistics section animations and counters
    this.animationService.scrollTriggerAnimation('.stat-card', {
      trigger: '.stats-section',
      stagger: 0.1
    });
    
    // Initialize counter animations for statistics
    setTimeout(() => {
      this.getStatistics().forEach(stat => {
        this.animationService.animateCounter(
          `#stat-${stat.id}`, 
          stat.value, 
          { 
            duration: 2, 
            prefix: '', 
            suffix: stat.suffix 
          }
        );
      });
    }, 500);
    
    // Add floating animation to stat cards
    this.animationService.floatingAnimation('.stat-card:nth-child(1)', { delay: 0 });
    this.animationService.floatingAnimation('.stat-card:nth-child(2)', { delay: 0.5 });
    this.animationService.floatingAnimation('.stat-card:nth-child(3)', { delay: 1 });
    this.animationService.floatingAnimation('.stat-card:nth-child(4)', { delay: 1.5 });
    
    // Education section animations
    this.animationService.scrollTriggerAnimation('.education-item', {
      trigger: '.education-section'
    });
    
    // Certifications animations
    this.animationService.scrollTriggerAnimation('.cert-card', {
      trigger: '.certifications-section'
    });
    
    // Interests animations
    this.animationService.scrollTriggerAnimation('.interest-card', {
      trigger: '.interests-section'
    });
    
    // Add magnetic effect to interest cards
    setTimeout(() => {
      this.animationService.magneticEffect('.interest-card', 0.2);
    }, 1000);
    
    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section');
  }

  getEducation() {
    return [
      {
        id: 1,
        degree: "Bachelor of Technology in Computer Engineering",
        institution: "Government College of Engineering, Yavatmal",
        university: "DBATU",
        duration: "2019 - 2023",
        percentage: "CGPA: 9.18",
        specialization: "Computer Engineering"
      },
      {
        id: 2,
        degree: "Diploma in Computer Engineering",
        institution: "GRWP Yavatmal",
        university: "",
        duration: "2017 - 2020",
        percentage: "PCT: 90.06%",
        specialization: "Computer Engineering"
      },
      {
        id: 3,
        degree: "SSC",
        institution: "Babasaheb Deshmukh Vidyalay",
        university: "",
        duration: "2016 - 2017",
        percentage: "PCT: 80.60%",
        specialization: "General"
      }
    ];
  }

  getCertifications() {
    return [
      {
        id: 1,
        title: "Smart India Hackathon 2022",
        provider: "Senior Software Edition (Grand Finalist)",
        duration: "2022"
      },
      {
        id: 2,
        title: "Responsive Web Development",
        provider: "FreeCodeCamp (JavaScript, HTML5, CSS3)",
        duration: "2022"
      },
      {
        id: 3,
        title: "Android Development",
        provider: "Java",
        duration: "2021"
      },
      {
        id: 4,
        title: "Android App Development with Kotlin",
        provider: "Top Performer",
        duration: "2021"
      },
      {
        id: 5,
        title: "Core Python & Web Designing",
        provider: "Certification",
        duration: "2021"
      },
      {
        id: 6,
        title: "Oracle Certified Java SE 8",
        provider: "Oracle",
        duration: "2020"
      },
      {
        id: 7,
        title: "Google Analytics for Beginners",
        provider: "Google",
        duration: "2020"
      },
      {
        id: 8,
        title: "Entrepreneurship Development",
        provider: "Certification",
        duration: "2020"
      }
    ];
  }

  getInterests() {
    return [
      {
        id: 1,
        title: "Web Development",
        icon: "💻",
        description: "Building modern, responsive web applications with latest technologies"
      },
      {
        id: 2,
        title: "Technology Research",
        icon: "🔬",
        description: "Exploring new frameworks, tools and emerging tech trends"
      },
      {
        id: 3,
        title: "Problem Solving",
        icon: "🧩",
        description: "Analyzing complex problems and creating efficient solutions"
      },
      {
        id: 4,
        title: "Open Source",
        icon: "🌐",
        description: "Contributing to open source projects and community development"
      }
    ];
  }

  getStatistics() {
    return [
      {
        id: 1,
        value: 2,
        label: "Years Experience",
        description: "Professional development",
        suffix: "+"
      },
      {
        id: 2,
        value: 5,
        label: "Projects Delivered",
        description: "Successfully completed",
        suffix: ""
      },
      {
        id: 3,
        value: 18,
        label: "Technologies",
        description: "Mastered & used",
        suffix: "+"
      },
      {
        id: 4,
        value: 98,
        label: "Defect-Free Rate",
        description: "In Agile delivery",
        suffix: "%"
      }
    ];
  }
}