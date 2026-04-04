import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutSectionComponent {
  stats = [
    { value: '6+',  label: 'Years Experience' },
    { value: '30+', label: 'Projects Shipped'  },
    { value: '15+', label: 'Happy Clients'     },
    { value: '100%', label: 'Job Success'      },
  ];

  strengths = [
    {
      icon: '📱',
      title: 'Mobile Development',
      desc: 'Building buttery-smooth, performant Flutter apps for both iOS & Android — from MVP to production.',
      color: '#54c5f8',
    },
    {
      icon: '🌐',
      title: 'Web Applications',
      desc: 'Crafting scalable Angular SPAs with clean architecture, reactive state, and pixel-perfect UIs.',
      color: '#06b6d4',
    },
    {
      icon: '⚡',
      title: 'Performance',
      desc: 'Obsessed with load times, frame rates, and app size. I optimise until it feels instant.',
      color: '#10b981',
    },
    {
      icon: '🏗️',
      title: 'Architecture',
      desc: 'Clean code, SOLID principles, and design patterns that scale — not just for today but for teams.',
      color: '#8b5cf6',
    },
  ];
}
