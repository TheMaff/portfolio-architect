import {
  CHANNEL_OPTIONS, DEFAULT_FILTERS, DashboardFilters, DashboardOpportunity,
  OPPORTUNITIES, OWNER_OPTIONS, PERIOD_OPTIONS, STAGE_OPTIONS,
  channelBreakdown, filterOpportunities, monthlySales, stageBreakdown, summarizeDashboard
} from './dashboard-data';

describe('Commercial dashboard data', () => {
  it('has a fixed, unique synthetic fixture with valid CLP amounts and semester dates', () => {
    expect(OPPORTUNITIES.length).toBe(30);
    expect(new Set(OPPORTUNITIES.map(row => row.id)).size).toBe(OPPORTUNITIES.length);
    expect(OPPORTUNITIES.every(row => Number.isInteger(row.amount) && row.amount > 0)).toBeTrue();
    expect(OPPORTUNITIES.every(row => /^2026-0[1-6]-\d{2}$/.test(row.createdAt))).toBeTrue();
    expect(filterOpportunities(OPPORTUNITIES, DEFAULT_FILTERS)).toEqual(OPPORTUNITIES);
  });

  it('partitions Q1 and Q2 on the exact inclusive entry-date boundaries', () => {
    const q1 = filterOpportunities(OPPORTUNITIES, { ...DEFAULT_FILTERS, period: 'q1' });
    const q2 = filterOpportunities(OPPORTUNITIES, { ...DEFAULT_FILTERS, period: 'q2' });
    const june = filterOpportunities(OPPORTUNITIES, { ...DEFAULT_FILTERS, period: 'junio' });
    expect(q1.length).toBe(15);
    expect(q2.length).toBe(15);
    expect(q1[0].createdAt).toBe('2026-01-01');
    expect(q1[q1.length - 1].createdAt).toBe('2026-03-31');
    expect(q2[0].createdAt).toBe('2026-04-01');
    expect(q2[q2.length - 1].createdAt).toBe('2026-06-30');
    expect([...q1, ...q2]).toEqual(OPPORTUNITIES);
    expect(june.length).toBe(5);
    expect(june.every(row => row.createdAt.startsWith('2026-06-'))).toBeTrue();

    const outside: DashboardOpportunity[] = [
      { ...OPPORTUNITIES[0], id: 'before', createdAt: '2025-12-31' },
      { ...OPPORTUNITIES[0], id: 'after', createdAt: '2026-07-01' }
    ];
    expect(filterOpportunities(outside, DEFAULT_FILTERS)).toEqual([]);
  });

  it('combines owner, channel and period filters using AND', () => {
    const rows = filterOpportunities(OPPORTUNITIES, { period: 'q2', owner: 'sofia', channel: 'web' });
    expect(rows.map(row => row.id)).toEqual(['op-20', 'op-21']);
    expect(filterOpportunities(OPPORTUNITIES, {
      period: 'semestre', owner: 'elena', channel: 'alianzas'
    })).toEqual([]);
  });

  it('separates won and open amounts and calculates conversion only from closed opportunities', () => {
    const summary = summarizeDashboard(OPPORTUNITIES);
    expect(summary).toEqual({
      total: 30, wonValue: 27550000, openValue: 24400000,
      wonCount: 11, lostCount: 6, openCount: 13,
      winRate: 11 / 17 * 100
    });
    const openOnly = OPPORTUNITIES.filter(row => row.stage === 'nuevo');
    expect(summarizeDashboard(openOnly).winRate).toBeNull();
    expect(summarizeDashboard(OPPORTUNITIES.filter(row => row.stage === 'perdido')).winRate).toBe(0);
    expect(summarizeDashboard(OPPORTUNITIES.filter(row => row.stage === 'ganado')).winRate).toBe(100);
  });

  it('keeps entry-month buckets, including months with no won opportunities', () => {
    expect(monthlySales(OPPORTUNITIES, 'semestre').map(month => month.wonValue))
      .toEqual([3300000, 4050000, 5300000, 6700000, 2250000, 5950000]);
    const elenaWeb = filterOpportunities(OPPORTUNITIES, {
      period: 'semestre', owner: 'elena', channel: 'web'
    });
    expect(monthlySales(elenaWeb, 'semestre').map(month => month.wonValue))
      .toEqual([0, 2600000, 0, 2900000, 0, 0]);
    expect(monthlySales(OPPORTUNITIES, 'q1').map(month => month.key))
      .toEqual(['2026-01', '2026-02', '2026-03']);
    expect(monthlySales(OPPORTUNITIES, 'q2').map(month => month.key))
      .toEqual(['2026-04', '2026-05', '2026-06']);
    expect(monthlySales(OPPORTUNITIES, 'junio'))
      .toEqual([{ key: '2026-06', label: 'Jun', wonValue: 5950000 }]);
  });

  it('returns useful zero and null values for an empty selection', () => {
    expect(summarizeDashboard([])).toEqual({
      total: 0, wonValue: 0, openValue: 0, wonCount: 0, lostCount: 0, openCount: 0, winRate: null
    });
    expect(monthlySales([], 'q2').map(month => month.wonValue)).toEqual([0, 0, 0]);
    expect(stageBreakdown([]).length).toBe(STAGE_OPTIONS.length);
    expect(stageBreakdown([]).every(stage => stage.count === 0 && stage.amount === 0)).toBeTrue();
    expect(channelBreakdown([]).every(channel =>
      channel.total === 0 && channel.wonCount === 0 && channel.wonValue === 0 && channel.winRate === null
    )).toBeTrue();
  });

  it('reconciles every filter combination across summary, months, stages and channels', () => {
    for (const { value: period } of PERIOD_OPTIONS) {
      for (const owner of ['all', ...OWNER_OPTIONS.map(option => option.value)] as DashboardFilters['owner'][]) {
        for (const channel of ['all', ...CHANNEL_OPTIONS.map(option => option.value)] as DashboardFilters['channel'][]) {
          const rows = filterOpportunities(OPPORTUNITIES, { period, owner, channel });
          const summary = summarizeDashboard(rows);
          const stages = stageBreakdown(rows);
          const channels = channelBreakdown(rows);
          expect(stages.reduce((total, stage) => total + stage.count, 0)).toBe(summary.total);
          expect(channels.reduce((total, item) => total + item.total, 0)).toBe(summary.total);
          expect(channels.reduce((total, item) => total + item.wonValue, 0)).toBe(summary.wonValue);
          expect(monthlySales(rows, period).reduce((total, month) => total + month.wonValue, 0))
            .toBe(summary.wonValue);
          expect(summary.openCount + summary.wonCount + summary.lostCount).toBe(summary.total);
          expect(stages.find(stage => stage.stage === 'ganado')?.amount).toBe(summary.wonValue);
          expect(stages.filter(stage => ['nuevo', 'contactado', 'propuesta'].includes(stage.stage))
            .reduce((total, stage) => total + stage.amount, 0)).toBe(summary.openValue);
          expect(summary.winRate === null || Number.isFinite(summary.winRate)).toBeTrue();
        }
      }
    }
  });

  it('leaves fixture rows and filter defaults unchanged after filtering and aggregation', () => {
    const before = JSON.stringify(OPPORTUNITIES);
    const filters: DashboardFilters = { period: 'q2', owner: 'martin', channel: 'all' };
    const rows = filterOpportunities(OPPORTUNITIES, filters);
    rows.reverse();
    summarizeDashboard(rows);
    monthlySales(rows, filters.period);
    stageBreakdown(rows);
    channelBreakdown(rows);
    expect(JSON.stringify(OPPORTUNITIES)).toBe(before);
    expect(filters).toEqual({ period: 'q2', owner: 'martin', channel: 'all' });
    expect(DEFAULT_FILTERS).toEqual({ period: 'semestre', owner: 'all', channel: 'all' });
    expect(Object.isFrozen(OPPORTUNITIES)).toBeTrue();
    expect(OPPORTUNITIES.every(Object.isFrozen)).toBeTrue();
  });
});
