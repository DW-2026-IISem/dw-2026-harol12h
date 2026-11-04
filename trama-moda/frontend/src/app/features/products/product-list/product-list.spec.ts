import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { NotificationService } from '../../../core/services/notification';
import { CategoryApi } from '../../categories/category-api';
import { ProductApi } from '../product-api';
import { ProductList } from './product-list';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        { provide: ProductApi, useValue: { list: () => of([]) } },
        { provide: CategoryApi, useValue: { list: () => of([]) } },
        { provide: NotificationService, useValue: { success: () => undefined } },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
