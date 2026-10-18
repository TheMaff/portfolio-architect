export type DashboardStage = 'nuevo' | 'contactado' | 'propuesta' | 'ganado' | 'perdido';
export type DashboardOwner = 'sofia' | 'martin' | 'elena';
export type DashboardChannel = 'web' | 'referido' | 'alianzas';
export type DashboardPeriod = 'semestre' | 'q1' | 'q2' | 'junio';

export interface DashboardFilters {
  period: DashboardPeriod;
  owner: 'all' | DashboardOwner;
  channel: 'all' | DashboardChannel;
}

export interface DashboardOpportunity {
  readonly id: string;
  readonly company: string;
  readonly contact: string;
  readonly owner: DashboardOwner;
  readonly channel: DashboardChannel;
  readonly service: string;
  readonly stage: DashboardStage;
  readonly amount: number;
  readonly createdAt: string;
  readonly nextAction: string;
}

export const PERIOD_OPTIONS: readonly { value: DashboardPeriod; label: string }[] = [
  { value: 'semestre', label: 'Enero–junio 2026' },
  { value: 'q1', label: 'Enero–marzo 2026' },
  { value: 'q2', label: 'Abril–junio 2026' },
  { value: 'junio', label: 'Junio 2026' }
];

export const OWNER_OPTIONS: readonly { value: DashboardOwner; label: string }[] = [
  { value: 'sofia', label: 'Sofía' },
  { value: 'martin', label: 'Martín' },
  { value: 'elena', label: 'Elena' }
];

export const CHANNEL_OPTIONS: readonly { value: DashboardChannel; label: string }[] = [
  { value: 'web', label: 'Sitio web' },
  { value: 'referido', label: 'Referidos' },
  { value: 'alianzas', label: 'Alianzas' }
];

export const STAGE_OPTIONS: readonly { value: DashboardStage; label: string }[] = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'propuesta', label: 'Propuesta' },
  { value: 'ganado', label: 'Ganado' },
  { value: 'perdido', label: 'Perdido' }
];

export const DEFAULT_FILTERS: Readonly<DashboardFilters> = Object.freeze({
  period: 'semestre', owner: 'all', channel: 'all'
});

const PERIOD_MONTHS: Record<DashboardPeriod, readonly string[]> = {
  semestre: ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'],
  q1: ['2026-01', '2026-02', '2026-03'],
  q2: ['2026-04', '2026-05', '2026-06'],
  junio: ['2026-06']
};

const MONTH_LABELS: Record<string, string> = {
  '2026-01': 'Ene', '2026-02': 'Feb', '2026-03': 'Mar',
  '2026-04': 'Abr', '2026-05': 'May', '2026-06': 'Jun'
};

const NEXT_ACTIONS: Record<DashboardStage, string> = {
  nuevo: 'Revisar la consulta y asignar primer contacto',
  contactado: 'Confirmar necesidades y agendar diagnóstico',
  propuesta: 'Dar seguimiento a la propuesta enviada',
  ganado: 'Coordinar el inicio del proyecto',
  perdido: 'Registrar el motivo y evaluar una futura revisión'
};

function opportunity(
  id: string, company: string, contact: string, owner: DashboardOwner,
  channel: DashboardChannel, service: string, stage: DashboardStage,
  amount: number, createdAt: string
): DashboardOpportunity {
  return Object.freeze({ id, company, contact, owner, channel, service, stage, amount, createdAt,
    nextAction: NEXT_ACTIONS[stage] });
}

