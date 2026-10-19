import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('App routing', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  async function navigate(url: string): Promise<void> {
    await router.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('opens the home route with an entry point to the commercial demo', async () => {
    await navigate('/');
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Menos tareas manuales.');
    expect(page.querySelector('a[href="/demos/seguimiento-comercial"]')).toBeTruthy();
    expect(page.querySelector('a[href="/demos/dashboard-comercial"]')).toBeTruthy();
    expect(page.querySelector('a[href="/demos/formulario-crm-hoja"]')).toBeTruthy();
    expect(page.querySelector('form[name="b2b-contact"]')).toBeTruthy();
  });

  it('opens the demo directly without mounting the home page above it', async () => {
    await navigate('/demos/seguimiento-comercial');
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-commercial-capture')).toBeTruthy();
    expect(page.querySelector('app-home-page')).toBeNull();
    expect(page.querySelectorAll('header').length).toBe(1);
    expect(page.querySelectorAll('main').length).toBe(1);
    expect(page.querySelector('form[name="b2b-contact"]')).toBeNull();
  });

  it('returns from the demo to the real home contact section through the shared header', async () => {
    await navigate('/demos/seguimiento-comercial');
    const links = fixture.nativeElement.querySelectorAll('header a') as NodeListOf<HTMLAnchorElement>;
    const contactLink = Array.from(links).find(link => link.textContent?.trim() === 'Hablemos');
    expect(contactLink).toBeTruthy();
    contactLink!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/#contacto');
    expect(fixture.nativeElement.querySelector('form[name="b2b-contact"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-commercial-capture')).toBeNull();
  });

  it('keeps the demo route when skipping to its main content', async () => {
    await navigate('/demos/seguimiento-comercial');
    (fixture.nativeElement.querySelector('.skip-link') as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/demos/seguimiento-comercial#contenido');
    expect(fixture.nativeElement.querySelector('app-commercial-capture')).toBeTruthy();
  });

  it('opens the dashboard directly and links to the capture demo without mounting the contact form', async () => {
    await navigate('/demos/dashboard-comercial');
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-commercial-dashboard')).toBeTruthy();
    expect(page.querySelector('app-home-page')).toBeNull();
    expect(page.querySelector('form[name="b2b-contact"]')).toBeNull();
    expect(page.querySelectorAll('main').length).toBe(1);
    const captureLink = page.querySelector('a[href="/demos/seguimiento-comercial"]') as HTMLAnchorElement;
    expect(captureLink).toBeTruthy();
    captureLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/demos/seguimiento-comercial');
    expect(page.querySelector('app-commercial-capture')).toBeTruthy();
    expect(page.querySelector('app-commercial-dashboard')).toBeNull();
  });

  it('opens the integration demo directly with a working skip link and returns to the real contact', async () => {
    await navigate('/demos/formulario-crm-hoja');
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-form-crm-sheet')).toBeTruthy();
    expect(page.querySelector('app-home-page')).toBeNull();
    expect(page.querySelector('form[name="b2b-contact"]')).toBeNull();
    expect(page.querySelectorAll('main').length).toBe(1);
    (page.querySelector('.skip-link') as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/demos/formulario-crm-hoja#contenido');
    expect(page.querySelector('app-form-crm-sheet')).toBeTruthy();
    const contactLink = page.querySelector('a[href="/#contacto"]') as HTMLAnchorElement;
    contactLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/#contacto');
    expect(page.querySelector('form[name="b2b-contact"]')).toBeTruthy();
    expect(page.querySelector('app-form-crm-sheet')).toBeNull();
  });
});
