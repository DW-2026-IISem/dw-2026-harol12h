import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { NotificationService } from '../../../core/services/notification';
import { BranchApi } from '../branch-api';
import { BranchList } from './branch-list';

describe('BranchList', () => {
  let component: BranchList;
  let fixture: ComponentFixture<BranchList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchList],
      providers: [
        { provide: BranchApi, useValue: { list: () => of([]) } },
        { provide: NotificationService, useValue: { success: () => undefined } },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
