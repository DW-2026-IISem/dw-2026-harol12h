import { TestBed } from '@angular/core/testing';
import { Construir } from './construir';

describe('Construir', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Construir],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Construir);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with the Inicio title', () => {
    const fixture = TestBed.createComponent(Construir);

    expect(fixture.componentInstance.title()).toBe('Inicio');
  });

  it('should update the title when an option is selected', () => {
    const fixture = TestBed.createComponent(Construir);
    const component = fixture.componentInstance;

    component.seleccionar('Clientes');

    expect(component.title()).toBe('Clientes');
  });

  it('should close the mobile menu when an option is selected', () => {
    const fixture = TestBed.createComponent(Construir);
    const component = fixture.componentInstance;

    component.mobileOpen.set(true);
    component.seleccionar('Productos');

    expect(component.mobileOpen()).toBe(false);
    expect(component.title()).toBe('Productos');
  });

  it('should open the mobile menu when the menu button is pressed on a narrow viewport', () => {
    const fixture = TestBed.createComponent(Construir);
    const component = fixture.componentInstance;

    component.onMenuToggle();

    expect(component.mobileOpen()).toBe(true);
  });
});
