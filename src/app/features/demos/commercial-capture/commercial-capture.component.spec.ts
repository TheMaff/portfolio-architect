import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CommercialCaptureComponent } from './commercial-capture.component';
import { createInitialState, DUPLICATE_EXAMPLE, NEW_LEAD_EXAMPLE } from './demo-state';

describe('CommercialCaptureComponent', () => {
  let fixture: ComponentFixture<CommercialCaptureComponent>;
  let component: CommercialCaptureComponent;
  let fetchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialCaptureComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(CommercialCaptureComponent);
    component = fixture.componentInstance;
    fetchSpy = spyOn(window, 'fetch');
    fixture.detectChanges();
  });

  it('shows actionable validation errors without creating an opportunity or making requests', () => {
    const initialCount = component.state().leads.length;
    component.form.patchValue({ name: '   ', email: 'no-es-un-correo', company: 'x'.repeat(121) });
    component.submit();
    fixture.detectChanges();

    expect(component.state().leads.length).toBe(initialCount);
    expect(component.selectedLead()).toBeNull();
    expect(fixture.nativeElement.querySelector('#demo-name').getAttribute('aria-invalid')).toBe('true');
    expect(fixture.nativeElement.querySelector('#demo-email-error').textContent).toContain('formato válido');
    expect(fixture.nativeElement.querySelector('#demo-service-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#demo-company-error')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Revisa');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('creates and selects an opportunity through the rendered form with an owner and next action', () => {
    const initialCount = component.state().leads.length;
    component.loadExample('new');
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const lead = component.selectedLead();
    expect(component.state().leads.length).toBe(initialCount + 1);
    expect(lead?.email).toBe(NEW_LEAD_EXAMPLE.email);
    expect(lead?.stage).toBe('nuevo');
    expect(lead?.owner).toBeTruthy();
    expect(lead?.nextAction.label).toBeTruthy();
    expect(lead?.nextAction.dueLabel).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#opportunity-detail').textContent).toContain(NEW_LEAD_EXAMPLE.name);
    expect(fixture.nativeElement.querySelectorAll('[aria-pressed="true"]').length).toBe(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('normalizes spaces and uppercase email without duplicating or resetting commercial progress', () => {
    const original = component.state().leads.find(lead => lead.email === DUPLICATE_EXAMPLE.email)!;
    const initialCount = component.state().leads.length;
    component.selectLead(original.id);
    component.advanceSelected();
    const progressedLead = component.selectedLead()!;

    component.loadExample('duplicate');
    component.form.patchValue({
      name: `  ${DUPLICATE_EXAMPLE.name}  `,
      email: `  ${DUPLICATE_EXAMPLE.email.toUpperCase()}  `,
      company: `  ${DUPLICATE_EXAMPLE.company}  `
    });
    component.submit();
    fixture.detectChanges();

    const duplicate = component.selectedLead()!;
    expect(component.feedback()?.kind).toBe('duplicate');
    expect(component.form.controls.email.value).toBe(DUPLICATE_EXAMPLE.email);
    expect(component.form.controls.name.value).toBe(DUPLICATE_EXAMPLE.name);
    expect(component.form.controls.company.value).toBe(DUPLICATE_EXAMPLE.company);
    expect(component.state().leads.length).toBe(initialCount);
    expect(duplicate.id).toBe(original.id);
    expect(duplicate.stage).toBe(progressedLead.stage);
    expect(duplicate.owner).toBe(progressedLead.owner);
    expect(duplicate.nextAction).toEqual(progressedLead.nextAction);
    expect(duplicate.activities.length).toBe(progressedLead.activities.length + 1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('advances the selected opportunity across the board and stops after won', () => {
    component.loadExample('new');
    component.submit();
    const id = component.selectedLead()!.id;
    const initialWonCount = component.wonCount();

    for (const expectedStage of ['contactado', 'propuesta', 'ganado']) {
      component.advanceSelected();
      expect(component.selectedLead()!.stage).toBe(expectedStage);
      expect(component.columns().find(column => column.value === expectedStage)!.leads.some(lead => lead.id === id)).toBeTrue();
    }
    const completedState = component.state();
    component.advanceSelected();
    fixture.detectChanges();

    expect(component.nextStage()).toBeNull();
    expect(component.wonCount()).toBe(initialWonCount + 1);
    expect(component.state()).toBe(completedState);
    expect(fixture.nativeElement.querySelector('#opportunity-detail').textContent).toContain('Recorrido completado');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('restores the fictional fixture, blank form and unselected detail when reset', () => {
    component.loadExample('new');
    component.submit();
    component.advanceSelected();
    component.form.markAllAsTouched();
    component.reset();
    fixture.detectChanges();

    expect(component.state()).toEqual(createInitialState());
    expect(component.selectedLead()).toBeNull();
    expect(component.feedback()).toBeNull();
    expect(component.form.getRawValue()).toEqual({ name: '', email: '', company: '', service: '', source: 'web' });
    expect(component.form.untouched).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('[aria-pressed="true"]').length).toBe(0);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