// Synthetic opportunities only. The fixed snapshot avoids personal data and live CRM connections.
export const OPPORTUNITIES: readonly DashboardOpportunity[] = Object.freeze([
  opportunity('op-01', 'Norte Estudio', 'Camila Torres', 'sofia', 'web', 'Automatización', 'ganado', 1200000, '2026-01-01'),
  opportunity('op-02', 'Bosque Consultora', 'Diego Fuentes', 'martin', 'referido', 'CRM', 'ganado', 2100000, '2026-01-08'),
  opportunity('op-03', 'Aurora Logística', 'Valentina Ríos', 'elena', 'web', 'Integraciones', 'perdido', 1800000, '2026-01-15'),
  opportunity('op-04', 'Faro Operaciones', 'Tomás Molina', 'sofia', 'alianzas', 'Dashboards', 'propuesta', 3200000, '2026-01-22'),
  opportunity('op-05', 'Horizonte Estudio', 'Laura Vega', 'martin', 'web', 'Automatización', 'contactado', 950000, '2026-01-31'),
  opportunity('op-06', 'Bruma Servicios', 'Mateo Silva', 'sofia', 'referido', 'CRM', 'ganado', 1450000, '2026-02-01'),
  opportunity('op-07', 'Cauce Digital', 'Daniela Soto', 'martin', 'alianzas', 'Integraciones', 'perdido', 2300000, '2026-02-07'),
  opportunity('op-08', 'Prisma Gestión', 'Nicolás Vera', 'elena', 'web', 'Dashboards', 'ganado', 2600000, '2026-02-14'),
  opportunity('op-09', 'Ladera Equipos', 'Florencia León', 'elena', 'referido', 'Automatización', 'propuesta', 1700000, '2026-02-21'),
  opportunity('op-10', 'Cumbre Oficina', 'Benjamín Pino', 'sofia', 'web', 'CRM', 'nuevo', 850000, '2026-02-28'),
  opportunity('op-11', 'Surco Comercial', 'Antonia Reyes', 'martin', 'web', 'Integraciones', 'ganado', 1800000, '2026-03-01'),
  opportunity('op-12', 'Nexo Taller', 'Joaquín Vidal', 'sofia', 'alianzas', 'Dashboards', 'ganado', 3500000, '2026-03-08'),
  opportunity('op-13', 'Savia Proyectos', 'Emilia Campos', 'elena', 'referido', 'Automatización', 'perdido', 1250000, '2026-03-15'),
  opportunity('op-14', 'Costa Asesorías', 'Vicente Lara', 'martin', 'referido', 'CRM', 'propuesta', 2700000, '2026-03-22'),
  opportunity('op-15', 'Trama Sistemas', 'Isidora Ruiz', 'sofia', 'web', 'Integraciones', 'contactado', 1100000, '2026-03-31'),
  opportunity('op-16', 'Marea Estudio', 'Gabriel Peña', 'elena', 'web', 'Dashboards', 'ganado', 2900000, '2026-04-01'),
  opportunity('op-17', 'Pórtico Soluciones', 'Amanda López', 'martin', 'alianzas', 'Automatización', 'ganado', 3800000, '2026-04-08'),
  opportunity('op-18', 'Ronda Gestión', 'Lucas Flores', 'sofia', 'referido', 'CRM', 'perdido', 950000, '2026-04-15'),
  opportunity('op-19', 'Vértice Equipo', 'Julieta Pérez', 'elena', 'referido', 'Integraciones', 'contactado', 1900000, '2026-04-22'),
  opportunity('op-20', 'Río Consultores', 'Agustín Mora', 'sofia', 'web', 'Dashboards', 'nuevo', 1250000, '2026-04-30'),
  opportunity('op-21', 'Alto Servicios', 'Elisa Figueroa', 'sofia', 'web', 'Automatización', 'ganado', 2250000, '2026-05-01'),
  opportunity('op-22', 'Punto Operaciones', 'Simón Castro', 'martin', 'referido', 'CRM', 'perdido', 1600000, '2026-05-08'),
  opportunity('op-23', 'Sendero Logística', 'Renata Muñoz', 'elena', 'web', 'Integraciones', 'propuesta', 3100000, '2026-05-15'),
  opportunity('op-24', 'Órbita Comercial', 'Bruno Aguilar', 'sofia', 'alianzas', 'Dashboards', 'contactado', 2450000, '2026-05-22'),
  opportunity('op-25', 'Enlace Oficina', 'Trinidad Rojas', 'martin', 'web', 'Automatización', 'nuevo', 1350000, '2026-05-31'),
  opportunity('op-26', 'Puente Digital', 'Alonso Navarro', 'martin', 'alianzas', 'CRM', 'ganado', 4200000, '2026-06-01'),
  opportunity('op-27', 'Claro Proyectos', 'Josefina Díaz', 'sofia', 'referido', 'Integraciones', 'ganado', 1750000, '2026-06-08'),
  opportunity('op-28', 'Duna Consultora', 'Santiago Araya', 'elena', 'web', 'Dashboards', 'perdido', 2200000, '2026-06-15'),
  opportunity('op-29', 'Eje Equipos', 'Maite Cortés', 'martin', 'web', 'Automatización', 'propuesta', 2800000, '2026-06-22'),
  opportunity('op-30', 'Brote Servicios', 'Rafael Espinoza', 'elena', 'referido', 'CRM', 'nuevo', 1050000, '2026-06-30')
]);

export function filterOpportunities(
  rows: readonly DashboardOpportunity[], filters: Readonly<DashboardFilters>
): DashboardOpportunity[] {
  const months = PERIOD_MONTHS[filters.period];
  return rows.filter(row => months.includes(row.createdAt.slice(0, 7))
    && (filters.owner === 'all' || row.owner === filters.owner)
    && (filters.channel === 'all' || row.channel === filters.channel));
}

export function summarizeDashboard(rows: readonly DashboardOpportunity[]) {
  const won = rows.filter(row => row.stage === 'ganado');
  const lostCount = rows.filter(row => row.stage === 'perdido').length;
  const open = rows.filter(row => row.stage !== 'ganado' && row.stage !== 'perdido');
  const closedCount = won.length + lostCount;
  return {
    total: rows.length,
    wonValue: won.reduce((total, row) => total + row.amount, 0),
    openValue: open.reduce((total, row) => total + row.amount, 0),
    winRate: closedCount ? won.length / closedCount * 100 : null,
    wonCount: won.length,
    lostCount,
    openCount: open.length
  };
}

// Each bucket is the opportunity's entry month, not its closing or payment date.
export function monthlySales(rows: readonly DashboardOpportunity[], period: DashboardPeriod) {
  return PERIOD_MONTHS[period].map(key => ({
    key,
    label: MONTH_LABELS[key],
    wonValue: rows.filter(row => row.stage === 'ganado' && row.createdAt.slice(0, 7) === key)
      .reduce((total, row) => total + row.amount, 0)
  }));
}

export function stageBreakdown(rows: readonly DashboardOpportunity[]) {
  return STAGE_OPTIONS.map(({ value: stage, label }) => {
    const matching = rows.filter(row => row.stage === stage);
    return { stage, label, count: matching.length,
      amount: matching.reduce((total, row) => total + row.amount, 0) };
  });
}

export function channelBreakdown(rows: readonly DashboardOpportunity[]) {
  return CHANNEL_OPTIONS.map(({ value: channel, label }) => {
    const summary = summarizeDashboard(rows.filter(row => row.channel === channel));
    return { channel, label, total: summary.total, wonCount: summary.wonCount,
      wonValue: summary.wonValue, winRate: summary.winRate };
  });
}
