import { Component, HostListener, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isScrolled  = signal(false);
  menuOpen    = signal(false);
  activeSection = signal('hero');
  isHomePage  = signal(true);

  navLinks = [
    { label: 'Home',       id: 'hero',       anchor: true  },
    { label: 'About',      id: 'about',      anchor: true  },
    { label: 'Experience', id: 'experience', anchor: true  },
    { label: 'Projects',   id: 'projects',   anchor: true  },
    { label: 'GitHub',     id: 'github',     anchor: true  },
    { label: 'Blog',       id: 'blog',       anchor: false },
    { label: 'Contact',    id: 'contact',    anchor: true  },
  ];

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.isHomePage.set(e.urlAfterRedirects === '/' || e.urlAfterRedirects === '');
      this.menuOpen.set(false);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isScrolled.set(window.scrollY > 40);
    if (this.isHomePage()) this.updateActiveSection();
  }

  private updateActiveSection() {
    const ids = this.navLinks.filter(l => l.anchor).map(l => l.id);
    for (const id of [...ids].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('hero');
  }

  handleNavClick(link: { id: string; anchor: boolean }) {
    if (!link.anchor) {
      this.router.navigate([`/${link.id}`]);
      this.menuOpen.set(false);
      return;
    }
    if (!this.isHomePage()) {
      // Navigate home first, then scroll after navigation completes
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.menuOpen.set(false);
  }

  scrollToContact() {
    this.handleNavClick({ id: 'contact', anchor: true });
  }

  toggleMenu() { this.menuOpen.update(v => !v); }

  isActive(link: { id: string; anchor: boolean }): boolean {
    if (!link.anchor) return !this.isHomePage();
    return this.isHomePage() && this.activeSection() === link.id;
  }
}
