import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, afterNextRender } from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-tech-bg',
  standalone: true,
  template: `
    <div #container class="tech-bg absolute inset-0 overflow-hidden pointer-events-none">
      <!-- SVG Lines - smooth bezier curves -->
      <svg #svgElem class="lines absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>

      <!-- High-performance canvas for particles -->
      <canvas #canvasElem class="particle-canvas absolute inset-0 w-full h-full"></canvas>

      <!-- Subtle grid overlay for depth -->
      <div class="grid-overlay absolute inset-0 mix-blend-overlay"></div>
    </div>
  `,
  styles: [
    `
    .tech-bg { z-index: 0; }
    .lines { color: rgba(99,102,241,0.06); mix-blend-mode: screen; }
    .particle-canvas { display: block; }
    .grid-overlay {
      background-image: radial-gradient(circle at 10% 10%, rgba(99,102,241,0.02), transparent 8%),
                        radial-gradient(circle at 90% 90%, rgba(236,72,153,0.02), transparent 8%),
                        linear-gradient(0deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01));
      backdrop-filter: blur(0.6px);
      opacity: 0.12;
      pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .tech-bg { opacity: 0.06 !important; }
      .particle-canvas { display: none !important; }
    }
  `
  ]
})
export class TechBgComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('svgElem', { static: true }) svgRef!: ElementRef<SVGElement>;
  @ViewChild('canvasElem', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationService = inject(AnimationService);
  private lines: { points: { x: number; y: number }[]; pathEl: SVGPathElement; tween?: gsap.core.Tween }[] = [];
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
  private rafId = 0;
  private mouseX = 0;
  private mouseY = 0;
  private destroyed = false;

  constructor() {
    afterNextRender(() => {
      // start animations after first render
      if (!this.prefersReducedMotion()) {
        this.start();
      }
    });
  }

  ngOnInit(): void {
    // create svg lines and canvas particles
    this.setupSVGLines();
    this.setupCanvas();
    this.createParticles();
    // mouse parallax
    this.containerRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.containerRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    gsap.killTweensOf(this.lines.map(l => l.points));
    gsap.killTweensOf(this.particles as any);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  // PUBLIC - start animations (safe to call again)
  start() {
    this.initializeLineTweens();
    this.animateCanvas();
  }

  private prefersReducedMotion(): boolean {
    // prefer globalThis.window for environments where window may be shadowed
  // Use optional chaining on globalThis.window.matchMedia for safer checks
  return (globalThis as any).window?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }

  private setupSVGLines() {
    const svg = this.svgRef.nativeElement;
    // create 3 smooth bezier paths for depth
    const strokeWidths = [0.18, 0.12, 0.08];
    for (let i = 0; i < 3; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
  // much subtler stroke opacity per depth
  path.setAttribute('stroke-opacity', Math.max(0.02, (0.06 - i * 0.015)).toString());
      path.setAttribute('stroke-width', strokeWidths[i].toString());
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(path);

      // generate control points normalized to 0-100 (SVG viewBox)
      const points = this.makeWavePoints(12, 50 + i * 6, 8 + i * 6);
      this.lines.push({ points, pathEl: path });
    }
  }

  private initializeLineTweens() {
    // animate control points (y offsets) with gentle, infinite tweens
    for (let idx = 0; idx < this.lines.length; idx++) {
      const line = this.lines[idx];
      // staggered animation for depth
      const duration = 6 + idx * 2;
      gsap.to(line.points, {
        // randomize y values subtly
        y: (i: number, target: any) => target.y + gsap.utils.random(-6 - idx * 2, 6 + idx * 2),
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.08
        },
        onUpdate: () => {
          for (const l of this.lines) {
            l.pathEl.setAttribute('d', this.buildSmoothPath(l.points));
          }
        }
      } as any);
    }
  }

  private buildSmoothPath(points: { x: number; y: number }[]) {
    if (!points.length) return '';
    // Catmull-Rom to cubic bezier conversion for smooth curves
    const crToBezier = (pts: { x: number; y: number }[]) => {
      const d = [] as string[];
      const p0 = pts[0];
      d.push(`M ${p0.x} ${p0.y}`);
      for (let i = 0; i < pts.length - 1; i++) {
        const pA = pts[i];
        const pB = pts[i + 1];
        const pPrev = pts[i - 1] || pA;
        const pNext = pts[i + 2] || pB;

        const control1x = pA.x + (pB.x - pPrev.x) / 6;
        const control1y = pA.y + (pB.y - pPrev.y) / 6;
        const control2x = pB.x - (pNext.x - pA.x) / 6;
        const control2y = pB.y - (pNext.y - pA.y) / 6;

        d.push(`C ${control1x} ${control1y}, ${control2x} ${control2y}, ${pB.x} ${pB.y}`);
      }
      return d.join(' ');
    };

    return crToBezier(points);
  }

  private makeWavePoints(segments: number, baseY: number, amplitude: number) {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= segments; i++) {
      pts.push({ x: (i / segments) * 100, y: baseY + Math.sin(i / segments * Math.PI * 2) * amplitude });
    }
    return pts;
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.onResize();
  }

  private createParticles() {
    // particle count scales with width for performance
    const w = window.innerWidth;
    let count: number;
    // reduce particle count for a much subtler, performant visual
    if (w > 1400) {
      count = 80;
    } else if (w > 900) {
      count = 45;
    } else {
      count = 20;
    }
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() * 0.4 + 0.05),
        alpha: Math.random() * 0.6 + 0.15
      });
    }
  }

  private animateCanvas = () => {
    if (!this.ctx || this.destroyed) return;
    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    // fade background with transparent fill for trailing effect
    ctx.clearRect(0, 0, w, h);

    // subtle parallax based on mouse
    // subtle parallax based on mouse (reduced multiplier)
    const px = (this.mouseX / window.innerWidth - 0.5) * 12;
    const py = (this.mouseY / window.innerHeight - 0.5) * 6;

    for (const p of this.particles) {
  p.x += p.vx + px * 0.00025;
  p.y += p.vy + py * 0.00035;

      // wrap
      if (p.y - p.r > window.innerHeight) {
        p.y = -10;
        p.x = Math.random() * window.innerWidth;
      }
      if (p.x - p.r > window.innerWidth) p.x = -10;
      if (p.x + p.r < 0) p.x = window.innerWidth + 10;

      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      // soft circular gradient (subtle)
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(2, p.r * 6));
      grd.addColorStop(0, 'rgba(99,102,241,0.28)');
      grd.addColorStop(0.6, 'rgba(99,102,241,0.06)');
      grd.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = grd as unknown as string;
      ctx.arc(p.x + px * 0.02, p.y + py * 0.01, p.r * (devicePixelRatio || 1), 0, Math.PI * 2);
      ctx.fill();
    }

    // draw faint glow lines on top of canvas to blend with svg
    this.rafId = requestAnimationFrame(this.animateCanvas);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    // subtle container parallax
  // gentler container parallax so content remains stable
  gsap.to(this.containerRef.nativeElement, { x: (this.mouseX - window.innerWidth / 2) * 0.006, y: (this.mouseY - window.innerHeight / 2) * 0.003, duration: 0.6, ease: 'power3.out' });
  };

  private onResize = () => {
  const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ratio = devicePixelRatio || 1;
    canvas.width = Math.max(300, Math.floor(window.innerWidth * ratio));
    canvas.height = Math.max(200, Math.floor(window.innerHeight * ratio));
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (this.ctx) this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // recreate particles for new size for consistent density
    this.createParticles();
  };

}