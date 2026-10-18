import { DOCUMENT, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  advanceLead,
  captureLead,
  CaptureInput,
  createInitialState,
  DUPLICATE_EXAMPLE,
  LeadStage,
  NEW_LEAD_EXAMPLE,
  SERVICE_OPTIONS,
  ServiceKey,
  SOURCE_OPTIONS,
  SourceKey,
  STAGES
} from './demo-state';

function requiredText(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim() ? null : { required: true };
}

function oneOf(values: readonly string[]): ValidatorFn {
  return control => values.includes(control.value) ? null : { option: true };
}

@Component({
  selector: 'app-commercial-capture',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './commercial-capture.component.html'
})
export class CommercialCaptureComponent {
  private readonly document = inject(DOCUMENT);
  private readonly formBuilder = inject(FormBuilder);
  readonly serviceOptions = SERVICE_OPTIONS;
  readonly sourceOptions = SOURCE_OPTIONS;
  readonly stages = STAGES;
  readonly state = signal(createInitialState());
  readonly selectedId = signal<string | null>(null);
  readonly feedback = signal<{ kind: 'ready' | 'created' | 'duplicate' | 'error' | 'advanced'; message: string } | null>(null);
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [requiredText, Validators.maxLength(80)]],
    email: ['', [requiredText, Validators.email, Validators.maxLength(254)]],
    company: ['', Validators.maxLength(120)],
    service: ['' as ServiceKey | '', [Validators.required, oneOf(SERVICE_OPTIONS.map(option => option.value))]],
    source: ['web' as SourceKey, [Validators.required, oneOf(SOURCE_OPTIONS.map(option => option.value))]]
  });
  readonly selectedLead = computed(() => this.state().leads.find(lead => lead.id === this.selectedId()) ?? null);
  readonly columns = computed(() => STAGES.map(stage => ({
    ...stage,
    leads: this.state().leads.filter(lead => lead.stage === stage.value)
  })));
  readonly openCount = computed(() => this.state().leads.filter(lead => lead.stage !== 'ganado').length);
  readonly wonCount = computed(() => this.state().leads.filter(lead => lead.stage === 'ganado').length);
  readonly nextStage = computed(() => {
    const lead = this.selectedLead();
    if (!lead) return null;
    return STAGES[STAGES.findIndex(stage => stage.value === lead.stage) + 1] ?? null;
  });

  hasError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  serviceLabel(service: ServiceKey): string {
    return SERVICE_OPTIONS.find(option => option.value === service)?.label ?? service;
  }

  sourceLabel(source: SourceKey): string {
    return SOURCE_OPTIONS.find(option => option.value === source)?.label ?? source;
  }

  stageLabel(stage: LeadStage): string {
    return STAGES.find(option => option.value === stage)?.label ?? stage;
  }

  loadExample(kind: 'new' | 'duplicate'): void {
    this.form.reset(kind === 'new' ? NEW_LEAD_EXAMPLE : DUPLICATE_EXAMPLE);
    this.feedback.set({
      kind: 'ready',
      message: kind === 'new'
        ? 'Ejemplo nuevo cargado. Pulsa «Simular captación» para asignar responsable y próxima acción.'
        : 'Ejemplo duplicado cargado. Pulsa «Simular captación» para ver cómo se conserva su seguimiento.'
    });
    this.document.getElementById('demo-submit')?.focus();
  }

  submit(): void {
    const rawValues = this.form.getRawValue();
    this.form.patchValue({
      name: rawValues.name.trim(),
      email: rawValues.email.trim().toLowerCase(),
      company: rawValues.company.trim()
    });
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.feedback.set({ kind: 'error', message: 'Revisa los campos marcados para simular la captación.' });
      const firstInvalidField = Object.entries(this.form.controls).find(([, control]) => control.invalid)?.[0];
      this.document.getElementById('demo-' + firstInvalidField)?.focus();
      return;
    }

    const values = this.form.getRawValue();
    try {
      const result = captureLead(this.state(), { ...values, service: values.service as CaptureInput['service'] });
      this.state.set(result.state);
      this.selectedId.set(result.leadId);
      this.feedback.set({ kind: result.kind, message: result.message });
    } catch (error) {
      this.feedback.set({ kind: 'error', message: error instanceof Error ? error.message : 'Revisa los datos de la consulta e inténtalo nuevamente.' });
    }
  }

  selectLead(id: string): void {
    this.selectedId.set(id);
  }

  advanceSelected(): void {
    const lead = this.selectedLead();
    const next = this.nextStage();
    if (!lead || !next) return;
    this.state.set(advanceLead(this.state(), lead.id));
    this.feedback.set({ kind: 'advanced', message: `${lead.name} ahora está en «${next.label}». Su próxima acción e historial se actualizaron.` });
  }

  reset(): void {
    this.state.set(createInitialState());
    this.selectedId.set(null);
    this.feedback.set(null);
    this.form.reset({ name: '', email: '', company: '', service: '', source: 'web' });
  }
}
