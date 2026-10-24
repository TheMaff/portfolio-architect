import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, Injectable, InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { canonicalUrl, PAGE_METADATA, SITE_URL } from '../seo/page-metadata';
import { GA_MEASUREMENT_ID } from './measurement-id';

export const ANALYTICS_MEASUREMENT_ID = new InjectionToken<string>('GA4 measurement ID', {
  providedIn: 'root',
  factory: () => GA_MEASUREMENT_ID
});

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const PUBLIC_PAGES = [PAGE_METADATA.home, PAGE_METADATA.capture, PAGE_METADATA.dashboard, PAGE_METADATA.integration];
const DEMO_NAMES: Readonly<Record<string, string>> = {
  '/demos/seguimiento-comercial': 'seguimiento_comercial',
  '/demos/dashboard-comercial': 'dashboard_comercial',
  '/demos/formulario-crm-hoja': 'formulario_crm_hoja'
};

/** Production-only measurement. Never accepts form values or arbitrary event parameters. */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly destroyRef = inject(DestroyRef);
  private readonly measurementId = inject(ANALYTICS_MEASUREMENT_ID);
  private started = false;
  private configured = false;
  private currentPath: string | null = null;
  private previousPage = '';

  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)
      || this.document.location?.hostname !== 'themaff.netlify.app'
      || !/^G-[A-Z0-9]+$/.test(this.measurementId)
      || !this.document.defaultView) return;

    this.started = true;
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(event => this.schedulePageView(event.urlAfterRedirects));

    // If bootstrap starts after the initial navigation, do not lose that first page view.
    if (this.router.navigated) this.schedulePageView(this.router.url);
  }

  trackGenerateLead(): void {
    if (!this.configured || this.currentPath !== '/') return;
    this.send('event', 'generate_lead', {
      send_to: this.measurementId,
      lead_source: 'contact_form',
      ...this.pageParameters('/')
    });
  }

  private schedulePageView(routerUrl: string): void {
    const path = routerUrl.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    const page = PUBLIC_PAGES.find(candidate => candidate.path === path);
    if (!page) {
      this.currentPath = null;
      return;
    }
    // Anchor jumps and query changes within the same page are not new visits.
    if (this.currentPath === path) return;
    this.currentPath = path;

    // Angular updates TitleStrategy after NavigationEnd; wait for that update.
    queueMicrotask(() => {
      const parameters = this.pageParameters(path);
      this.configure(parameters);
      this.send('set', parameters);
      this.send('event', 'page_view', { send_to: this.measurementId, ...parameters });
      if (DEMO_NAMES[path]) {
        this.send('event', 'demo_view', { send_to: this.measurementId, demo_name: DEMO_NAMES[path], ...parameters });
      }
      this.previousPage = canonicalUrl(path);
    });
  }

  private pageParameters(path: string): Record<string, string> {
    const page = PUBLIC_PAGES.find(candidate => candidate.path === path)!;
    // Only an authored route title is allowed, even if another script changes document.title.
    const renderedTitle = this.title.getTitle();
    return {
      page_location: canonicalUrl(path),
      page_title: renderedTitle === page.title ? renderedTitle : page.title,
      page_referrer: this.previousPage || this.safeReferrer(this.document.referrer)
    };
  }

  private configure(parameters: Record<string, string>): void {
    if (this.configured) return;
    const analyticsWindow = this.document.defaultView as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = analyticsWindow.gtag || function (..._args: unknown[]): void {
      analyticsWindow.dataLayer!.push(arguments);
    };
    this.send('js', new Date());
    this.send('set', { allow_google_signals: false, allow_ad_personalization_signals: false, ads_data_redaction: true });
    this.send('config', this.measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...parameters
    });

    const script = this.document.createElement('script');
    script.id = 'the-maff-google-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    this.document.head.appendChild(script);
    this.configured = true;
  }

  private safeReferrer(referrer: string): string {
    if (!referrer) return '';
    try {
      const url = new URL(referrer);
      if (!['https:', 'http:'].includes(url.protocol)) return '';
      if (url.origin !== SITE_URL) return `${url.origin}/`;
      const path = url.pathname.replace(/\/+$/, '') || '/';
      return PUBLIC_PAGES.some(page => page.path === path) ? canonicalUrl(path) : '';
    } catch {
      return '';
    }
  }

  private send(...args: unknown[]): void {
    try {
      (this.document.defaultView as AnalyticsWindow | null)?.gtag?.(...args);
    } catch {
      // Measurement must never change navigation or a successfully delivered enquiry.
    }
  }
}
