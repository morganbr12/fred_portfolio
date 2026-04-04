import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  color: string;
  points: string[];
  current?: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceSectionComponent {
  experiences: Experience[] = [
    {
      role: 'Software Engineer II (Flutter & Angular Developer)',
      company: 'appsNmobile Solutions Ltd',
      period: 'Aug 2023 – Present',
      location: 'Hybrid',
      type: 'Full-time',
      color: '#8b5cf6',
      current: true,
      points: [
        'Spearheaded the development of a cross-platform Flutter app, achieving 4.8-star rating with 50k+ downloads.',
        'Architected BLoC-based state management improving code maintainability by 60%.',
        'Integrated CI/CD pipelines with GitHub Actions, reducing release time by 45%.',
        'Develop and maintain multiple Angular web apps, ensuring seamless integration with backend APIs.',
      ],
    },
    {
      role: 'Mobile Developer',
      company: 'SolarTaxi Ltd',
      period: 'Nov 2021 – July 2023',
      location: 'Accra, GH',
      type: 'Full-time',
      color: '#06b6d4',
      points: [
        'Led the end-to-end development of a Flutter-based ride-hailing app, resulting in 20k+ active users within the first year.',
        'Implemented complex features like real-time location tracking, in-app payments, and push notifications.',
        'Optimized app performance, reducing load times by 30% and improving user retention.',
        'Collaborated with cross-functional teams to define product requirements and deliver high-quality releases on schedule.',
      ],
    },
    {
      role: 'Freelance Flutter & Angular Developer',
      company: 'Self-Employed',
      period: '2020 – 2021',
      location: 'Remote',
      type: 'Freelance',
      color: '#f472b6',
      points: [
        'Delivered 3+ client projects spanning mobile apps, dashboards, and landing pages.',
        'Maintained a 5-star rating on Upwork with 100% job-success score.',
        'Built an Angular admin panel used by a FinTech startup to manage its users.',
      ],
    },
  ];
}
