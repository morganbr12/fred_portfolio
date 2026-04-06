import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroSectionComponent } from './sections/hero/hero';
import { TechStackSectionComponent } from './sections/tech-stack/tech-stack';
import { ProjectsSectionComponent } from './sections/projects/projects';
import { ExperienceSectionComponent } from './sections/experience/experience';
import { AboutSectionComponent } from './sections/about/about';
import { ContactSectionComponent } from './sections/contact/contact';
import { GithubActivityComponent } from './sections/github/github-activity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    TechStackSectionComponent,
    ProjectsSectionComponent,
    ExperienceSectionComponent,
    AboutSectionComponent,
    GithubActivityComponent,
    ContactSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
