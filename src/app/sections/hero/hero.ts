import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number; color: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroSectionComponent implements OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private platformId = inject(PLATFORM_ID);

  displayText = signal('');
  showCursor = signal(true);

  private words = [
    'Flutter & Kotlin Developer',
    'Angular Engineer',
    'Mobile App Creator',
    'Full Stack Dev',
  ];
  private wIdx = 0;
  private cIdx = 0;
  private deleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private animId = 0;
  private resizeHandler?: () => void;

  constructor() {
    afterNextRender(() => {
      this.startTyping();
      this.initParticles();
    });
  }

  private startTyping() {
    const tick = () => {
      const word = this.words[this.wIdx];
      this.cIdx += this.deleting ? -1 : 1;
      this.displayText.set(word.slice(0, this.cIdx));

      if (!this.deleting && this.cIdx === word.length) {
        this.typingTimer = setTimeout(() => { this.deleting = true; tick(); }, 1800);
        return;
      }
      if (this.deleting && this.cIdx === 0) {
        this.deleting = false;
        this.wIdx = (this.wIdx + 1) % this.words.length;
      }
      this.typingTimer = setTimeout(tick, this.deleting ? 45 : 95);
    };
    tick();
  }

  private initParticles() {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f472b6'];
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    this.resizeHandler = resize;
    window.addEventListener('resize', resize);

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      this.animId = requestAnimationFrame(animate);
    };
    animate();
  }

  scrollToProjects() {
    if (isPlatformBrowser(this.platformId))
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    if (isPlatformBrowser(this.platformId))
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }
}
