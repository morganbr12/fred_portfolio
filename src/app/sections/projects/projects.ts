import { Component, signal, computed, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

export interface Project {
  title: string;
  desc: string;
  image: string;
  tech: string[];
  category: 'mobile' | 'web';
  demo: string;
  github: string;
  featured?: boolean;
  // Detail fields shown in modal
  longDesc: string;
  highlights: string[];
  role: string;
  duration: string;
  platform: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsSectionComponent {
  private platformId = inject(PLATFORM_ID);

  activeFilter = signal<'all' | 'mobile' | 'web'>('all');
  cardTransforms: Record<number, string> = {};
  selectedProject = signal<Project | null>(null);

  projects: Project[] = [
    {
      title: 'TaskFlow',
      desc: 'A productivity mobile app with drag-and-drop Kanban boards, push notifications, and offline-first sync via Firebase.',
      longDesc: 'TaskFlow is a full-featured productivity suite designed for teams and individuals. It combines a drag-and-drop Kanban interface with real-time collaboration, intelligent push notifications, and a robust offline-first architecture powered by Firebase. The app synchronises seamlessly across devices and maintains full functionality even without a network connection.',
      highlights: [
        'Drag-and-drop Kanban with smooth reorder animations',
        'Offline-first architecture with background sync on reconnect',
        'Push notifications with custom scheduling and snooze',
        'Real-time collaboration — multiple users on the same board',
        'Dark / light theme with system preference detection',
        'Firebase Firestore with optimistic UI updates',
      ],
      role: 'Lead Flutter Developer',
      duration: '4 months',
      platform: 'iOS & Android',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      tech: ['Flutter', 'Dart', 'Firebase', 'BLoC'],
      category: 'mobile',
      demo: '#',
      github: '#',
      featured: true,
    },
    {
      title: 'ShopEase',
      desc: 'Feature-rich e-commerce app with real-time inventory, Stripe payments, animated product browsing, and order tracking.',
      longDesc: 'ShopEase is a modern e-commerce mobile application delivering a fluid, animated shopping experience. Built with Flutter and a Provider state-management layer, it features real-time inventory updates, a fully integrated Stripe payment flow, and end-to-end order tracking from checkout to doorstep delivery.',
      highlights: [
        'Stripe in-app payments with 3D Secure and Apple/Google Pay',
        'Real-time inventory with optimistic stock reservation',
        'Animated product carousel with hero transitions',
        'Order tracking map with live driver location',
        'Wishlist, reviews, and personalised recommendations',
        'REST API integration with pagination and caching',
      ],
      role: 'Flutter Developer',
      duration: '3 months',
      platform: 'iOS & Android',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tech: ['Flutter', 'Dart', 'REST APIs', 'Provider'],
      category: 'mobile',
      demo: '#',
      github: '#',
    },
    {
      title: 'Analytics Hub',
      desc: 'Enterprise Angular dashboard with real-time charts, role-based access, CSV exports, and dark-mode theming.',
      longDesc: 'Analytics Hub is an enterprise-grade SPA built with Angular that gives business stakeholders a live view of their operational KPIs. It features a role-based permission system, interactive Chart.js visualisations that update in real time via WebSockets, and flexible CSV/PDF export for any date range.',
      highlights: [
        'Role-based access control (Admin, Manager, Viewer)',
        'Real-time KPI cards and charts powered by WebSockets',
        'Date-range picker with CSV and PDF export',
        'Lazy-loaded feature modules for fast initial load',
        'Reactive forms with live filter and drill-down',
        'Fully responsive from 320 px to 4K screens',
      ],
      role: 'Lead Angular Developer',
      duration: '5 months',
      platform: 'Web (SPA)',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      tech: ['Angular', 'TypeScript', 'RxJS', 'Chart.js'],
      category: 'web',
      demo: '#',
      github: '#',
      featured: true,
    },
    {
      title: 'CollabBoard',
      desc: 'Real-time collaborative whiteboard with live cursors, sticky notes, and drawing tools — built with Angular + Firebase.',
      longDesc: 'CollabBoard brings remote teams together on an infinite canvas. Users see each other\'s cursors in real time, can drop sticky notes, draw freehand, and insert shapes. Every action is broadcast over Firebase Realtime Database with conflict-free merge so nothing is ever lost, even with multiple simultaneous editors.',
      highlights: [
        'Live multi-user cursors with avatar labels',
        'Infinite canvas with zoom, pan, and grid snap',
        'Freehand drawing, shapes, and connectors',
        'Sticky notes with colour labels and rich text',
        'Firebase RTDB for sub-100ms latency collaboration',
        'Export board as PNG or PDF',
      ],
      role: 'Full Stack Developer',
      duration: '3 months',
      platform: 'Web (SPA)',
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      tech: ['Angular', 'TypeScript', 'Firebase', 'Canvas API'],
      category: 'web',
      demo: '#',
      github: '#',
    },
    {
      title: 'FitTracker',
      desc: 'Health & fitness mobile app with workout plans, progress charts, calorie tracking, and wearable device integration.',
      longDesc: 'FitTracker is a comprehensive health companion that helps users plan workouts, track nutrition, and visualise progress over time. It integrates with Apple HealthKit and Google Fit to pull biometric data from wearables, and stores all history locally in SQLite for full offline access.',
      highlights: [
        'Custom workout builder with 200+ exercise library',
        'Calorie and macro tracking with barcode scanner',
        'Progress charts: weight, reps, personal bests',
        'Apple HealthKit & Google Fit wearable sync',
        'SQLite offline storage — no network required',
        'Weekly and monthly summary reports',
      ],
      role: 'Flutter Developer',
      duration: '4 months',
      platform: 'iOS & Android',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      tech: ['Flutter', 'Dart', 'SQLite', 'HealthKit'],
      category: 'mobile',
      demo: '#',
      github: '#',
    },
    {
      title: 'DevHub',
      desc: 'GitHub analytics web dashboard that visualises contribution heatmaps, repo stats, and language distribution with D3.',
      longDesc: 'DevHub lets developers deeply analyse their GitHub footprint. It pulls data from the GitHub REST and GraphQL APIs and renders it through a suite of D3-powered visualisations — contribution heatmaps, language pie charts, commit frequency lines, and side-by-side repo comparisons. Built as a serverless Angular app with lazy-loaded modules.',
      highlights: [
        'Contribution heatmap identical to GitHub\'s activity graph',
        'Language distribution doughnut chart per repo',
        'Commit frequency and PR merge rate over time',
        'Side-by-side repo comparison mode',
        'GitHub OAuth login for private repo access',
        'Serverless — zero backend, pure client-side API calls',
      ],
      role: 'Frontend Developer',
      duration: '2 months',
      platform: 'Web (SPA)',
      image: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      tech: ['Angular', 'TypeScript', 'GitHub API', 'D3.js'],
      category: 'web',
      demo: '#',
      github: '#',
    },
  ];

  filtered = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.projects : this.projects.filter((p) => p.category === f);
  });

  setFilter(f: 'all' | 'mobile' | 'web') { this.activeFilter.set(f); }

  openModal(project: Project) {
    this.selectedProject.set(project);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.selectedProject.set(null);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.selectedProject()) this.closeModal(); }

  onCardTilt(event: MouseEvent, index: number) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((event.clientY - cy) / (rect.height / 2)) * -7;
    const ry = ((event.clientX - cx) / (rect.width / 2)) * 7;
    this.cardTransforms[index] = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  }

  resetTilt(index: number) {
    this.cardTransforms[index] = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  }

  trackByTitle(_: number, p: Project) { return p.title; }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}
