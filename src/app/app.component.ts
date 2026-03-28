import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './features/home/hero.component';
import { DevScoreComponent } from './shared/components/dev-score/dev-score.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, DevScoreComponent, CaseStudiesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'me-pro-portfolio';
}
