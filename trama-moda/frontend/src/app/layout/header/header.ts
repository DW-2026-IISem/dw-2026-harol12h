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
  readonly userName = input<string | null>(null);
  readonly userEmail = input<string | null>(null);
  readonly initials = input('');
  readonly menuRequested = output<void>();
  readonly profileRequested = output<void>();
  readonly refreshPermissionsRequested = output<void>();
  readonly refreshingPermissions = input(false);
  readonly logoutRequested = output<void>();
}
