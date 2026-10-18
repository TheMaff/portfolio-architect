import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let fetchSpy: jasmine.Spy;

  const validLead = {
    name: '  María Ejemplo  ',
    email: 'maria@example.com',
    company: '',
    service: 'automatizacion',
    process: 'Quiero reducir la carga manual del seguimiento comercial.',
    tools: '',
    'bot-field': ''
  };
  const registeredHtml = '<form name="b2b-contact"><input type="hidden" name="form-name" value="b2b-contact"></form>';
  const definitionResponse = (html = registeredHtml) => ({ ok: true, text: async () => html } as Response);

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fetchSpy = spyOn(window, 'fetch');
    fixture.detectChanges();
  });

  it('rejects missing, blank and invalid required fields without making a request', async () => {
    component.form.patchValue({ name: '   ', email: 'no-es-un-correo', process: ' ' });
    await component.submit();
    fixture.detectChanges();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(component.form.invalid).toBeTrue();
    expect(fixture.nativeElement.querySelector('#contact-name').getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('#contact-email-error').textContent).toContain('correo válido');
    expect(fixture.nativeElement.querySelector('#contact-service-error')).toBeTruthy();
  });

  it('validates locally without claiming delivery or posting to a preview server', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(true);
    component.form.setValue(validLead);
    await component.submit();

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(component.status()).toBe('preview');
    expect(component.form.controls.name.value).toBe(validLead.name);
  });

  it('encodes matching Netlify fields and prevents duplicates during both detection and submission', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
    let resolveDefinition!: (response: Response) => void;
    let resolveSubmission!: (response: Response) => void;
    let markSubmissionStarted!: () => void;
    const submissionStarted = new Promise<void>(resolve => { markSubmissionStarted = resolve; });
    fetchSpy.and.callFake((url: string) => {
      if (url === '/contact-form.html') {
        return new Promise<Response>(resolve => { resolveDefinition = resolve; });
      }
      markSubmissionStarted();
      return new Promise<Response>(resolve => { resolveSubmission = resolve; });
    });
    component.form.setValue(validLead);

    const request = component.submit();
    await component.submit();
    fixture.detectChanges();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy.calls.first().args[0]).toBe('/contact-form.html');
    expect(fetchSpy.calls.first().args[1]).toEqual({ method: 'GET', cache: 'no-store' });
    expect(component.status()).toBe('sending');
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();

    resolveDefinition(definitionResponse());
    await submissionStarted;
    await component.submit();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    const [endpoint, options] = fetchSpy.calls.mostRecent().args;
    expect(endpoint).toBe('/');
    expect(options.method).toBe('POST');
    expect(options.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    const body = new URLSearchParams(options.body);
    expect(body.get('form-name')).toBe('b2b-contact');
    expect(body.get('name')).toBe('María Ejemplo');
    expect(body.has('bot-field')).toBeTrue();
    expect(Array.from(body.keys()).sort()).toEqual(['bot-field', 'company', 'email', 'form-name', 'name', 'process', 'service', 'tools'].sort());
    expect(component.status()).not.toBe('success');

    resolveSubmission({ ok: true } as Response);
    await request;
    expect(component.status()).toBe('success');
    expect(component.form.controls.email.value).toBe('');
  });

  for (const attribute of ['data-netlify="true"', 'netlify']) {
    it('does not send personal data if Netlify has not processed the ' + attribute + ' marker', async () => {
      spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
      fetchSpy.and.resolveTo(definitionResponse('<form name="b2b-contact" ' + attribute + '><input type="hidden" name="form-name" value="b2b-contact"></form>'));
      component.form.setValue(validLead);
      await component.submit();

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy.calls.first().args[1].method).toBe('GET');
      expect(component.status()).toBe('error');
      expect(component.form.controls.email.value).toBe(validLead.email);
    });
  }

  it('rejects a generic HTTP 200 app shell and missing or mismatched form registrations', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
    const invalidDefinitions = [
      '<html><body><app-root></app-root></body></html>',
      '<form name="b2b-contact"></form>',
      '<form name="b2b-contact"><input type="hidden" name="form-name" value="other-form"></form>'
    ];
    component.form.setValue(validLead);

    for (const html of invalidDefinitions) {
      fetchSpy.calls.reset();
      fetchSpy.and.resolveTo(definitionResponse(html));
      await component.submit();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(component.status()).toBe('error');
      expect(component.form.controls.email.value).toBe(validLead.email);
    }
  });

  it('does not POST if the static form definition is unavailable', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
    fetchSpy.and.resolveTo({ ok: false, status: 404 } as Response);
    component.form.setValue(validLead);
    await component.submit();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(component.status()).toBe('error');
    expect(component.form.controls.email.value).toBe(validLead.email);
  });

  it('preserves the enquiry after an HTTP failure and lets the visitor retry', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
    let acceptSubmission = false;
    fetchSpy.and.callFake((url: string) => Promise.resolve(
      url === '/contact-form.html' ? definitionResponse() : { ok: acceptSubmission, status: acceptSubmission ? 200 : 404 } as Response
    ));
    component.form.setValue(validLead);
    await component.submit();
    fixture.detectChanges();

    expect(component.status()).toBe('error');
    expect(component.form.controls.email.value).toBe(validLead.email);
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('puedes reintentar');

    acceptSubmission = true;
    await component.submit();
    expect(fetchSpy).toHaveBeenCalledTimes(4);
    expect(component.status()).toBe('success');
  });

  it('preserves the enquiry after a network failure', async () => {
    spyOnProperty(component, 'isLocalPreview', 'get').and.returnValue(false);
    fetchSpy.and.callFake((url: string) => url === '/contact-form.html'
      ? Promise.resolve(definitionResponse())
      : Promise.reject(new TypeError('Failed to fetch'))
    );
    component.form.setValue(validLead);
    await component.submit();

    expect(component.status()).toBe('error');
    expect(component.form.controls.process.value).toBe(validLead.process);
    expect(component.isSubmitting()).toBeFalse();
  });
});
