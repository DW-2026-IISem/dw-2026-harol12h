import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  imports: [ButtonModule, CardModule, RouterLink],
  selector: 'app-forbidden',
  styleUrl: './forbidden.css',
  templateUrl: './forbidden.html',
})
export class Forbidden {
  private readonly route = inject(ActivatedRoute);

  readonly permission = toSignal(
    this.route.queryParamMap.pipe(
      map((queryParams) => queryParams.get('permission')),
    ),
    { initialValue: null },
  );}
