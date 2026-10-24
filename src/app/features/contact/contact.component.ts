import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AnalyticsService } from '../../shared/analytics/analytics.service';

function requiredText(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.trim().length > 0 ? null : { required: true };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section id="contacto" aria-labelledby="contact-title" class="py-24 bg-brand-dark border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        <div class="lg:col-span-2">
          <span class="text-blue-400 font-semibold text-sm uppercase tracking-widest">Conversemos</span>
          <h2 id="contact-title" class="text-3xl sm:text-4xl font-bold text-white mt-4 mb-6">¿Qué proceso te está quitando tiempo?</h2>
          <p class="text-slate-300 text-lg leading-relaxed mb-8">
            Cuéntame qué necesita tu equipo. Podemos revisar cómo automatizar tareas, ordenar el seguimiento comercial o conectar tus herramientas.
          </p>
          <div class="p-6 rounded-2xl border border-slate-700 bg-slate-900/50 mb-8">
            <h3 class="font-semibold text-white mb-3">El primer paso</h3>
            <p class="text-slate-300 leading-relaxed">
              Revisaré tu consulta y te contactaré por correo para entender el proceso y acordar el siguiente paso. No necesitas tener una solución definida.
            </p>
          </div>
          <p class="text-slate-400 text-sm mb-3">También puedes escribirme directamente:</p>
          <a href="mailto:maff.dsgn@gmail.com" class="inline-flex items-center gap-2 text-blue-300 hover:text-white underline underline-offset-4 break-all transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
            <svg aria-hidden="true" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            maff.dsgn&#64;gmail.com
          </a>
          <div class="flex flex-wrap gap-6 mt-6 text-sm">
            <a href="https://linkedin.com/in/maff-dev" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">LinkedIn <span class="sr-only">(abre una pestaña nueva)</span></a>
            <a href="https://github.com/TheMaff" target="_blank" rel="noopener noreferrer" class="text-slate-300 hover:text-white underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">GitHub <span class="sr-only">(abre una pestaña nueva)</span></a>
          </div>
        </div>

        <div class="lg:col-span-3 bg-slate-900/60 border border-slate-700 rounded-3xl p-6 sm:p-8 min-w-0">
          <h3 class="text-xl font-semibold text-white mb-2">Hablemos de tu proyecto</h3>
          <p class="text-sm text-slate-400 mb-7">Los campos marcados con * son obligatorios.</p>

          @if (isLocalPreview) {
            <p id="contact-preview" class="text-sm text-blue-200 bg-blue-950/50 border border-blue-800 rounded-xl p-4 mb-6">
              Esta es una vista previa: el envío estará disponible en el sitio publicado. Puedes contactarme por correo.
            </p>
          }

          <form name="b2b-contact" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" [formGroup]="form" (ngSubmit)="submit()" novalidate aria-describedby="contact-privacy" [attr.aria-busy]="isSubmitting()">
            <input type="hidden" name="form-name" value="b2b-contact">
            <p hidden aria-hidden="true">
              <label>No completar: <input name="bot-field" formControlName="bot-field" tabindex="-1" autocomplete="off"></label>
            </p>
            <fieldset [disabled]="isSubmitting()" class="space-y-5 min-w-0">
              <legend class="sr-only">Datos de contacto y proceso a mejorar</legend>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="contact-name" class="block text-sm font-medium text-slate-200 mb-2">Nombre *</label>
                  <input id="contact-name" name="name" formControlName="name" type="text" autocomplete="name" required maxlength="100" [attr.aria-invalid]="hasError('name')" [attr.aria-describedby]="hasError('name') ? 'contact-name-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950/60 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60">
                  @if (hasError('name')) { <p id="contact-name-error" class="mt-2 text-sm text-red-300">Escribe tu nombre (hasta 100 caracteres).</p> }
                </div>
                <div>
                  <label for="contact-email" class="block text-sm font-medium text-slate-200 mb-2">Correo electrónico *</label>
                  <input id="contact-email" name="email" formControlName="email" type="email" autocomplete="email" inputmode="email" required maxlength="254" [attr.aria-invalid]="hasError('email')" [attr.aria-describedby]="hasError('email') ? 'contact-email-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950/60 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60">
                  @if (hasError('email')) { <p id="contact-email-error" class="mt-2 text-sm text-red-300">Escribe un correo válido para poder responderte.</p> }
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label for="contact-company" class="block text-sm font-medium text-slate-200 mb-2">Empresa <span class="text-slate-400 font-normal">(opcional)</span></label>
                  <input id="contact-company" name="company" formControlName="company" type="text" autocomplete="organization" maxlength="150" [attr.aria-invalid]="hasError('company')" [attr.aria-describedby]="hasError('company') ? 'contact-company-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950/60 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60">
                  @if (hasError('company')) { <p id="contact-company-error" class="mt-2 text-sm text-red-300">Usa hasta 150 caracteres.</p> }
                </div>
                <div>
                  <label for="contact-service" class="block text-sm font-medium text-slate-200 mb-2">¿En qué necesitas ayuda? *</label>
                  <select id="contact-service" name="service" formControlName="service" required [attr.aria-invalid]="hasError('service')" [attr.aria-describedby]="hasError('service') ? 'contact-service-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60">
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="automatizacion">Automatización de procesos</option>
                    <option value="crm">CRM y seguimiento comercial</option>
                    <option value="integraciones">Integración de herramientas</option>
                    <option value="dashboards">Dashboards e indicadores</option>
                  </select>
                  @if (hasError('service')) { <p id="contact-service-error" class="mt-2 text-sm text-red-300">Selecciona el servicio más cercano a tu necesidad.</p> }
                </div>
              </div>
              <div>
                <label for="contact-process" class="block text-sm font-medium text-slate-200 mb-2">¿Qué proceso quieres mejorar? *</label>
                <textarea id="contact-process" name="process" formControlName="process" rows="4" required maxlength="3000" placeholder="Por ejemplo: recibimos consultas en varios canales y perdemos el seguimiento de los clientes." [attr.aria-invalid]="hasError('process')" [attr.aria-describedby]="hasError('process') ? 'contact-process-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950/60 text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60"></textarea>
                @if (hasError('process')) { <p id="contact-process-error" class="mt-2 text-sm text-red-300">Cuéntame qué quieres mejorar (hasta 3000 caracteres).</p> }
              </div>
              <div>
                <label for="contact-tools" class="block text-sm font-medium text-slate-200 mb-2">Herramientas que usan hoy <span class="text-slate-400 font-normal">(opcional)</span></label>
                <input id="contact-tools" name="tools" formControlName="tools" type="text" maxlength="500" placeholder="Por ejemplo: Excel, HubSpot, correo, sistema de ventas…" [attr.aria-invalid]="hasError('tools')" [attr.aria-describedby]="hasError('tools') ? 'contact-tools-error' : null" class="w-full rounded-xl border border-slate-600 bg-slate-950/60 text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-60">
                @if (hasError('tools')) { <p id="contact-tools-error" class="mt-2 text-sm text-red-300">Usa hasta 500 caracteres.</p> }
              </div>
              <p id="contact-privacy" class="text-sm text-slate-400 leading-relaxed">Usaré estos datos para responder tu consulta y conversar sobre tu proyecto. Evita incluir contraseñas o información confidencial.</p>
              <button type="submit" [disabled]="isSubmitting()" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition disabled:opacity-60 disabled:cursor-wait focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
                {{ isSubmitting() ? 'Enviando consulta…' : 'Enviar consulta' }}
              </button>
            </fieldset>
            @if (status() === 'success') {
              <p role="status" class="mt-5 rounded-xl border border-emerald-700 bg-emerald-950/50 p-4 text-emerald-200">Consulta enviada. Gracias por contarme sobre tu proyecto; te responderé por correo.</p>
            }
            @if (status() === 'error') {
              <p role="alert" class="mt-5 rounded-xl border border-red-800 bg-red-950/50 p-4 text-red-200">No pudimos enviar tu consulta. Tus datos siguen en el formulario: puedes reintentar o escribirme a <a href="mailto:maff.dsgn@gmail.com" class="underline underline-offset-4 font-medium">maff.dsgn&#64;gmail.com</a>.</p>
            }
            @if (status() === 'preview') {
              <p role="status" class="mt-5 rounded-xl border border-blue-800 bg-blue-950/50 p-4 text-blue-200">Los campos están completos. Esta vista previa no envía consultas; escríbeme a <a href="mailto:maff.dsgn@gmail.com" class="underline underline-offset-4 font-medium">maff.dsgn&#64;gmail.com</a>.</p>
            }
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly formBuilder = inject(FormBuilder);
  private readonly analytics = inject(AnalyticsService);
  private readonly browserRendered = signal(false);
  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [requiredText, Validators.maxLength(100)]],
    email: ['', [requiredText, Validators.email, Validators.maxLength(254)]],
    company: ['', Validators.maxLength(150)],
    service: ['', Validators.required],
    process: ['', [requiredText, Validators.maxLength(3000)]],
    tools: ['', Validators.maxLength(500)],
    'bot-field': ['']
  });
  readonly status = signal<'idle' | 'sending' | 'success' | 'error' | 'preview'>('idle');

  constructor() {
    // Keep the first browser render identical to the prerendered HTML.
    afterNextRender(() => this.browserRendered.set(true));
  }

  get isLocalPreview(): boolean {
    if (!isPlatformBrowser(this.platformId) || !this.browserRendered()) return false;
    const hostname = this.document.location?.hostname ?? '';
    return !hostname || ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'].includes(hostname) || hostname.endsWith('.localhost');
  }

  isSubmitting(): boolean {
    return this.status() === 'sending';
  }

  hasError(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  async submit(): Promise<void> {
    if (this.isSubmitting()) return;
    this.status.set('idle');
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      const firstInvalidField = Object.entries(this.form.controls).find(([, control]) => control.invalid)?.[0];
      this.document.getElementById('contact-' + firstInvalidField)?.focus();
      return;
    }

    // Local development servers can return the app shell for any POST; that is not a delivered lead.
    if (this.isLocalPreview) {
      this.status.set('preview');
      return;
    }

    this.status.set('sending');
    const values = this.form.getRawValue();
    const body = new URLSearchParams({
      'form-name': 'b2b-contact',
      ...Object.fromEntries(Object.entries(values).map(([name, value]) => [name, value.trim()]))
    }).toString();

    try {
      // Netlify removes its registration attributes when it detects the static form.
      // Check that first, so a generic HTTP 200 app shell cannot masquerade as a delivered lead.
      const definition = await fetch('/contact-form.html', { method: 'GET', cache: 'no-store' });
      if (!definition.ok) throw new Error('The form definition is unavailable.');
      const definitionHtml = new DOMParser().parseFromString(await definition.text(), 'text/html');
      const registeredForm = definitionHtml.querySelector('form[name="b2b-contact"]');
      const formName = registeredForm?.querySelector<HTMLInputElement>('input[type="hidden"][name="form-name"]');
      if (!registeredForm || registeredForm.hasAttribute('data-netlify') || registeredForm.hasAttribute('netlify') || formName?.value !== 'b2b-contact') {
        throw new Error('Form handling has not been enabled for this deployment.');
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      if (!response.ok) throw new Error('The form endpoint did not accept the submission.');
      this.form.reset();
      this.status.set('success');
      this.analytics.trackGenerateLead();
    } catch {
      this.status.set('error');
    }
  }
}
