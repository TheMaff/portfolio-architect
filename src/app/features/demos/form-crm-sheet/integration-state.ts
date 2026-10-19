export type ServiceKey = 'automatizacion' | 'crm' | 'integraciones' | 'dashboards';
export type FailureMode = 'none' | 'crm' | 'sheet';
export type IntegrationStep = 'form' | 'validation' | 'crm' | 'sheet';

export interface IntegrationInput {
  name: string;
  email: string;
  company: string;
  service: ServiceKey;
}

export interface Contact extends IntegrationInput {
  id: string;
  owner: string;
  stage: 'nuevo' | 'propuesta';
}

export interface SheetRow extends IntegrationInput {
  contactId: string;
  owner: string;
  stage: Contact['stage'];
}

export interface IntegrationEvent {
  id: string;
  step: IntegrationStep;
  status: 'success' | 'error' | 'pending';
  message: string;
}

export interface IntegrationRun {
  id: string;
  inputSnapshot: IntegrationInput;
  mode: FailureMode;
  status: 'success' | 'failed';
  failedAt: 'crm' | 'sheet' | null;
  crmAction: 'created' | 'updated' | null;
  sheetAction: 'created' | 'updated' | null;
  contactId: string | null;
  events: IntegrationEvent[];
}

export interface IntegrationState {
  contacts: Contact[];
  rows: SheetRow[];
  run: IntegrationRun | null;
  nextContactId: number;
  nextRunId: number;
}

export const SERVICE_OPTIONS: { value: ServiceKey; label: string }[] = [
  { value: 'automatizacion', label: 'Automatización' },
  { value: 'crm', label: 'CRM y seguimiento comercial' },
  { value: 'integraciones', label: 'Integraciones' },
  { value: 'dashboards', label: 'Dashboards' }
];

export const FAILURE_OPTIONS: { value: FailureMode; label: string }[] = [
  { value: 'none', label: 'Sin interrupciones' },
  { value: 'crm', label: 'Fallo temporal en el CRM' },
  { value: 'sheet', label: 'Fallo temporal en la hoja' }
];

export const NEW_EXAMPLE: IntegrationInput = {
  name: 'Laura Vega',
  email: 'captacion@example.com',
  company: 'Horizonte Estudio',
  service: 'automatizacion'
};

export const EXISTING_EXAMPLE: IntegrationInput = {
  name: 'Valentina Ríos',
  email: 'valentina.rios@example.com',
  company: 'Aurora Logística Norte',
  service: 'integraciones'
};

const OWNERS: Record<ServiceKey, string> = {
  automatizacion: 'Sofía', crm: 'Martín', integraciones: 'Martín', dashboards: 'Sofía'
};

// Matches Angular's email validator, including local-part and full-address limits.
const EMAIL_PATTERN = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function normalizeInput(input: IntegrationInput): IntegrationInput {
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
  return { name, email, company, service: input.service };
}

function toSheetRow(contact: Contact): SheetRow {
  const { id, ...fields } = contact;
  return { contactId: id, ...fields };
}

/** Fresh fixtures are independent of previous runs and never leave memory. */
export function createInitialState(): IntegrationState {
  const contact: Contact = {
    id: 'CRM-1001', name: 'Valentina Ríos', email: 'valentina.rios@example.com',
    company: 'Aurora Logística', service: 'crm', owner: 'Martín', stage: 'propuesta'
  };
  return {
    contacts: [contact], rows: [toSheetRow(contact)], run: null,
    nextContactId: 1002, nextRunId: 1
  };
}

function appendEvent(
  run: IntegrationRun, step: IntegrationStep, status: IntegrationEvent['status'], message: string
): IntegrationRun {
  return {
    ...run,
    events: [...run.events, { id: `${run.id}-${run.events.length + 1}`, step, status, message }]
  };
}

