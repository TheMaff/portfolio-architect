import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { PAGE_METADATA, SITE_URL } from './page-metadata';
import { SiteTitleStrategy } from './site-title.strategy';

describe('Route SEO', () => {
  let document: Document;
  let harness: RouterTestingHarness;
  let originalTitle: string;
  let originalTags: Node[];
  const managedTags = 'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], #the-maff-structured-data';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), { provide: TitleStrategy, useClass: SiteTitleStrategy }]
    });
    document = TestBed.inject(DOCUMENT);
    originalTitle = document.title;
    originalTags = Array.from(document.head.querySelectorAll(managedTags)).map(node => node.cloneNode(true));
    harness = await RouterTestingHarness.create();
  });

  afterEach(() => {
    document.head.querySelectorAll(managedTags).forEach(node => node.remove());
    originalTags.forEach(node => document.head.appendChild(node));
    document.title = originalTitle;
  });

  it('replaces page metadata when navigating between all public pages without including query strings or fragments', async () => {
    const seenDescriptions = new Set<string>();
    for (const page of [PAGE_METADATA.home, PAGE_METADATA.capture, PAGE_METADATA.dashboard, PAGE_METADATA.integration, PAGE_METADATA.home]) {
      await harness.navigateByUrl(`${page.path}?utm_source=seo-test#contenido`);
      expect(TestBed.inject(Title).getTitle()).toBe(page.title);
      expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(page.description);
      expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
      expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_URL}${page.path}`);
      expect(TestBed.inject(Meta).getTag('property="og:url"')?.content).toBe(`${SITE_URL}${page.path}`);
      expect(TestBed.inject(Meta).getTag('name="twitter:title"')?.content).toBe(page.title);
      expect(document.head.querySelectorAll('#the-maff-structured-data').length).toBe(1);
      const schema = JSON.parse(document.getElementById('the-maff-structured-data')!.textContent!);
      expect(schema['@graph'].find((entry: { '@type': string }) => entry['@type'] === 'WebPage').url).toBe(`${SITE_URL}${page.path}`);
      seenDescriptions.add(page.description);
    }
    expect(seenDescriptions.size).toBe(4);
  });

  it('keeps unknown URLs as noindex 404s and restores indexing after returning to a valid page', async () => {
    await harness.navigateByUrl('/demos/dashboard-comercial');
    await harness.navigateByUrl('/pagina-que-no-existe');
    expect(TestBed.inject(Router).url).toBe('/pagina-que-no-existe');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Esta página no está disponible');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex, follow');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(TestBed.inject(Meta).getTag('property="og:url"')).toBeNull();
    expect(document.getElementById('the-maff-structured-data')).toBeNull();

    await harness.navigateByUrl('/404');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('noindex, follow');
    await harness.navigateByUrl('/');
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content).toBe('index, follow');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE_URL}/`);
    expect(document.getElementById('the-maff-structured-data')).not.toBeNull();
  });
});
