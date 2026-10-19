import { DOCUMENT, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  createInitialState,
  EXISTING_EXAMPLE,
  FAILURE_OPTIONS,
  FailureMode,
  integrate,
  IntegrationInput,
  NEW_EXAMPLE,
  retryIntegration,
  SERVICE_OPTIONS,
  ServiceKey
} from './integration-state';

function requiredText(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim() ? null : { required: true };
}

function oneOf(values: readonly string[]): ValidatorFn {
  return control => values.includes(control.value) ? null : { option: true };
}

@Component({
  selector: 'app-form-crm-sheet',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './form-crm-sheet.component.html'
})
export class FormCrmSheetComponent {
  private readonly document = inject(DOCUMENT);
  private readonly formBuilder = inject(FormBuilder);
  readonly serviceOptions = SERVICE_OPTIONS;
  readonly failureOptions = FAILURE_OPTIONS;
  readonly steps = [
    { key: 'form', label: 'Formulario', description: 'Recibe la consulta' },
    { key: 'validation', label: 'Validación', description: 'Ordena y comprueba los datos' },
    { key: 'crm', label: 'CRM', description: 'Crea o actualiza el contacto' },
    { key: 'sheet', label: 'Hoja de cálculo', description: 'Sincroniza el registro' }
  ] as const;
  readonly state = signal(createInitialState());
  readonly feedback = signal<{ kind: 'ready' | 'error'; message: string } | null>(null);
  readonly isFailed = computed(() => this.state().run?.status === 'failed');
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [requiredText, Validators.maxLength(80)]],
    email: ['', [requiredText, Validators.email, Validators.maxLength(254)]],
    company: ['', Validators.maxLength(120)],
    service: ['' as ServiceKey | '', [Validators.required, oneOf(SERVICE_OPTIONS.map(option => option.value))]],
    scenario: ['none' as FailureMode, oneOf(FAILURE_OPTIONS.map(option => option.value))]
  });

  hasError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  serviceLabel(service: ServiceKey): string {
    return SERVICE_OPTIONS.find(option => option.value === service)?.label ?? service;
  }

  scenarioLabel(mode: FailureMode): string {
    return FAILURE_OPTIONS.find(option => option.value === mode)?.label ?? mode;
  }

  stageLabel(stage: 'nuevo' | 'propuesta'): string {
    return stage === 'nuevo' ? 'Nuevo' : 'Propuesta';
  }

  stepStatus(step: 'form' | 'validation' | 'crm' | 'sheet'): 'success' | 'error' | 'pending' {
    return this.state().run?.events.filter(event => event.step === step).at(-1)?.status ?? 'pending';
  }

  stepStatusLabel(step: 'form' | 'validation' | 'crm' | 'sheet'): string {
    if (!this.state().run) return 'Sin ejecutar';
    const status = this.stepStatus(step);
    return status === 'success' ? 'Completado' : status === 'error' ? 'Error simulado' : 'Pendiente';
  }

  eventStepLabel(step: 'form' | 'validation' | 'crm' | 'sheet'): string {
    return this.steps.find(item => item.key === step)?.label ?? step;
  }

  loadExample(kind: 'new' | 'existing'): void {
    if (this.isFailed()) return;
    const scenario = this.form.controls.scenario.value;
    this.form.reset({ ...(kind === 'new' ? NEW_EXAMPLE : EXISTING_EXAMPLE), scenario });
    this.feedback.set({
      kind: 'ready',
      message: kind === 'new'
        ? 'Ejemplo nuevo cargado. Elige un escenario y pulsa «Simular integración».'
        : 'Contacto existente cargado con una empresa e interés nuevos. Comprueba cómo se actualiza sin duplicarse.'
    });
    this.document.getElementById('integration-submit')?.focus();
  }

  submit(): void {
    if (this.isFailed()) return;
    const raw = this.form.getRawValue();
    this.form.patchValue({ name: raw.name.trim(), email: raw.email.trim().toLowerCase(), company: raw.company.trim() });
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.feedback.set({ kind: 'error', message: 'Revisa los campos marcados antes de simular la integración.' });
      const invalid = Object.entries(this.form.controls).find(([, control]) => control.invalid)?.[0];
      this.document.getElementById('integration-' + invalid)?.focus();
      return;
    }

    const values = this.form.getRawValue();
    const input: IntegrationInput = { name: values.name, email: values.email, company: values.company, service: values.service as ServiceKey };
    try {
      this.state.set(integrate(this.state(), input, values.scenario));
      this.feedback.set(null);
    } catch (error) {
      this.feedback.set({ kind: 'error', message: error instanceof Error ? error.message : 'Revisa los datos e inténtalo nuevamente.' });
    }
  }

  retry(): void {
    if (!this.isFailed()) return;
    this.state.set(retryIntegration(this.state()));
    this.feedback.set(null);
    this.document.getElementById('integration-run-title')?.focus();
  }

  reset(): void {
    this.state.set(createInitialState());
    this.feedback.set(null);
    this.form.reset({ name: '', email: '', company: '', service: '', scenario: 'none' });
  }
}
