import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cv',
  standalone: true,
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class CvComponent {
  private platformId = inject(PLATFORM_ID);

  print() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.body.classList.add('printing-cv');
    window.print();
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing-cv');
    }, { once: true });
  }
}
