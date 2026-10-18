export type ServiceKey = 'automatizacion' | 'crm' | 'integraciones' | 'dashboards';
export type SourceKey = 'web' | 'referido' | 'evento';
export type LeadStage = 'nuevo' | 'contactado' | 'propuesta' | 'ganado';

export interface CaptureInput {
  name: string;
  email: string;
  company: string;
  service: ServiceKey;
  source: SourceKey;
}

export interface DemoActivity {
  id: string;
  label: string;
}

export interface NextAction {
  label: string;
  dueLabel: string;
}

export interface DemoLead extends CaptureInput {
  id: string;
  owner: string;
  stage: LeadStage;
  nextAction: NextAction;
  activities: DemoActivity[];
}

export interface DemoState {
  leads: DemoLead[];
  nextId: number;
}

export interface CaptureResult {
  state: DemoState;
  kind: 'created' | 'duplicate';
  leadId: string;
  message: string;
}

export const SERVICE_OPTIONS: { value: ServiceKey; label: string }[] = [
  { value: 'automatizacion', label: 'Automatización' },
  { value: 'crm', label: 'CRM y seguimiento comercial' },
  { value: 'integraciones', label: 'Integraciones' },
  { value: 'dashboards', label: 'Dashboards' }
];

export const SOURCE_OPTIONS: { value: SourceKey; label: string }[] = [
  { value: 'web', label: 'Sitio web' },
  { value: 'referido', label: 'Referido' },
  { value: 'evento', label: 'Evento' }
];

export const STAGES: { value: LeadStage; label: string }[] = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'propuesta', label: 'Propuesta' },
  { value: 'ganado', label: 'Ganado' }
];

export const NEW_LEAD_EXAMPLE: CaptureInput = {
  name: 'Laura Vega',
  email: 'captacion@example.com',
  company: 'Horizonte Estudio',
  service: 'automatizacion',
  source: 'web'
};

export const DUPLICATE_EXAMPLE: CaptureInput = {
  name: 'Valentina Ríos',
  email: 'valentina.rios@example.com',
  company: 'Aurora Logística',
  service: 'crm',
  source: 'referido'
};

const OWNERS: Record<ServiceKey, string> = {
  automatizacion: 'Sofía',
  crm: 'Martín',
  integraciones: 'Martín',
  dashboards: 'Sofía'
};

const NEXT_ACTIONS: Record<LeadStage, NextAction> = {
  nuevo: { label: 'Enviar primer contacto', dueLabel: 'Hoy' },
  contactado: { label: 'Preparar propuesta', dueLabel: 'En 2 días' },
  propuesta: { label: 'Dar seguimiento a la propuesta', dueLabel: 'En 3 días' },
  ganado: { label: 'Coordinar inicio del proyecto', dueLabel: 'En 1 día' }
};

// Same email shape and length limits as Angular's email validator; no network lookup.
const EMAIL_PATTERN = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function normalizeInput(input: CaptureInput): CaptureInput {
  if (!input || typeof input.name !== 'string' || typeof input.email !== 'string'
    || typeof input.company !== 'string') {
    throw new Error('Revisa los datos de la consulta.');
  }

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const company = input.company.trim();

  if (!name || name.length > 80) {
    throw new Error('Escribe un nombre de hasta 80 caracteres.');
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error('Escribe un correo válido de hasta 254 caracteres.');
  }
  if (company.length > 120) {
    throw new Error('La empresa debe tener hasta 120 caracteres.');
  }
  if (!SERVICE_OPTIONS.some(option => option.value === input.service)) {
    throw new Error('Selecciona un servicio de la lista.');
  }
  if (!SOURCE_OPTIONS.some(option => option.value === input.source)) {
    throw new Error('Selecciona un origen de la lista.');
  }

  return { name, email, company, service: input.service, source: input.source };
}

function sourceLabel(source: SourceKey): string {
  return SOURCE_OPTIONS.find(option => option.value === source)!.label;
}

function serviceLabel(service: ServiceKey): string {
  return SERVICE_OPTIONS.find(option => option.value === service)!.label;
}

function activitiesFor(id: string, labels: string[]): DemoActivity[] {
  return labels.map((label, index) => ({ id: `${id}-activity-${index + 1}`, label }));
}

