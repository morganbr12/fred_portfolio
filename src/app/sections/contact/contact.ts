import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { EMAILJS_CONFIG } from '../../emailjs.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactSectionComponent {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  errorMessage = signal('');

  socials = [
    { name: 'GitHub',   url: 'https://github.com/morganbr12',              color: '#f0f0f0' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/fredrickdankwah',    color: '#0a66c2' },
    { name: 'Twitter',  url: 'https://twitter.com',                        color: '#1da1f2' },
    { name: 'Email',    url: 'mailto:f.morgan221@outlook.com',             color: '#8b5cf6' },
  ];

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.invalid && ctrl.touched;
  }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (!isPlatformBrowser(this.platformId)) return;

    this.status.set('sending');
    this.errorMessage.set('');

    try {
      const emailjs = (await import('@emailjs/browser')).default;
      const { name, email, subject, message } = this.form.value;

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name:  name    ?? '',
          from_email: email   ?? '',
          subject:    subject ?? '',
          message:    message ?? '',
          to_email:   'f.morgan221@outlook.com',
        },
        EMAILJS_CONFIG.publicKey,
      );

      this.status.set('sent');
      this.form.reset();
    } catch (err: unknown) {
      this.status.set('error');
      this.errorMessage.set(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }
}
