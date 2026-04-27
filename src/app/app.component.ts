import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './features/home/hero.component';
import { DevScoreComponent } from './shared/components/dev-score/dev-score.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ContactComponent } from './features/contact/contact.component';
import { ProjectsComponent } from './features/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    DevScoreComponent,
    CaseStudiesComponent,
    ProjectsComponent,
    ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'me-pro-portfolio';
}
