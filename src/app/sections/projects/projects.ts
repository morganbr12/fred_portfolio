import { Component, signal, computed } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

export interface Project {
  title: string;
  desc: string;
  image: string;      // gradient string used as CSS background
  tech: string[];
  category: 'mobile' | 'web';
  demo: string;
  github: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsSectionComponent {
  activeFilter = signal<'all' | 'mobile' | 'web'>('all');
  cardTransforms: Record<number, string> = {};

  projects: Project[] = [
    {
      title: 'TaskFlow',
      desc: 'A productivity mobile app with drag-and-drop Kanban boards, push notifications, and offline-first sync via Firebase.',
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
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tech: ['Flutter', 'Dart', 'REST APIs', 'Provider'],
      category: 'mobile',
      demo: '#',
      github: '#',
    },
    {
      title: 'Analytics Hub',
      desc: 'Enterprise Angular dashboard with real-time charts, role-based access, CSV exports, and dark-mode theming.',
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
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      tech: ['Angular', 'TypeScript', 'Firebase', 'Canvas API'],
      category: 'web',
      demo: '#',
      github: '#',
    },
    {
      title: 'FitTracker',
      desc: 'Health & fitness mobile app with workout plans, progress charts, calorie tracking, and wearable device integration.',
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      tech: ['Flutter', 'Dart', 'SQLite', 'HealthKit'],
      category: 'mobile',
      demo: '#',
      github: '#',
    },
    {
      title: 'DevHub',
      desc: 'GitHub analytics web dashboard that visualises contribution heatmaps, repo stats, and language distribution with D3.',
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

  setFilter(f: 'all' | 'mobile' | 'web') {
    this.activeFilter.set(f);
  }

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

  trackByTitle(_: number, p: Project) {
    return p.title;
  }
}
