import {
  createInitialState, EXISTING_EXAMPLE, FailureMode, integrate, IntegrationInput,
  NEW_EXAMPLE, retryIntegration, ServiceKey
} from './integration-state';

describe('Form, CRM and sheet integration state', () => {
  it('starts with one coherent, independent fictitious CRM contact and sheet row', () => {
    const state = createInitialState();
    expect(state.run).toBeNull();
    expect(state.contacts.length).toBe(1);
    expect(state.rows.length).toBe(1);
    expect(state.contacts[0].id).toBe('CRM-1001');
    expect(state.contacts[0].stage).toBe('propuesta');
    expect(state.rows[0]).toEqual({
      contactId: 'CRM-1001', name: 'Valentina Ríos', email: 'valentina.rios@example.com',
      company: 'Aurora Logística', service: 'crm', owner: 'Martín', stage: 'propuesta'
    });
    state.contacts[0].name = 'External mutation';
    state.rows[0].company = 'External mutation';
    const fresh = createInitialState();
    expect(fresh.contacts[0].name).toBe('Valentina Ríos');
    expect(fresh.rows[0].company).toBe('Aurora Logística');
    expect(fresh.contacts).not.toBe(state.contacts);
    expect(fresh.rows).not.toBe(state.rows);
  });

  it('normalizes a new input, saves matching records and leaves original data unchanged', () => {
    const initial = createInitialState();
    const before = JSON.stringify(initial);
    const input = { ...NEW_EXAMPLE, name: ' Laura Vega ', email: ' CAPTACION@EXAMPLE.COM ', company: ' Horizonte Estudio ' };
    const state = integrate(initial, input, 'none');
    const contact = state.contacts[0];
    const run = state.run!;

    expect(contact).toEqual({ ...NEW_EXAMPLE, id: 'CRM-1002', owner: 'Sofía', stage: 'nuevo' });
    expect(state.rows[0]).toEqual({ ...NEW_EXAMPLE, contactId: 'CRM-1002', owner: 'Sofía', stage: 'nuevo' });
    expect(run.inputSnapshot).toEqual(NEW_EXAMPLE);
    expect(run.status).toBe('success');
    expect(run.failedAt).toBeNull();
    expect(run.crmAction).toBe('created');
    expect(run.sheetAction).toBe('created');
    expect(run.contactId).toBe('CRM-1002');
    expect(run.id).toBe('RUN-0001');
    expect(run.events.map(event => event.step)).toEqual(['form', 'validation', 'crm', 'sheet']);
    expect(run.events.every(event => event.status === 'success')).toBeTrue();
    expect(new Set(run.events.map(event => event.id)).size).toBe(4);
    expect(state.nextContactId).toBe(1003);
    expect(state.nextRunId).toBe(2);
    expect(JSON.stringify(initial)).toBe(before);
    expect(input.email).toBe(' CAPTACION@EXAMPLE.COM ');
  });

  it('updates a normalized duplicate in CRM and sheet while retaining owner and stage', () => {
    const initial = createInitialState();
    const before = JSON.stringify(initial);
    const state = integrate(initial, {
      ...EXISTING_EXAMPLE, email: ` ${EXISTING_EXAMPLE.email.toUpperCase()} `,
      name: ' Valentina Ríos Actualizada ', service: 'dashboards'
    }, 'none');

    expect(state.contacts.length).toBe(1);
    expect(state.rows.length).toBe(1);
    expect(state.contacts[0]).toEqual({
      ...EXISTING_EXAMPLE, name: 'Valentina Ríos Actualizada', service: 'dashboards',
      id: 'CRM-1001', owner: 'Martín', stage: 'propuesta'
    });
    expect(state.rows[0].contactId).toBe('CRM-1001');
    expect(state.rows[0].company).toBe(EXISTING_EXAMPLE.company);
    expect(state.rows[0].service).toBe('dashboards');
    expect(state.rows[0].owner).toBe('Martín');
    expect(state.rows[0].stage).toBe('propuesta');
    expect(state.run!.crmAction).toBe('updated');
    expect(state.run!.sheetAction).toBe('updated');
    expect(state.nextContactId).toBe(initial.nextContactId);
    expect(JSON.stringify(initial)).toBe(before);
  });

  it('allows a blank company and assigns the owner deterministically for new contacts', () => {
    const owners: Record<ServiceKey, string> = {
      automatizacion: 'Sofía', crm: 'Martín', integraciones: 'Martín', dashboards: 'Sofía'
    };
    for (const service of Object.keys(owners) as ServiceKey[]) {
      const state = integrate(createInitialState(), { ...NEW_EXAMPLE, company: '  ', service }, 'none');
      expect(state.contacts[0].company).toBe('');
      expect(state.contacts[0].owner).withContext(service).toBe(owners[service]);
      expect(state.rows[0].company).toBe('');
    }
  });

  it('keeps both destinations unchanged on CRM failure and resumes with the captured input', () => {
    const initial = createInitialState();
    const before = JSON.stringify(initial);
    const input = { ...NEW_EXAMPLE };
    const failed = integrate(initial, input, 'crm');
    const failedBefore = JSON.stringify(failed);
    input.name = 'Changed form';
    input.email = 'changed@example.com';
    input.service = 'crm';

    expect(failed.contacts).toBe(initial.contacts);
    expect(failed.rows).toBe(initial.rows);
    expect(failed.nextContactId).toBe(initial.nextContactId);
    expect(failed.run!.status).toBe('failed');
    expect(failed.run!.failedAt).toBe('crm');
    expect(failed.run!.contactId).toBeNull();
    expect(failed.run!.crmAction).toBeNull();
    expect(failed.run!.events.slice(-2).map(event => event.status)).toEqual(['error', 'pending']);

    const retried = retryIntegration(failed);
    expect(retried.run!.id).toBe(failed.run!.id);
    expect(retried.run!.inputSnapshot).toEqual(NEW_EXAMPLE);
    expect(retried.contacts[0].name).toBe(NEW_EXAMPLE.name);
    expect(retried.contacts[0].email).toBe(NEW_EXAMPLE.email);
    expect(retried.contacts[0].owner).toBe('Sofía');
    expect(retried.rows[0].contactId).toBe('CRM-1002');
    expect(retried.run!.status).toBe('success');
    expect(retried.run!.failedAt).toBeNull();
    expect(retried.nextRunId).toBe(failed.nextRunId);
    expect(retried.nextContactId).toBe(1003);
    expect(retried.run!.events.slice(-2).map(event => event.step)).toEqual(['crm', 'sheet']);
    expect(new Set(retried.run!.events.map(event => event.id)).size).toBe(6);
    expect(JSON.stringify(failed)).toBe(failedBefore);
    expect(JSON.stringify(initial)).toBe(before);
  });

  it('preserves a partial CRM save and retries only the sheet without duplicating a contact', () => {
    const initial = createInitialState();
    const failed = integrate(initial, NEW_EXAMPLE, 'sheet');
    const failedBefore = JSON.stringify(failed);
    expect(failed.contacts.length).toBe(2);
    expect(failed.rows).toBe(initial.rows);
    expect(failed.run!.status).toBe('failed');
    expect(failed.run!.failedAt).toBe('sheet');
    expect(failed.run!.crmAction).toBe('created');
    expect(failed.run!.sheetAction).toBeNull();
    expect(failed.run!.contactId).toBe('CRM-1002');

    const retried = retryIntegration(failed);
    expect(retried.contacts).toBe(failed.contacts);
    expect(retried.nextContactId).toBe(failed.nextContactId);
    expect(retried.nextRunId).toBe(failed.nextRunId);
    expect(retried.rows.length).toBe(2);
    expect(retried.rows.filter(row => row.contactId === 'CRM-1002').length).toBe(1);
    expect(retried.run!.id).toBe(failed.run!.id);
    expect(retried.run!.crmAction).toBe('created');
    expect(retried.run!.sheetAction).toBe('created');
    expect(retried.run!.events.filter(event => event.step === 'crm').length).toBe(1);
    expect(retried.run!.events.at(-1)!.step).toBe('sheet');
    expect(retried.run!.events.at(-1)!.status).toBe('success');
    expect(JSON.stringify(failed)).toBe(failedBefore);
    expect(retryIntegration(retried)).toBe(retried);
  });

  it('updates an existing sheet row after a partial duplicate save, preserving its original data until retry', () => {
    const initial = createInitialState();
    const failed = integrate(initial, EXISTING_EXAMPLE, 'sheet');
    expect(failed.contacts[0].company).toBe(EXISTING_EXAMPLE.company);
    expect(failed.rows[0].company).toBe('Aurora Logística');
    expect(failed.contacts[0].stage).toBe('propuesta');
    const complete = retryIntegration(failed);
    expect(complete.contacts).toBe(failed.contacts);
    expect(complete.rows.length).toBe(1);
    expect(complete.rows[0].company).toBe(EXISTING_EXAMPLE.company);
    expect(complete.rows[0].service).toBe(EXISTING_EXAMPLE.service);
    expect(complete.rows[0].stage).toBe('propuesta');
    expect(complete.run!.crmAction).toBe('updated');
    expect(complete.run!.sheetAction).toBe('updated');
  });

  it('keeps retry idempotent and prevents replacing an unfinished run with a new submission', () => {
    const initial = createInitialState();
    expect(retryIntegration(initial)).toBe(initial);
    for (const mode of ['none', 'crm', 'sheet'] as FailureMode[]) {
      const first = integrate(initial, NEW_EXAMPLE, mode);
      const complete = retryIntegration(first);
      expect(retryIntegration(complete)).toBe(complete);
      expect(complete.contacts.length).toBe(2);
      expect(complete.rows.length).toBe(2);
      if (mode !== 'none') {
        expect(() => integrate(first, EXISTING_EXAMPLE, 'none')).toThrowError(/pendiente/);
      }
      const repeated = integrate(complete, { ...NEW_EXAMPLE, email: ' CAPTACION@EXAMPLE.COM ' }, 'none');
      expect(repeated.contacts.length).toBe(2);
      expect(repeated.rows.length).toBe(2);
      expect(repeated.run!.id).toBe('RUN-0002');
      expect(repeated.run!.crmAction).toBe('updated');
      expect(repeated.run!.sheetAction).toBe('updated');
      expect(repeated.nextContactId).toBe(1003);
    }
  });

  it('rejects invalid runtime fields and failure modes without mutating state', () => {
    const state = createInitialState();
    const before = JSON.stringify(state);
    const invalidInputs: unknown[] = [
      null, { ...NEW_EXAMPLE, name: '  ' }, { ...NEW_EXAMPLE, name: 'x'.repeat(81) },
      { ...NEW_EXAMPLE, email: 'invalid' }, { ...NEW_EXAMPLE, email: '.name@example.com' },
      { ...NEW_EXAMPLE, email: 'a'.repeat(65) + '@example.com' },
      { ...NEW_EXAMPLE, email: 'a@' + 'b'.repeat(64) + '.com' },
      { ...NEW_EXAMPLE, email: 'a'.repeat(64) + '@' + ('b'.repeat(63) + '.').repeat(3) + 'com' },
      { ...NEW_EXAMPLE, company: 'x'.repeat(121) }, { ...NEW_EXAMPLE, company: undefined },
      { ...NEW_EXAMPLE, service: 'missing' }
    ];
    for (const input of invalidInputs) {
      expect(() => integrate(state, input as IntegrationInput, 'none')).toThrowError();
      expect(JSON.stringify(state)).toBe(before);
    }
    expect(() => integrate(state, NEW_EXAMPLE, 'unknown' as FailureMode)).toThrowError(/escenario/);
    expect(JSON.stringify(state)).toBe(before);
  });
});
