import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';

import { toNumber } from '../../../core/models/api.model';
import type { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TagModule],
  templateUrl: './sale-detail.html',
})
export class SaleDetail {
  readonly sale = input.required<Sale>();

  amount(value: number | string): number {
    return toNumber(value);
  }
}
