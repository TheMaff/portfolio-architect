import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FormCrmSheetComponent } from './form-crm-sheet.component';
import { createInitialState, EXISTING_EXAMPLE, NEW_EXAMPLE } from './integration-state';

describe('FormCrmSheetComponent', () => {
  let fixture: ComponentFixture<FormCrmSheetComponent>;
  let component: FormCrmSheetComponent;
  let fetchSpy: jasmine.Spy;

  const submitForm = () => {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FormCrmSheetComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(FormCrmSheetComponent);
    component = fixture.componentInstance;
    fetchSpy = spyOn(window, 'fetch');
    fixture.detectChanges();
  });

  afterEach(() => expect(fetchSpy).not.toHaveBeenCalled());

  it('renders local-only notice and actionable validation without changing either destination', () => {
    component.form.patchValue({ name: '   ', email: 'correo-invalido', company: 'x'.repeat(121) });
    submitForm();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    expect(component.state()).toEqual(createInitialState());
    expect(fixture.nativeElement.querySelector('#integration-notice').textContent).toContain('no se conecta');
    expect(fixture.nativeElement.querySelector('#integration-name').getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('#integration-email-error').textContent).toContain('formato válido');
    expect(fixture.nativeElement.querySelector('#integration-company-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#integration-service-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Revisa');
    expect(form.hasAttribute('name')).toBeFalse();
    expect(form.hasAttribute('action')).toBeFalse();
    expect(form.hasAttribute('data-netlify')).toBeFalse();
  });

  it('creates the same new contact in the CRM and sheet through rendered controls', () => {
    fixture.nativeElement.querySelector('#integration-example-new').click();
    submitForm();

    const state = component.state();
    const contact = state.contacts.find(item => item.email === NEW_EXAMPLE.email)!;
    const row = state.rows.find(item => item.contactId === contact.id)!;
    expect(state.contacts.length).toBe(2);
    expect(state.rows.length).toBe(2);
    expect(state.run?.status).toBe('success');
    expect(state.run?.crmAction).toBe('created');
    expect(row.email).toBe(contact.email);
    expect(row.owner).toBe(contact.owner);
    expect(fixture.nativeElement.querySelector('#integration-crm').textContent).toContain(NEW_EXAMPLE.name);
    expect(fixture.nativeElement.querySelector('#integration-sheet').textContent).toContain(contact.id);
    expect(fixture.nativeElement.querySelector('#integration-run-title').textContent).toContain('sincronizados');
    expect(fixture.nativeElement.querySelector('#integration-retry')).toBeNull();
  });

  it('normalizes an existing email and updates both records without resetting its owner or stage', () => {
    const original = component.state().contacts[0];
    component.loadExample('existing');
    component.form.patchValue({ name: ` ${EXISTING_EXAMPLE.name} `, email: ` ${EXISTING_EXAMPLE.email.toUpperCase()} ` });
    submitForm();

    const state = component.state();
    expect(state.contacts.length).toBe(1);
    expect(state.rows.length).toBe(1);
    expect(state.run?.crmAction).toBe('updated');
    expect(state.run?.sheetAction).toBe('updated');
    expect(state.contacts[0].id).toBe(original.id);
    expect(state.contacts[0].owner).toBe(original.owner);
    expect(state.contacts[0].stage).toBe('propuesta');
    expect(state.contacts[0].company).toBe(EXISTING_EXAMPLE.company);
    expect(state.rows[0].company).toBe(EXISTING_EXAMPLE.company);
    expect(component.form.controls.email.value).toBe(EXISTING_EXAMPLE.email);
    expect(fixture.nativeElement.querySelector('#integration-sheet').textContent).toContain(EXISTING_EXAMPLE.company);
    expect(fixture.nativeElement.querySelector('#integration-crm').textContent).toContain('Propuesta');
  });

  it('leaves both destinations unchanged on CRM failure and resumes the same run from its pending step', () => {
    component.loadExample('new');
    component.form.controls.scenario.setValue('crm');
    submitForm();
    const failedRun = component.state().run!;

    expect(component.state().contacts.length).toBe(1);
    expect(component.state().rows.length).toBe(1);
    expect(component.stepStatus('crm')).toBe('error');
    expect(component.stepStatus('sheet')).toBe('pending');
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeTrue();
    expect(fixture.nativeElement.querySelector('#integration-run-title').textContent).toContain('CRM necesita');

    fixture.nativeElement.querySelector('#integration-retry').click();
    fixture.detectChanges();
    expect(component.state().run?.id).toBe(failedRun.id);
    expect(component.state().run?.status).toBe('success');
    expect(component.state().contacts.length).toBe(2);
    expect(component.state().rows.length).toBe(2);
    expect(component.stepStatus('crm')).toBe('success');
    expect(component.stepStatus('sheet')).toBe('success');
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeFalse();
  });

  it('retries only the pending sheet using the saved query even if the form is changed programmatically', () => {
    component.loadExample('new');
    component.form.controls.scenario.setValue('sheet');
    submitForm();
    const failedState = component.state();
    const failedRun = failedState.run!;
    expect(failedState.contacts.length).toBe(2);
    expect(failedState.rows.length).toBe(1);
    expect(component.stepStatus('crm')).toBe('success');
    expect(component.stepStatus('sheet')).toBe('error');
    expect(fixture.nativeElement.querySelector('#integration-run-title').textContent).toContain('Hoja pendiente');
    expect(fixture.nativeElement.querySelector('#integration-snapshot').textContent).toContain(NEW_EXAMPLE.email);

    component.form.patchValue({ name: 'Otra persona', email: 'otro@example.com' });
    component.submit();
    expect(component.state()).toBe(failedState);
    fixture.nativeElement.querySelector('#integration-retry').click();
    fixture.detectChanges();
    const completed = component.state();
    expect(completed.contacts).toBe(failedState.contacts);
    expect(completed.contacts.length).toBe(2);
    expect(completed.rows.length).toBe(2);
    expect(completed.run?.id).toBe(failedRun.id);
    expect(completed.run?.inputSnapshot.email).toBe(NEW_EXAMPLE.email);
    expect(completed.rows.some(row => row.email === NEW_EXAMPLE.email)).toBeTrue();
    expect(completed.rows.some(row => row.email === 'otro@example.com')).toBeFalse();
    expect(completed.run?.events.filter(event => event.step === 'crm' && event.status === 'success').length).toBe(1);
    expect(fixture.nativeElement.querySelector('#integration-retry')).toBeNull();
  });

  it('allows an omitted company and restores fixtures, form and execution after resetting', () => {
    component.loadExample('new');
    component.form.patchValue({ company: '', scenario: 'sheet' });
    submitForm();
    expect(component.state().contacts.find(contact => contact.email === NEW_EXAMPLE.email)?.company).toBe('');
    expect(fixture.nativeElement.querySelector('#integration-crm').textContent).toContain('Sin empresa indicada');

    fixture.nativeElement.querySelector('#integration-reset').click();
    fixture.detectChanges();
    expect(component.state()).toEqual(createInitialState());
    expect(component.feedback()).toBeNull();
    expect(component.form.getRawValue()).toEqual({ name: '', email: '', company: '', service: '', scenario: 'none' });
    expect(component.form.untouched).toBeTrue();
    expect(fixture.nativeElement.querySelector('fieldset').disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('#integration-retry')).toBeNull();
    expect(fixture.nativeElement.querySelector('#integration-snapshot')).toBeNull();
  });
});
