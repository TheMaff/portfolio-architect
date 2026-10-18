import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CHANNEL_OPTIONS,
  channelBreakdown,
  DashboardFilters,
  DashboardOpportunity,
  DEFAULT_FILTERS,
  filterOpportunities,
  monthlySales,
  OPPORTUNITIES,
  OWNER_OPTIONS,
  PERIOD_OPTIONS,
  stageBreakdown,
  STAGE_OPTIONS,
  summarizeDashboard
} from './dashboard-data';

@Component({
  selector: 'app-commercial-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './commercial-dashboard.component.html'
})
export class CommercialDashboardComponent {
  readonly periodOptions = PERIOD_OPTIONS;
  readonly ownerOptions = [{ value: 'all' as const, label: 'Todos los responsables' }, ...OWNER_OPTIONS];
  readonly channelOptions = [{ value: 'all' as const, label: 'Todos los canales' }, ...CHANNEL_OPTIONS];
  readonly filters = signal<DashboardFilters>({ ...DEFAULT_FILTERS });
  readonly selectedId = signal<string | null>(null);
  readonly rows = computed(() => [...filterOpportunities(OPPORTUNITIES, this.filters())]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt) || left.id.localeCompare(right.id)));
  readonly summary = computed(() => summarizeDashboard(this.rows()));
  readonly months = computed(() => monthlySales(this.rows(), this.filters().period));
  readonly stages = computed(() => stageBreakdown(this.rows()));
  readonly channels = computed(() => channelBreakdown(this.rows()));
  readonly maxMonthlyValue = computed(() => Math.max(0, ...this.months().map(month => month.wonValue)));
  readonly maxStageCount = computed(() => Math.max(0, ...this.stages().map(stage => stage.count)));
  readonly selectedOpportunity = computed(() => this.rows().find(row => row.id === this.selectedId()) ?? null);

  private readonly moneyFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  private readonly percentageFormatter = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 });
  private readonly dateFormatter = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

  updateFilter(key: keyof DashboardFilters, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const options = key === 'period' ? this.periodOptions : key === 'owner' ? this.ownerOptions : this.channelOptions;
    if (!options.some(option => option.value === value)) return;
    this.filters.update(filters => ({ ...filters, [key]: value } as DashboardFilters));
    if (!this.rows().some(row => row.id === this.selectedId())) this.selectedId.set(null);
  }

  reset(): void {
    this.filters.set({ ...DEFAULT_FILTERS });
    this.selectedId.set(null);
  }

  selectOpportunity(id: string): void {
    this.selectedId.set(this.selectedId() === id ? null : id);
  }

  money(value: number): string {
    return this.moneyFormatter.format(value);
  }

  percentage(value: number | null): string {
    return value === null ? 'Sin cierres' : this.percentageFormatter.format(value) + '%';
  }

  date(value: string): string {
    return this.dateFormatter.format(new Date(value + 'T00:00:00Z'));
  }

  barWidth(value: number, maximum: number): number {
    return maximum > 0 ? value / maximum * 100 : 0;
  }

  ownerLabel(value: DashboardOpportunity['owner']): string {
    return this.ownerOptions.find(option => option.value === value)?.label ?? value;
  }

  channelLabel(value: DashboardOpportunity['channel']): string {
    return this.channelOptions.find(option => option.value === value)?.label ?? value;
  }

  stageLabel(value: DashboardOpportunity['stage']): string {
    return STAGE_OPTIONS.find(option => option.value === value)?.label ?? value;
  }
}