function makeLead(input: CaptureInput, id: string): DemoLead {
  const owner = OWNERS[input.service];
  return {
    ...input,
    id,
    owner,
    stage: 'nuevo',
    nextAction: { ...NEXT_ACTIONS.nuevo },
    activities: activitiesFor(id, [
      `Consulta recibida desde ${sourceLabel(input.source).toLowerCase()}.`,
      'Correo validado. No existe otra oportunidad con este correo.',
      `Responsable asignado: ${owner}, según el servicio solicitado.`,
      'Seguimiento creado: enviar primer contacto hoy.'
    ])
  };
}

/** A fresh, deterministic scenario. All people and companies are fictitious. */
export function createInitialState(): DemoState {
  let state: DemoState = {
    nextId: 5,
    leads: [
      makeLead({ name: 'Camila Torres', email: 'camila.torres@example.com', company: 'Norte Estudio', service: 'automatizacion', source: 'web' }, 'lead-1'),
      makeLead({ name: 'Diego Fuentes', email: 'diego.fuentes@example.com', company: 'Bosque Consultora', service: 'integraciones', source: 'evento' }, 'lead-2'),
      makeLead({ ...DUPLICATE_EXAMPLE }, 'lead-3'),
      makeLead({ name: 'Tomás Molina', email: 'tomas.molina@example.com', company: 'Faro Operaciones', service: 'dashboards', source: 'referido' }, 'lead-4')
    ]
  };

  state = advanceLead(state, 'lead-2');
  state = advanceLead(advanceLead(state, 'lead-3'), 'lead-3');
  state = advanceLead(advanceLead(advanceLead(state, 'lead-4'), 'lead-4'), 'lead-4');
  return state;
}

/** Capture stays in memory. Duplicate emails retain their existing opportunity. */
export function captureLead(state: DemoState, input: CaptureInput): CaptureResult {
  const normalized = normalizeInput(input);
  const existing = state.leads.find(lead => lead.email.trim().toLowerCase() === normalized.email);

  if (existing) {
    const activity: DemoActivity = {
      id: `${existing.id}-activity-${existing.activities.length + 1}`,
      label: `Nueva consulta por ${serviceLabel(normalized.service).toLowerCase()} desde ${sourceLabel(normalized.source).toLowerCase()}. Correo duplicado: se conserva la oportunidad, su responsable y su etapa.`
    };
    return {
      kind: 'duplicate',
      leadId: existing.id,
      message: `Este correo ya tiene una oportunidad. Se agregó la consulta al historial de ${existing.name}, sin crear un duplicado ni cambiar su etapa.`,
      state: {
        ...state,
        leads: state.leads.map(lead => lead.id === existing.id
          ? { ...lead, activities: [...lead.activities, activity] }
          : lead)
      }
    };
  }

  const id = `lead-${state.nextId}`;
  const lead = makeLead(normalized, id);
  return {
    kind: 'created',
    leadId: id,
    message: `Oportunidad creada y asignada a ${lead.owner}. Próxima acción: enviar primer contacto hoy.`,
    state: { leads: [lead, ...state.leads], nextId: state.nextId + 1 }
  };
}

/** Simulates one commercial step and schedules its next task, without side effects. */
export function advanceLead(state: DemoState, leadId: string): DemoState {
  const current = state.leads.find(lead => lead.id === leadId);
  if (!current || current.stage === 'ganado') {
    return state;
  }

  const nextStage = STAGES[STAGES.findIndex(stage => stage.value === current.stage) + 1];
  const nextAction = { ...NEXT_ACTIONS[nextStage.value] };
  const activity: DemoActivity = {
    id: `${current.id}-activity-${current.activities.length + 1}`,
    label: `Etapa actualizada a ${nextStage.label.toLowerCase()}. Próxima acción: ${nextAction.label.toLowerCase()} (${nextAction.dueLabel.toLowerCase()}).`
  };
  return {
    ...state,
    leads: state.leads.map(lead => lead.id === current.id
      ? { ...lead, stage: nextStage.value, nextAction, activities: [...lead.activities, activity] }
      : lead)
  };
}
