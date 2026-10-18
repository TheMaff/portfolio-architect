import { Component } from '@angular/core';
import { HeroComponent } from './features/home/hero.component';
import { QualityComponent } from './features/quality/quality.component';
import { ProcessComponent } from './features/process/process.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ContactComponent } from './features/contact/contact.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ExperienceComponent } from './features/experience/experience.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    QualityComponent,
    ProcessComponent,
    ExperienceComponent,
    CaseStudiesComponent,
    ProjectsComponent,
    ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'me-pro-portfolio';
}