/** Email is the CRM identity; owner and commercial stage survive contact updates. */
function saveCrm(state: IntegrationState, run: IntegrationRun): IntegrationState {
  const input = run.inputSnapshot;
  const existing = state.contacts.find(contact => contact.email.trim().toLowerCase() === input.email);
  const contact: Contact = existing
    ? { ...existing, ...input }
    : { ...input, id: `CRM-${state.nextContactId}`, owner: OWNERS[input.service], stage: 'nuevo' };
  let savedRun: IntegrationRun = {
    ...run, contactId: contact.id, crmAction: existing ? 'updated' : 'created'
  };
  savedRun = appendEvent(savedRun, 'crm', 'success', existing
    ? `Contacto ${contact.id} actualizado por correo. Se conservan responsable (${contact.owner}) y etapa (${contact.stage}).`
    : `Contacto ${contact.id} creado y asignado a ${contact.owner}.`);
  return {
    ...state,
    contacts: existing
      ? state.contacts.map(item => item.id === contact.id ? contact : item)
      : [contact, ...state.contacts],
    nextContactId: existing ? state.nextContactId : state.nextContactId + 1,
    run: savedRun
  };
}

/** The CRM ID is the sheet key, so retries update a row rather than append twice. */
function saveSheet(state: IntegrationState, run: IntegrationRun): IntegrationState {
  const contact = state.contacts.find(item => item.id === run.contactId);
  if (!contact) {
    throw new Error('No se encontró el contacto de esta ejecución. Restablece la demo.');
  }
  const existing = state.rows.some(row => row.contactId === contact.id);
  const row = toSheetRow(contact);
  const completedRun = appendEvent(
    { ...run, status: 'success', failedAt: null, sheetAction: existing ? 'updated' : 'created' },
    'sheet', 'success', existing
      ? `Fila de ${contact.id} actualizada por ID del CRM, sin duplicarla.`
      : `Fila de ${contact.id} creada con los mismos datos que el CRM.`
  );
  return {
    ...state,
    rows: existing
      ? state.rows.map(item => item.contactId === contact.id ? row : item)
      : [row, ...state.rows],
    run: completedRun
  };
}

/** Runs synchronously in memory. A simulated failure affects only its chosen step. */
export function integrate(
  state: IntegrationState, input: IntegrationInput, mode: FailureMode = 'none'
): IntegrationState {
  if (state.run?.status === 'failed') {
    throw new Error('Reintenta la ejecución pendiente o restablece la demo.');
  }
  const snapshot = normalizeInput(input);
  if (!FAILURE_OPTIONS.some(option => option.value === mode)) {
    throw new Error('Selecciona un escenario de la lista.');
  }
  let run: IntegrationRun = {
    id: `RUN-${String(state.nextRunId).padStart(4, '0')}`,
    inputSnapshot: snapshot, mode, status: 'success', failedAt: null,
    crmAction: null, sheetAction: null, contactId: null, events: []
  };
  run = appendEvent(run, 'form', 'success', 'Consulta ficticia recibida desde el formulario de la demo.');
  run = appendEvent(run, 'validation', 'success', 'Campos validados y espacios normalizados. Correo convertido a minúsculas.');
  const started: IntegrationState = { ...state, nextRunId: state.nextRunId + 1, run };
  if (mode === 'crm') {
    run = appendEvent({ ...run, status: 'failed', failedAt: 'crm' }, 'crm', 'error',
      'Fallo temporal simulado: el CRM no guardó el contacto.');
    run = appendEvent(run, 'sheet', 'pending', 'Hoja pendiente: espera el guardado del contacto en el CRM.');
    return { ...started, run };
  }
  const crmSaved = saveCrm(started, run);
  const crmRun = crmSaved.run!;
  if (mode === 'sheet') {
    return {
      ...crmSaved,
      run: appendEvent({ ...crmRun, status: 'failed', failedAt: 'sheet' }, 'sheet', 'error',
        'Fallo temporal simulado: el contacto quedó guardado en el CRM y la hoja sigue pendiente.')
    };
  }
  return saveSheet(crmSaved, crmRun);
}

/** Resumes only the failed step, using the same run ID and captured input. */
export function retryIntegration(state: IntegrationState): IntegrationState {
  const run = state.run;
  if (!run || run.status !== 'failed' || !run.failedAt) {
    return state;
  }
  if (run.failedAt === 'sheet') {
    return saveSheet(state, run);
  }
  const crmSaved = saveCrm(state, run);
  return saveSheet(crmSaved, crmSaved.run!);
}
