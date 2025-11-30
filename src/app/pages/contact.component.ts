import { Component, signal, inject, OnInit, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../services/animation.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './contact.component.css',
  template: `
<!-- Hero Section -->
<section class="contact-hero py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Get In <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Touch</span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Ready to start your next project? Let's discuss how we can work together to bring your ideas to life with innovative technology solutions.
      </p>
      <div class="mt-8 inline-flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-6 py-3 rounded-full font-semibold">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
        Available for New Projects
      </div>
    </div>
  </div>
</section>

<!-- Contact Methods -->
<section class="contact-methods-section py-20 bg-white dark:bg-secondary-900">
  <div class="container mx-auto px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Multiple Ways to <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Connect</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose your preferred method of communication
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (method of getContactMethods(); track method.id) {
          <div class="contact-method-card bg-gray-50 dark:bg-secondary-800 p-8 rounded-xl shadow-lg text-center group hover:shadow-2xl transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br {{method.gradient}} flex items-center justify-center text-2xl text-white transform group-hover:scale-110 transition-transform">
              {{method.icon}}
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{method.title}}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              {{method.description}}
            </p>
            <a [href]="method.link" [target]="method.external ? '_blank' : '_self'"
               class="inline-flex items-center bg-gradient-to-r {{method.gradient}} text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
              {{method.action}}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        }
      </div>
    </div>
  </div>
</section>

<!-- Contact Form -->
<section class="contact-form-section py-20 bg-gray-50 dark:bg-secondary-800">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Form -->
        <div class="contact-form-container">
          <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Name Field -->
              <div class="form-group">
                <label for="name" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name">
                @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Name is required</p>
                }
              </div>

              <!-- Email Field -->
              <div class="form-group">
                <label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your email address">
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Valid email is required</p>
                }
              </div>

              <!-- Phone Field -->
              <div class="form-group">
                <label for="phone" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  formControlName="phone"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your phone number">
              </div>

              <!-- Subject Field -->
              <div class="form-group">
                <label for="subject" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  formControlName="subject"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors">
                  <option value="">Select a subject</option>
                  <option value="web-development">Web Development</option>
                  <option value="frontend-development">Frontend Development</option>
                  <option value="fullstack-development">Full Stack Development</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="collaboration">Project Collaboration</option>
                  <option value="other">Other</option>
                </select>
                @if (contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Subject is required</p>
                }
              </div>

              <!-- Message Field -->
              <div class="form-group">
                <label for="message" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="5"
                  class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Message is required</p>
                }
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="contactForm.invalid || isSubmitting()"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center">
                @if (isSubmitting()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                } @else {
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Send Message
                }
              </button>
            </form>

            @if (submitStatus() === 'success') {
              <div class="mt-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                  Message sent successfully! I'll get back to you soon.
                </div>
              </div>
            }

            @if (submitStatus() === 'error') {
              <div class="mt-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Failed to send message. Please try again or contact me directly.
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Contact Info -->
        <div class="contact-info-container">
          <div class="space-y-8">
            <!-- Personal Info -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div class="space-y-6">
                @for (info of getContactInfo(); track info.id) {
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br {{info.gradient}} flex items-center justify-center text-white">
                      {{info.icon}}
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-900 dark:text-white">{{info.title}}</h4>
                      <p class="text-gray-600 dark:text-gray-300">{{info.value}}</p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Availability -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Availability
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Response Time</span>
                  <span class="font-semibold text-gray-900 dark:text-white">Within 24 hours</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Time Zone</span>
                  <span class="font-semibold text-gray-900 dark:text-white">IST (UTC+5:30)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 dark:text-gray-300">Project Availability</span>
                  <span class="inline-flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-white dark:bg-secondary-900 p-8 rounded-2xl shadow-lg">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Me
              </h3>
              
              <div class="flex space-x-4">
                @for (social of getSocialLinks(); track social.id) {
                  <a [href]="social.url" target="_blank" 
                     class="w-12 h-12 rounded-lg bg-gradient-to-br {{social.gradient}} flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    {{social.icon}}
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl font-bold text-white mb-6">
        Let's Build Something Amazing Together
      </h2>
      <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
        Ready to turn your vision into reality? I'm here to help you create innovative digital solutions that make a difference.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="mailto:malikarpriyanka7@gmail.com" 
        class="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Email Me Directly
        </a>
        
        <a routerLink="/projects" 
           class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white hover:text-indigo-600 hover:scale-105 inline-flex items-center">
          <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          View My Work
        </a>
      </div>
    </div>
  </div>
</section>
  `
})
export class ContactComponent implements OnInit {
  private animationService = inject(AnimationService);
  private fb = inject(FormBuilder);
  
