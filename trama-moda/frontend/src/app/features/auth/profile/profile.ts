import { Component, inject, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Auth } from '../../../core/services/auth';
import { NotificationService } from '../../../core/services/notification';
import { SessionStore } from '../../../core/services/session-store';

@Component({
  standalone: true,
  imports: [ButtonModule, CardModule, TableModule, ToastModule],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  private readonly auth = inject(Auth);
  private readonly store = inject(SessionStore);
  private readonly notifications = inject(NotificationService);

  readonly logoutRequested = output<void>();
  readonly profile = this.store.profile;
  readonly permissions = this.store.permissions;
  readonly loading = signal(false);

  refresh(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.auth.loadAccess(true).subscribe({
      next: () => {
        this.loading.set(false);
        this.notifications.success(
          'Sesión actualizada',
          'El perfil y los permisos efectivos se consultaron nuevamente.',
        );
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
