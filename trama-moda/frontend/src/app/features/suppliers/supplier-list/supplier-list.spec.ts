import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { NotificationService } from '../../../core/services/notification';
import { SupplierApi } from '../supplier-api';
import { SupplierList } from './supplier-list';

describe('SupplierList', () => {
  let component: SupplierList;
  let fixture: ComponentFixture<SupplierList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierList],
      providers: [
        { provide: SupplierApi, useValue: { list: () => of([]) } },
        { provide: NotificationService, useValue: { success: () => undefined } },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
