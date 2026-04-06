import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../sections/hero/hero';
import { TechStackSectionComponent } from '../../sections/tech-stack/tech-stack';
import { ProjectsSectionComponent } from '../../sections/projects/projects';
import { ExperienceSectionComponent } from '../../sections/experience/experience';
import { AboutSectionComponent } from '../../sections/about/about';
import { GithubActivityComponent } from '../../sections/github/github-activity';
import { BlogPreviewComponent } from '../../sections/blog-preview/blog-preview';
import { ContactSectionComponent } from '../../sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TechStackSectionComponent,
    ProjectsSectionComponent,
    ExperienceSectionComponent,
    AboutSectionComponent,
    GithubActivityComponent,
    BlogPreviewComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-experience />
    <app-tech-stack />
    <app-projects />
    <app-github-activity />
    <app-blog-preview />
    <app-contact />
  `,
})
export class HomeComponent {}