  contactForm: FormGroup;
  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

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
    
    // Contact method cards animations
    this.animationService.scrollTriggerAnimation('.contact-method-card', {
      trigger: '.contact-methods-section',
      stagger: 0.1
    });
    
    // Form animations
    this.animationService.scrollTriggerAnimation('.contact-form-container', {
      trigger: '.contact-form-section'
    });
    
    this.animationService.scrollTriggerAnimation('.contact-info-container', {
      trigger: '.contact-form-section',
      delay: 0.2
    });
    
    // CTA section animation
    this.animationService.scrollTriggerAnimation('.cta-section');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.submitStatus.set('idle');
      
      // Simulate form submission
      setTimeout(() => {
        // In a real application, you would send the form data to your backend
        console.log('Form submitted:', this.contactForm.value);
        
        // Simulate success/error
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        if (isSuccess) {
          this.submitStatus.set('success');
          this.contactForm.reset();
        } else {
          this.submitStatus.set('error');
        }
        
        this.isSubmitting.set(false);
        
        // Clear status after 5 seconds
        setTimeout(() => {
          this.submitStatus.set('idle');
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  getContactMethods() {
    return [
      {
        id: 1,
        title: "Email",
        description: "Send me an email for detailed inquiries",
        icon: "✉️",
        gradient: "from-blue-500 to-blue-700",
        action: "Send Email",
        link: "mailto:malikarpriyanka7@gmail.com",
        external: false
      },
      {
        id: 2,
        title: "Phone",
        description: "Call me for immediate assistance",
        icon: "📞",
        gradient: "from-green-500 to-green-700",
        action: "Call Now",
        link: "tel:+917721997413",
        external: false
      },
      {
        id: 3,
        title: "WhatsApp",
        description: "Quick chat on WhatsApp",
        icon: "💬",
        gradient: "from-green-400 to-green-600",
        action: "Chat Now",
        link: "https://wa.me/917721997413",
        external: true
      },
      {
        id: 4,
        title: "LinkedIn",
        description: "Connect with me professionally",
        icon: "💼",
        gradient: "from-blue-600 to-blue-800",
        action: "Connect",
        link: "#",
        external: true
      }
    ];
  }

  getContactInfo() {
    return [
      {
        id: 1,
        title: "Email",
        value: "malikarpriyanka7@gmail.com",
        icon: "✉️",
        gradient: "from-blue-500 to-blue-700"
      },
      {
        id: 2,
        title: "Phone",
        value: "+91 7721997413",
        icon: "📞",
        gradient: "from-green-500 to-green-700"
      },
      {
        id: 3,
        title: "Location",
        value: "Pune, Maharashtra, India",
        icon: "📍",
        gradient: "from-purple-500 to-purple-700"
      }
    ];
  }

  getSocialLinks() {
    return [
      {
        id: 1,
        name: "LinkedIn",
        url: "#",
        icon: "💼",
        gradient: "from-blue-600 to-blue-800"
      },
      {
        id: 2,
        name: "GitHub",
        url: "#",
        icon: "💻",
        gradient: "from-gray-700 to-gray-900"
      },
      {
        id: 3,
        name: "Twitter",
        url: "#",
        icon: "🐦",
        gradient: "from-blue-400 to-blue-600"
      },
      {
        id: 4,
        name: "Instagram",
        url: "#",
        icon: "📷",
        gradient: "from-pink-500 to-purple-600"
      }
    ];
  }
}