import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { class: 'block' },
})
export class Header {
  readonly appName = input('TramaModa');
  readonly menuRequested = output<void>();
}
