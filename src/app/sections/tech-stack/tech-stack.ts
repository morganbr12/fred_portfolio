import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

interface Tech {
  name: string;
  abbr: string;
  color: string;
  bg: string;
  category: string;
  desc: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStackSectionComponent {
  techs: Tech[] = [
    {
      name: 'Flutter',
      abbr: 'Fl',
      color: '#54c5f8',
      bg: 'rgba(84,197,248,0.12)',
      category: 'Mobile',
      desc: 'Cross-platform SDK',
    },
    {
      name: 'Dart',
      abbr: 'D',
      color: '#00b4ab',
      bg: 'rgba(0,180,171,0.12)',
      category: 'Language',
      desc: 'Client-optimized lang',
    },
    {
      name: 'Angular',
      abbr: 'A',
      color: '#dd0031',
      bg: 'rgba(221,0,49,0.12)',
      category: 'Web',
      desc: 'Enterprise framework',
    },
    {
      name: 'TypeScript',
      abbr: 'TS',
      color: '#3178c6',
      bg: 'rgba(49,120,198,0.12)',
      category: 'Language',
      desc: 'Typed JavaScript',
    },
    {
      name: 'Firebase',
      abbr: 'FB',
      color: '#ffca28',
      bg: 'rgba(255,202,40,0.12)',
      category: 'Backend',
      desc: 'BaaS platform',
    },
    {
      name: 'Kotlin',
      abbr: 'Kt',
      color: '#0074a5',
      bg: 'rgba(0,116,165,0.12)',
      category: 'Language',
      desc: 'Modern JVM language',
    },
    {
      name: 'Java',
      abbr: 'J',
      color: '#b07219',
      bg: 'rgba(176,114,25,0.12)',
      category: 'Language',
      desc: 'Versatile JVM language',
    },
    {
      name: 'RxJS',
      abbr: 'Rx',
      color: '#b7178c',
      bg: 'rgba(183,23,140,0.12)',
      category: 'Library',
      desc: 'Reactive extensions',
    },
    {
      name: 'Node.js',
      abbr: 'N',
      color: '#68a063',
      bg: 'rgba(104,160,99,0.12)',
      category: 'Backend',
      desc: 'JS runtime',
    },
    {
      name: 'Git',
      abbr: 'G',
      color: '#f05032',
      bg: 'rgba(240,80,50,0.12)',
      category: 'DevOps',
      desc: 'Version control',
    },
    {
      name: 'CI/CD',
      abbr: '⚙',
      color: '#6366f1',
      bg: 'rgba(99,102,241,0.12)',
      category: 'DevOps',
      desc: 'Automation pipelines',
    },
    {
      name: 'REST APIs',
      abbr: '⇄',
      color: '#10b981',
      bg: 'rgba(16,185,129,0.12)',
      category: 'Web',
      desc: 'API integration',
    },
    {
      name: 'SCSS',
      abbr: 'S',
      color: '#cc6699',
      bg: 'rgba(204,102,153,0.12)',
      category: 'Styling',
      desc: 'CSS preprocessor',
    },
    {
      name: 'Tailwind CSS',
      abbr: 'T',
      color: '#38bdf8',
      bg: 'rgba(56,189,248,0.12)',
      category: 'Styling',
      desc: 'Utility-first CSS',
    },
    {
      name: 'SQLite',
      abbr: 'SQL',
      color: '#0074a5',
      bg: 'rgba(0,116,165,0.12)',
      category: 'Database',
      desc: 'Embedded database',
    },
  ];
}
