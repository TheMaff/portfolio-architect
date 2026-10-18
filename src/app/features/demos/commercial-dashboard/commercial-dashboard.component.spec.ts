import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CommercialDashboardComponent } from './commercial-dashboard.component';

describe('CommercialDashboardComponent', () => {
  let fixture: ComponentFixture<CommercialDashboardComponent>;
  let component: CommercialDashboardComponent;
  let fetchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialDashboardComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(CommercialDashboardComponent);
    component = fixture.componentInstance;
    fetchSpy = spyOn(window, 'fetch');
    fixture.detectChanges();
  });

  function select(id: string, value: string): void {
    const control = fixture.nativeElement.querySelector('#' + id) as HTMLSelectElement;
    control.value = value;
    control.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();
  }

  function text(selector: string): string {
    return fixture.nativeElement.querySelector(selector).textContent;
  }

  it('starts with all fictional opportunities and explains the currency, period and metric definitions', () => {
    expect(text('h1')).toContain('Tu gestión comercial');
    expect(text('#dashboard-notice')).toContain('ficticios');
    expect(text('#dashboard-notice')).toContain('CLP');
    expect(text('#filters-help')).toContain('fecha de entrada');
    expect(fixture.nativeElement.querySelectorAll('[data-testid="opportunity-row"]').length).toBe(30);
    expect(text('[data-testid="kpi-total"]')).toBe('30');
    expect(text('[data-testid="kpi-won"]')).toBe(component.money(27550000));
    expect(text('[data-testid="kpi-open"]')).toBe(component.money(24400000));
    expect(text('[data-testid="kpi-rate"]')).toBe('64,7%');
    expect((fixture.nativeElement.querySelector('#dashboard-owner') as HTMLSelectElement).value).toBe('all');
    expect((fixture.nativeElement.querySelector('#dashboard-channel') as HTMLSelectElement).value).toBe('all');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('applies combined rendered filters to indicators, both charts, channels and the opportunity table', () => {
    select('dashboard-period', 'junio');
    select('dashboard-owner', 'martin');
    select('dashboard-channel', 'alianzas');

    expect(text('[data-testid="kpi-total"]')).toBe('1');
    expect(text('[data-testid="kpi-won"]')).toBe(component.money(4200000));
    expect(text('[data-testid="kpi-open"]')).toBe(component.money(0));
    expect(text('[data-testid="kpi-rate"]')).toBe('100%');
    const rows = fixture.nativeElement.querySelectorAll('[data-testid="opportunity-row"]');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Puente Digital');
    const monthlyList = fixture.nativeElement.querySelector('ul[aria-label="Valor ganado por mes, en pesos chilenos"]');
    expect(monthlyList.querySelectorAll('li').length).toBe(1);
    expect(monthlyList.textContent).toContain(component.money(4200000));
    expect(component.stages().find(stage => stage.stage === 'ganado')?.count).toBe(1);
    expect(component.stages().reduce((count, stage) => count + stage.count, 0)).toBe(1);
    expect(component.channels().find(channel => channel.channel === 'alianzas')?.wonValue).toBe(4200000);
    expect(component.channels().filter(channel => channel.channel !== 'alianzas').every(channel => channel.total === 0)).toBeTrue();

    select('dashboard-channel', 'all');
    expect(component.filters()).toEqual({ period: 'junio', owner: 'martin', channel: 'all' });
    expect(text('[data-testid="kpi-total"]')).toBe('2');
    select('dashboard-owner', 'all');
    expect(component.filters()).toEqual({ period: 'junio', owner: 'all', channel: 'all' });
    expect(text('[data-testid="kpi-total"]')).toBe('5');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows honest empty and zero-chart states, then restores every filter through the empty-state button', () => {
    select('dashboard-owner', 'elena');
    select('dashboard-channel', 'alianzas');

    expect(text('#empty-title')).toContain('No hay oportunidades');
    expect(text('[data-testid="kpi-total"]')).toBe('0');
    expect(text('[data-testid="kpi-rate"]')).toBe('Sin cierres');
    expect(fixture.nativeElement.querySelectorAll('[data-testid="opportunity-row"]').length).toBe(0);
    const bars = fixture.nativeElement.querySelectorAll('ul [style]') as NodeListOf<HTMLElement>;
    expect(bars.length).toBeGreaterThan(0);
    expect(Array.from(bars).every(bar => bar.style.width === '0%')).toBeTrue();

    const resetButton = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
      .find(button => button.textContent?.includes('Mostrar todos los datos'))!;
    resetButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#empty-title')).toBeNull();
    expect(text('[data-testid="kpi-total"]')).toBe('30');
    expect((fixture.nativeElement.querySelector('#dashboard-period') as HTMLSelectElement).value).toBe('semestre');
    expect((fixture.nativeElement.querySelector('#dashboard-owner') as HTMLSelectElement).value).toBe('all');
    expect((fixture.nativeElement.querySelector('#dashboard-channel') as HTMLSelectElement).value).toBe('all');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('opens a real row detail and clears that detail when filters exclude the opportunity', () => {
    const companyButton = fixture.nativeElement.querySelector('[aria-label="Ver oportunidad de Brote Servicios"]') as HTMLButtonElement;
    companyButton.click();
    fixture.detectChanges();

    expect(companyButton.getAttribute('aria-expanded')).toBe('true');
    expect(text('#dashboard-opportunity-detail')).toContain('Brote Servicios');
    expect(text('#dashboard-opportunity-detail')).toContain('Elena');
    expect(text('#dashboard-opportunity-detail')).toContain('CRM');
    expect(text('#dashboard-opportunity-detail')).toContain('Revisar la consulta y asignar primer contacto');
    expect(fixture.nativeElement.querySelector('a[href$="#dashboard-opportunity-detail"]')).toBeTruthy();

    select('dashboard-owner', 'sofia');
    expect(component.selectedId()).toBeNull();
    expect(component.selectedOpportunity()).toBeNull();
    expect(text('#dashboard-opportunity-detail')).toContain('Selecciona una empresa');
    expect(text('#dashboard-opportunity-detail')).not.toContain('Brote Servicios');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('keeps a valid selection through compatible filters and allows closing or resetting it', () => {
    component.selectOpportunity('op-26');
    select('dashboard-period', 'junio');
    expect(component.selectedOpportunity()?.company).toBe('Puente Digital');

    (fixture.nativeElement.querySelector('[aria-label="Cerrar ficha"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.selectedOpportunity()).toBeNull();

    component.selectOpportunity('op-26');
    const resetButton = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
      .find(button => button.textContent?.includes('Restablecer filtros'))!;
    resetButton.click();
    fixture.detectChanges();
    expect(component.selectedId()).toBeNull();
    expect(component.filters()).toEqual({ period: 'semestre', owner: 'all', channel: 'all' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('offers working links to the first demo and real contact without a submitting form', () => {
    expect(fixture.nativeElement.querySelector('a[href="/demos/seguimiento-comercial"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/#contacto"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('form')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-netlify]')).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
