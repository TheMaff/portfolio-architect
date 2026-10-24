import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy, UrlSerializer, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SiteTitleStrategy } from './shared/seo/site-title.strategy';
import { CanonicalUrlSerializer } from './shared/seo/canonical-url.serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    { provide: TitleStrategy, useClass: SiteTitleStrategy },
    { provide: UrlSerializer, useClass: CanonicalUrlSerializer },
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }))
  ]
};
