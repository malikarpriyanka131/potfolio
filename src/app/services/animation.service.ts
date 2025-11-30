import { Injectable, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  // Fade in animation
  fadeIn(element: HTMLElement | string, options: gsap.TweenVars = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        ...options 
      }
    );
  }

  // Slide in from left
  slideInLeft(element: HTMLElement | string, options: gsap.TweenVars = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    return gsap.fromTo(element,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out",
        ...options 
      }
    );
  }

  // Slide in from right
  slideInRight(element: HTMLElement | string, options: gsap.TweenVars = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    return gsap.fromTo(element,
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out",
        ...options 
      }
    );
  }

  // Scale in animation
  scaleIn(element: HTMLElement | string, options: gsap.TweenVars = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        ease: "back.out(1.7)",
        ...options 
      }
    );
  }

  // Stagger animation for multiple elements
  staggerIn(elements: HTMLElement[] | string, options: gsap.TweenVars = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    return tl.fromTo(elements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.2,
        ...options 
      }
    );
  }

  // Typing animation
  typeWriter(element: HTMLElement | string, text: string, options: { speed?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { speed = 0.05 } = options;
    const tl = gsap.timeline();
    
    tl.to(element, { 
      text: text, 
      duration: text.length * speed, 
      ease: "none" 
    });
    
    return tl;
  }

  // Scroll-triggered animation
  scrollTriggerAnimation(element: HTMLElement | string, options: gsap.TweenVars & { trigger?: string } = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    const { trigger, ...tweenOptions } = options;
    
    return gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        ...tweenOptions
      }
    );
  }

  // Page transition
  pageTransition(): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-primary-600 z-50';
    overlay.style.transform = 'translateX(-100%)';
    document.body.appendChild(overlay);
    
    tl.to(overlay, { x: 0, duration: 0.5, ease: "power2.inOut" })
      .to(overlay, { x: '100%', duration: 0.5, ease: "power2.inOut", delay: 0.2 })
      .call(() => {
        document.body.removeChild(overlay);
      });
    
    return tl;
  }

  // Hover animations
  hoverScale(element: HTMLElement | string): void {
    if (!this.isBrowser) return;
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  }

  // Navigation menu animation
  animateNavMenu(isOpen: boolean, menuElement: HTMLElement): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    
    if (isOpen) {
      tl.fromTo(menuElement, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else {
      tl.to(menuElement, 
        { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" }
      );
    }
    
    return tl;
  }

  // Refresh ScrollTrigger (useful for dynamic content)
  refreshScrollTrigger(): void {
    if (this.isBrowser && ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  // Counter animation
  animateCounter(element: HTMLElement | string, endValue: number, options: { duration?: number; prefix?: string; suffix?: string } = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    const { duration = 2, prefix = '', suffix = '' } = options;
    const obj = { value: 0 };
    
    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
          el.textContent = prefix + Math.round(obj.value) + suffix;
        }
      }
    });
  }

  // Progress bar animation
  animateProgressBar(element: HTMLElement | string, percentage: number, options: { duration?: number; color?: string } = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    const { duration = 1.5, color = '#6366f1' } = options;
    
    return gsap.fromTo(element,
      { width: '0%', backgroundColor: color },
      {
        width: percentage + '%',
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reset"
        }
      }
    );
  }

  // Floating animation
  floatingAnimation(element: HTMLElement | string, options: { y?: number; duration?: number; delay?: number } = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    const { y = 10, duration = 3, delay = 0 } = options;
    
    return gsap.to(element, {
      y: y,
      duration,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay
    });
  }

  // Parallax scrolling effect
  parallaxScroll(element: HTMLElement | string, speed: number = 0.5): void {
    if (!this.isBrowser) return;
    
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
          gsap.set(el, {
            y: self.progress * speed * window.innerHeight
          });
        }
      }
    });
  }

  // Magnetic button effect
  magneticEffect(element: HTMLElement | string, strength: number = 0.3): void {
    if (!this.isBrowser) return;
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    el.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (mouseEvent.clientX - centerX) * strength;
      const deltaY = (mouseEvent.clientY - centerY) * strength;
      
      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }

  // Text reveal animation
  textReveal(element: HTMLElement | string, options: { stagger?: number; duration?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { stagger = 0.05, duration = 0.8 } = options;
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    const text = el.textContent || '';
    el.innerHTML = '';
    
    // Split text into spans
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      el.appendChild(span);
    });
    
    const spans = el.querySelectorAll('span');
    const tl = gsap.timeline();
    
    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      ease: "back.out(1.7)",
      stagger,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reset"
      }
    });
    
    return tl;
  }

  // Morphing shapes animation
  morphShape(element: HTMLElement | string, paths: string[], options: { duration?: number; repeat?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { duration = 2, repeat = -1 } = options;
    const tl = gsap.timeline({ repeat, yoyo: true });
    
    paths.forEach((path, index) => {
      if (index === 0) return;
      tl.to(element, {
        attr: { d: path },
        duration,
        ease: "power2.inOut"
      });
    });
    
    return tl;
  }

  // Page loading animation
  pageLoadAnimation(): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-white dark:bg-secondary-900 z-50 flex items-center justify-center';
    overlay.innerHTML = `
      <div class="text-center">
        <div class="loading-spinner w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Loading Portfolio...</h2>
      </div>
    `;
    document.body.appendChild(overlay);
    
    // Animate spinner
    gsap.to('.loading-spinner', {
      rotation: 360,
      duration: 1,
      ease: "none",
      repeat: -1
    });
    
    // Hide overlay after content loads
    tl.to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 1,
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });
    
    return tl;
  }

  // Glitch effect
  glitchEffect(element: HTMLElement | string, options: { duration?: number; intensity?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { duration = 0.5, intensity = 5 } = options;
    const tl = gsap.timeline();
    
    tl.to(element, {
      x: intensity,
      duration: duration / 4,
      ease: "power2.inOut"
    })
    .to(element, {
      x: -intensity,
      duration: duration / 4,
      ease: "power2.inOut"
    })
    .to(element, {
      x: intensity / 2,
      duration: duration / 4,
      ease: "power2.inOut"
    })
    .to(element, {
      x: 0,
      duration: duration / 4,
      ease: "power2.inOut"
    });
    
    return tl;
  }

  // Scroll-based text animation
  scrollTextAnimation(element: HTMLElement | string): void {
    if (!this.isBrowser) return;
    
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
          const progress = self.progress;
          gsap.set(el, {
            backgroundPosition: `${progress * 100}% 0%`
          });
        }
      }
    });
  }

  // Floating hover animation for cards
  floatingHoverAnimation(element: HTMLElement | string): void {
    if (!this.isBrowser) return;
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    const timeline = gsap.timeline({ paused: true });
    timeline.to(el, {
      y: -10,
      duration: 0.4,
      ease: "power2.out"
    });
    
    el.addEventListener('mouseenter', () => timeline.play());
    el.addEventListener('mouseleave', () => timeline.reverse());
  }

  // Kill all animations
  killAll(): void {
    if (this.isBrowser) {
      gsap.killTweensOf("*");
      ScrollTrigger.killAll();
    }
  }

  // ====== 6 PREMIUM ANIMATIONS ======

  // 1. Hero Parallax with Tilt
  heroParallaxTilt(element: HTMLElement | string, options: { intensity?: number; speed?: number } = {}): void {
    if (!this.isBrowser) return;
    
    const { intensity = 20, speed = 0.5 } = options;
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    // Parallax scroll
    this.parallaxScroll(el as HTMLElement, speed);
    
    // Tilt on mouse move
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
      const rotateY = ((e.clientX - centerX) / rect.width) * -intensity;
      
      gsap.to(el, {
        rotationX: rotateX * 0.5,
        rotationY: rotateY * 0.5,
        transformOrigin: "center",
        duration: 0.1,
        ease: "power1.out",
        overwrite: "auto"
      });
    });
  }

  // 2. Staggered Card Entrance with Rotation
  staggerCardEntrance(elements: HTMLElement[] | string, options: { staggerDelay?: number; rotation?: number; duration?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { staggerDelay = 0.15, rotation = 5, duration = 0.8 } = options;
    
    const tl = gsap.timeline();
    return tl.fromTo(elements,
      { 
        opacity: 0, 
        y: 60,
        rotation: rotation,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration,
        ease: "back.out(1.5)",
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: elements,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }

  // 3. Card Hover Scale + Shadow + Lift
  cardHoverEffect(element: HTMLElement | string, options: { scaleAmount?: number; shadowIntensity?: number } = {}): void {
    if (!this.isBrowser) return;
    
    const { scaleAmount = 1.08, shadowIntensity = 30 } = options;
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;
    
    const timeline = gsap.timeline({ paused: true });
    timeline.to(el, {
      scale: scaleAmount,
      y: -10,
      boxShadow: `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(99, 102, 241, 0.3)`,
      duration: 0.3,
      ease: "power2.out"
    }, 0);
    
    el.addEventListener('mouseenter', () => timeline.play());
    el.addEventListener('mouseleave', () => timeline.reverse());
  }

  // 4. Animated Gradient Text with Color Shift
  animatedGradientText(element: HTMLElement | string, options: { colors?: string[]; duration?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const defaultColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#ff6b6b'];
    const { colors = defaultColors, duration = 6 } = options;
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    const tl = gsap.timeline({ repeat: -1 });
    
    colors.forEach((color, index) => {
      tl.to(el, {
        backgroundImage: `linear-gradient(90deg, ${color}, ${colors[(index + 1) % colors.length]})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        duration: duration / colors.length,
        ease: "none"
      });
    });
    
    return tl;
  }

  // 5. Floating Icon/Element with Rotation
  floatingElementAnimation(element: HTMLElement | string, options: { floatY?: number; rotation?: number; duration?: number; delay?: number } = {}): gsap.core.Tween | null {
    if (!this.isBrowser) return null;
    
    const { floatY = 15, rotation = 360, duration = 4, delay = 0 } = options;
    
    return gsap.to(element, {
      y: floatY,
      rotation: rotation,
      duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }

  // 6. Statistics Counter with Pulse
  counterWithPulse(element: HTMLElement | string, startValue: number, endValue: number, options: { duration?: number; prefix?: string; suffix?: string; pulseScale?: number } = {}): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const { duration = 2.5, prefix = '', suffix = '', pulseScale = 1.15 } = options;
    const tl = gsap.timeline();
    const obj = { value: startValue };
    
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return null;
    
    // Counter animation
    tl.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = prefix + Math.round(obj.value) + suffix;
      }
    }, 0);
    
    // Pulse animation on completion
    tl.to(el, {
      scale: pulseScale,
      duration: 0.3,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1
    }, duration * 0.8);
    
    return tl;
  }
}