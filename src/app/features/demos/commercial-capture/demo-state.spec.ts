import {
  advanceLead, CaptureInput, captureLead, createInitialState, DUPLICATE_EXAMPLE,
  NEW_LEAD_EXAMPLE, ServiceKey, STAGES
} from './demo-state';

describe('Commercial capture demo state', () => {
  it('starts with four fictitious opportunities, one in each stage', () => {
    const state = createInitialState();
    expect(state.leads.length).toBe(4);
    expect(state.leads.map(lead => lead.stage)).toEqual(STAGES.map(stage => stage.value));
    expect(state.leads.every(lead => lead.email.endsWith('@example.com'))).toBeTrue();
    expect(state.leads.every(lead => Boolean(lead.nextAction.label && lead.activities.length >= 4))).toBeTrue();
  });

  it('normalizes capture data and creates a task and auditable automation steps', () => {
    const initial = createInitialState();
    const before = JSON.stringify(initial);
    const input = { ...NEW_LEAD_EXAMPLE, name: ' Laura Vega ', email: ' CAPTACION@EXAMPLE.COM ', company: ' Horizonte Estudio ' };
    const result = captureLead(initial, input);
    const created = result.state.leads.find(lead => lead.id === result.leadId)!;

    expect(result.kind).toBe('created');
    expect(result.state.leads.length).toBe(5);
    expect(result.state.nextId).toBe(initial.nextId + 1);
    expect(created.name).toBe('Laura Vega');
    expect(created.email).toBe('captacion@example.com');
    expect(created.company).toBe('Horizonte Estudio');
    expect(created.stage).toBe('nuevo');
    expect(created.nextAction).toEqual({ label: 'Enviar primer contacto', dueLabel: 'Hoy' });
    expect(created.activities.map(activity => activity.label).join(' ')).toContain('Correo validado');
    expect(created.activities.length).toBe(4);
    expect(new Set(created.activities.map(activity => activity.id)).size).toBe(4);
    expect(JSON.stringify(initial)).toBe(before);
    expect(input.email).toBe(' CAPTACION@EXAMPLE.COM ');
  });

  it('allows a lead without a company and assigns owners deterministically by service', () => {
    const expectedOwners: Record<ServiceKey, string> = {
      automatizacion: 'Sofía', crm: 'Martín', integraciones: 'Martín', dashboards: 'Sofía'
    };
    for (const service of Object.keys(expectedOwners) as ServiceKey[]) {
      const result = captureLead(createInitialState(), { ...NEW_LEAD_EXAMPLE, service, company: '  ' });
      const lead = result.state.leads.find(item => item.id === result.leadId)!;
      expect(lead.owner).withContext(service).toBe(expectedOwners[service]);
      expect(lead.company).toBe('');
    }
  });

  it('detects a normalized duplicate without replacing pipeline data or mutating the previous state', () => {
    const initial = createInitialState();
    const original = initial.leads.find(lead => lead.email === DUPLICATE_EXAMPLE.email)!;
    const before = JSON.stringify(initial);
    const result = captureLead(initial, {
      ...DUPLICATE_EXAMPLE,
      email: ` ${DUPLICATE_EXAMPLE.email.toUpperCase()} `,
      name: 'Nombre distinto', company: 'Otra empresa', service: 'dashboards', source: 'evento'
    });
    const duplicate = result.state.leads.find(lead => lead.id === result.leadId)!;

    expect(result.kind).toBe('duplicate');
    expect(result.leadId).toBe(original.id);
    expect(result.state.nextId).toBe(initial.nextId);
    expect(result.state.leads.length).toBe(initial.leads.length);
    expect(duplicate.name).toBe(original.name);
    expect(duplicate.company).toBe(original.company);
    expect(duplicate.service).toBe(original.service);
    expect(duplicate.source).toBe(original.source);
    expect(duplicate.owner).toBe(original.owner);
    expect(duplicate.stage).toBe('propuesta');
    expect(duplicate.nextAction).toEqual(original.nextAction);
    expect(duplicate.activities.length).toBe(original.activities.length + 1);
    expect(duplicate.activities.at(-1)!.label).toContain('dashboards');
    expect(result.message).toContain('sin crear un duplicado');
    expect(JSON.stringify(initial)).toBe(before);
  });

  it('advances one selected opportunity through the pipeline and refreshes its next task', () => {
    let state = createInitialState();
    const id = state.leads[0].id;
    const original = state;
    for (const stage of ['contactado', 'propuesta', 'ganado']) {
      const previous = state;
      const previousLead = previous.leads.find(lead => lead.id === id)!;
      state = advanceLead(state, id);
      const advanced = state.leads.find(lead => lead.id === id)!;
      expect(advanced.stage).toBe(stage);
      expect(advanced.owner).toBe(previousLead.owner);
      expect(advanced.nextAction.label).not.toBe(previousLead.nextAction.label);
      expect(advanced.activities.length).toBe(previousLead.activities.length + 1);
      expect(previous.leads.find(lead => lead.id === id)!.stage).toBe(previousLead.stage);
      expect(state.leads[1]).toBe(previous.leads[1]);
    }
    expect(original.leads[0].stage).toBe('nuevo');
    const won = state;
    expect(advanceLead(state, id)).toBe(won);
    expect(advanceLead(state, 'missing-id')).toBe(won);
  });

  it('rejects invalid runtime values without changing state', () => {
    const state = createInitialState();
    const before = JSON.stringify(state);
    const invalidInputs: unknown[] = [
      null,
      { ...NEW_LEAD_EXAMPLE, name: '  ' },
      { ...NEW_LEAD_EXAMPLE, name: 'x'.repeat(81) },
      { ...NEW_LEAD_EXAMPLE, email: '' },
      { ...NEW_LEAD_EXAMPLE, email: 'sin-correo' },
      { ...NEW_LEAD_EXAMPLE, email: '.nombre@example.com' },
      { ...NEW_LEAD_EXAMPLE, email: 'a'.repeat(65) + '@example.com' },
      { ...NEW_LEAD_EXAMPLE, email: 'a@' + 'b'.repeat(64) + '.com' },
      { ...NEW_LEAD_EXAMPLE, email: 'a'.repeat(64) + '@' + ('b'.repeat(63) + '.').repeat(3) + 'com' },
      { ...NEW_LEAD_EXAMPLE, company: 'x'.repeat(121) },
      { ...NEW_LEAD_EXAMPLE, company: undefined },
      { ...NEW_LEAD_EXAMPLE, service: 'no-existe' },
      { ...NEW_LEAD_EXAMPLE, source: 'no-existe' }
    ];
    for (const input of invalidInputs) {
      expect(() => captureLead(state, input as CaptureInput)).toThrowError();
      expect(JSON.stringify(state)).toBe(before);
    }
  });

  it('resets all demo data with independent arrays, activities and tasks', () => {
    const first = createInitialState();
    const baseline = JSON.stringify(first);
    const populated = captureLead(first, NEW_LEAD_EXAMPLE).state;
    first.leads[0].activities[0].label = 'Changed outside the engine';
    first.leads[0].nextAction.label = 'Changed outside the engine';
    first.leads[0].name = 'Changed outside the engine';
    const fresh = createInitialState();

    expect(JSON.stringify(fresh)).toBe(baseline);
    expect(fresh.leads.length).toBe(4);
    expect(fresh.nextId).toBe(5);
    expect(fresh.leads).not.toBe(first.leads);
    expect(fresh.leads[0].activities).not.toBe(first.leads[0].activities);
    expect(fresh.leads[0].nextAction).not.toBe(first.leads[0].nextAction);
    expect(populated.leads.length).toBe(5);
  });
});
