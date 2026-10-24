import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PAGE_METADATA, SITE_URL } from '../seo/page-metadata';
import { ANALYTICS_MEASUREMENT_ID, AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let navigation: Subject<NavigationEnd>;
  let commands: unknown[][];
  let fakeDocument: Document;
  let appendScript: jasmine.Spy;
  let title: string;
  let fakeRouter: { events: Subject<NavigationEnd>; navigated: boolean; url: string };

  beforeEach(() => {
    navigation = new Subject<NavigationEnd>();
    commands = [];
    title = PAGE_METADATA.home.title;
    appendScript = jasmine.createSpy('appendScript');
    fakeDocument = {
      location: { hostname: 'themaff.netlify.app' },
      referrer: 'https://external.example/contact/maria@example.com?email=maria@example.com#private',
      defaultView: { gtag: (...args: unknown[]) => commands.push(args) },
      createElement: (tag: string) => document.createElement(tag),
      head: { appendChild: appendScript }
    } as unknown as Document;
    fakeRouter = { events: navigation, navigated: false, url: '/' };
    TestBed.configureTestingModule({
      providers: [
        { provide: DOCUMENT, useValue: fakeDocument },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: Router, useValue: fakeRouter },
        { provide: Title, useValue: { getTitle: () => title } },
        { provide: ANALYTICS_MEASUREMENT_ID, useValue: 'G-TEST123456' }
      ]
    });
  });

  async function navigate(url: string, pageTitle = PAGE_METADATA.home.title): Promise<void> {
    navigation.next(new NavigationEnd(1, url, url));
    title = pageTitle;
    await Promise.resolve();
  }

  const events = (name: string): unknown[][] => commands.filter(command => command[0] === 'event' && command[1] === name);

  it('loads once in production and sends one sanitized page view per route, ignoring anchor and query changes', async () => {
    const analytics = TestBed.inject(AnalyticsService);
    analytics.start();
    analytics.start();
    await navigate('/?email=maria@example.com#nombre-personal');
    await navigate('/?email=otra@example.com#contacto');
    await navigate('/demos/dashboard-comercial?client=privado#fila-123', PAGE_METADATA.dashboard.title);
    await navigate('/demos/dashboard-comercial#dashboard-opportunity-detail', PAGE_METADATA.dashboard.title);

    expect(appendScript).toHaveBeenCalledTimes(1);
    const script = appendScript.calls.first().args[0] as HTMLScriptElement;
    expect(script.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123456');
    expect(script.async).toBeTrue();
    expect(events('page_view').length).toBe(2);
    expect(events('page_view')[0][2]).toEqual({
      send_to: 'G-TEST123456',
      page_location: `${SITE_URL}/`,
      page_title: PAGE_METADATA.home.title,
      page_referrer: 'https://external.example/'
    });
    expect(events('page_view')[1][2]).toEqual({
      send_to: 'G-TEST123456',
      page_location: `${SITE_URL}/demos/dashboard-comercial`,
      page_title: PAGE_METADATA.dashboard.title,
      page_referrer: `${SITE_URL}/`
    });
    expect(events('demo_view').length).toBe(1);
    expect(events('demo_view')[0][2]).toEqual(jasmine.objectContaining({ demo_name: 'dashboard_comercial' }));
    expect(commands.find(command => command[0] === 'config')?.[2]).toEqual(jasmine.objectContaining({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    }));
    expect(JSON.stringify(commands)).not.toMatch(/maria|otra@example|privado|fila-123|nombre-personal/);
  });

  it('ignores unknown pages and arbitrary titles, and never exposes unsupported referrer paths', async () => {
    Object.defineProperty(fakeDocument, 'referrer', { value: `${SITE_URL}/private/customer@example.com?secret=value` });
    const analytics = TestBed.inject(AnalyticsService);
    analytics.start();
    await navigate('/cliente/customer@example.com');
    expect(appendScript).not.toHaveBeenCalled();
    await navigate('/demos/seguimiento-comercial', 'Private user: customer@example.com');
    await navigate('/404');
    analytics.trackGenerateLead();
    expect(events('page_view').length).toBe(1);
    expect(events('page_view')[0][2]).toEqual(jasmine.objectContaining({ page_title: PAGE_METADATA.capture.title, page_referrer: '' }));
    expect(events('generate_lead').length).toBe(0);
    expect(JSON.stringify(commands)).not.toContain('customer@example.com');
  });

  it('tracks a confirmed lead without form values and remains harmless if measurement fails', async () => {
    const analytics = TestBed.inject(AnalyticsService);
    analytics.trackGenerateLead();
    expect(events('generate_lead').length).toBe(0);
    analytics.start();
    await navigate('/');
    analytics.trackGenerateLead();
    expect(events('generate_lead').length).toBe(1);
    expect(events('generate_lead')[0][2]).toEqual({
      send_to: 'G-TEST123456', lead_source: 'contact_form',
      page_location: `${SITE_URL}/`, page_title: PAGE_METADATA.home.title, page_referrer: `${SITE_URL}/`
    });
    (fakeDocument.defaultView as unknown as { gtag: () => void }).gtag = () => { throw new Error('Blocked'); };
    expect(() => analytics.trackGenerateLead()).not.toThrow();
  });

  it('captures the initial page if the service starts after navigation has completed', async () => {
    fakeRouter.navigated = true;
    fakeRouter.url = '/demos/formulario-crm-hoja?email=private@example.com';
    title = PAGE_METADATA.integration.title;
    TestBed.inject(AnalyticsService).start();
    await Promise.resolve();
    expect(events('page_view').length).toBe(1);
    expect(events('demo_view')[0][2]).toEqual(jasmine.objectContaining({ demo_name: 'formulario_crm_hoja' }));
    expect(JSON.stringify(commands)).not.toContain('private@example.com');
  });

  for (const hostname of ['localhost', 'deploy-preview-9--themaff.netlify.app', 'themaff.netlify.app.evil.example']) {
    it(`does not measure the preview or unrecognized host ${hostname}`, async () => {
      Object.defineProperty(fakeDocument, 'location', { value: { hostname } });
      TestBed.inject(AnalyticsService).start();
      await navigate('/');
      expect(appendScript).not.toHaveBeenCalled();
      expect(commands).toEqual([]);
    });
  }

  it('does not access browser measurement during prerendering', async () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    Object.defineProperty(fakeDocument, 'defaultView', { get: () => { throw new Error('No browser on server'); } });
    TestBed.inject(AnalyticsService).start();
    await navigate('/');
    expect(appendScript).not.toHaveBeenCalled();
    expect(commands).toEqual([]);
  });

  it('stays disabled until a real measurement ID is configured', async () => {
    TestBed.overrideProvider(ANALYTICS_MEASUREMENT_ID, { useValue: '' });
    TestBed.inject(AnalyticsService).start();
    await navigate('/');
    expect(appendScript).not.toHaveBeenCalled();
    expect(commands).toEqual([]);
  });
});
