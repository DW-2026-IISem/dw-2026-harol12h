import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { CategoryApi } from '../categories/category-api';
import { ClientApi } from '../clients/client-api';
import { ProductApi } from '../products/product-api';
import { SaleApi } from '../sales/sale-api';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let saleApi: { list: ReturnType<typeof vi.fn> };
  let saleCatalog: { catalog: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    const clientApi = {
      list: vi.fn(() =>
        of([
          { id: 1, nombre: 'Cliente activo', status: 'active' },
          { id: 2, nombre: 'Cliente inactivo', status: 'inactive' },
        ]),
      ),
    };
    const categoryApi = {
      list: vi.fn(() =>
        of([
          { id: 1, name: 'Activa', is_active: true },
          { id: 2, name: 'Inactiva', is_active: false },
        ]),
      ),
    };
    const productApi = {
      list: vi.fn(() =>
        of([
          { id: 1, nombre: 'Producto activo', status: 'active' },
          { id: 2, nombre: 'Producto inactivo', status: 'inactive' },
        ]),
      ),
    };
    saleApi = {
      list: vi.fn(() =>
        of([
          { id: 1, client_id: 1, monto_total: '100', status: 'active' },
          { id: 2, client_id: 1, monto_total: '500', status: 'inactive' },
        ]),
      ),
    };
    saleCatalog = {
      catalog: vi.fn(() =>
        of([
          {
            variantId: 1,
            branchId: 1,
            stock: 5,
            available: true,
            variant: { id: 1, nombre: 'M' },
            branch: { id: 1, nombre: 'Centro' },
            product: { id: 1, nombre: 'Producto', precio: 100 },
          },
          {
            variantId: 2,
            branchId: 1,
            stock: 12,
            available: true,
            variant: { id: 2, nombre: 'L' },
            branch: { id: 1, nombre: 'Centro' },
            product: { id: 1, nombre: 'Producto', precio: 100 },
          },
        ]),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: ClientApi, useValue: clientApi },
        { provide: CategoryApi, useValue: categoryApi },
        { provide: ProductApi, useValue: productApi },
        {
          provide: SaleApi,
          useValue: {
            list: saleApi.list,
            catalog: saleCatalog.catalog,
          },
        },
        { provide: Router, useValue: { navigateByUrl: vi.fn() } },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();
  });

  it('loads active KPIs and recalculates revenue and low stock after refresh', () => {
    const dashboard = fixture.componentInstance;

    expect(dashboard.error()).toBe('');
    expect(dashboard.clients()).toHaveLength(1);
    expect(dashboard.categories()).toHaveLength(1);
    expect(dashboard.products()).toHaveLength(1);
    expect(dashboard.sales()).toHaveLength(1);
    expect(dashboard.revenue()).toBe(100);
    expect(dashboard.lowStock().map((item) => item.stock)).toEqual([5]);

    saleApi.list.mockReturnValue(
      of([{ id: 3, client_id: 1, monto_total: '250', status: 'active' }]),
    );
    saleCatalog.catalog.mockReturnValue(
      of([
        {
          variantId: 3,
          branchId: 1,
          stock: 2,
          available: true,
          variant: { id: 3, nombre: 'S' },
          branch: { id: 1, nombre: 'Centro' },
          product: { id: 1, nombre: 'Producto', precio: 100 },
        },
      ]),
    );

    dashboard.load();

    expect(dashboard.error()).toBe('');
    expect(dashboard.revenue()).toBe(250);
    expect(dashboard.lowStock().map((item) => item.stock)).toEqual([2]);
    expect(dashboard.latestSales().map((sale) => sale.id)).toEqual([3]);
  });
});
