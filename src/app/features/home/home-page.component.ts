import { Component } from '@angular/core';
import { HeroComponent } from './hero.component';
import { QualityComponent } from '../quality/quality.component';
import { ProcessComponent } from '../process/process.component';
import { CaseStudiesComponent } from '../case-studies/case-studies.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { DemoShowcaseComponent } from '../demos/demo-showcase.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, CaseStudiesComponent, DemoShowcaseComponent, ProcessComponent,
    ExperienceComponent, QualityComponent, ProjectsComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <app-case-studies></app-case-studies>
    <app-demo-showcase></app-demo-showcase>
    <app-process></app-process>
    <app-experience></app-experience>
    <app-quality></app-quality>
    <app-projects></app-projects>
    <app-contact></app-contact>
  `
})
export class HomePageComponent {}
