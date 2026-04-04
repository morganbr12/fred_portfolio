import { Component, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  isScrolled = signal(false);
  menuOpen = signal(false);
  activeSection = signal('hero');

  navLinks = [
    { label: 'Home',       id: 'hero' },
    { label: 'Tech',       id: 'tech-stack' },
    { label: 'Projects',   id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'About',      id: 'about' },
    { label: 'Contact',    id: 'contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isScrolled.set(window.scrollY > 40);
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = this.navLinks.map((l) => l.id);
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('hero');
  }

  scrollTo(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen.set(false);
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
