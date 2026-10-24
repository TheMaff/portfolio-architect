import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AnalyticsService } from './shared/analytics/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'me-pro-portfolio';

  constructor(viewportScroller: ViewportScroller, analytics: AnalyticsService) {
    // Router fragments need the same space as the CSS anchors: 80px header + 24px gap.
    viewportScroller.setOffset([0, 104]);
    analytics.start();
  }
}
