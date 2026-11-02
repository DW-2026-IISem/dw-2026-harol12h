
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { SessionStore } from '../../core/services/session-store';

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermission {
  private readonly sessionStore = inject(SessionStore);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  readonly appHasPermission = input.required<string | string[]>();

  private visible = false;

  private readonly permissionEffect = effect(() => {
    const configured = this.appHasPermission();
    const requirements = Array.isArray(configured)
      ? configured
      : [configured];
    const allowed =
      !this.sessionStore.authEnabled ||
      (requirements.length > 0 &&
        requirements.every((requirement) => {
          const permission = requirement.trim();
          const separator = permission.indexOf(' ');
          if (separator < 1) {
            return false;
          }

          const method = permission.slice(0, separator);
          const path = permission.slice(separator + 1).trim();
          return (
            !!path && this.sessionStore.canPermission(method, path)
          );
        }));

    this.updateVisibility(allowed);
  });

  private updateVisibility(visible: boolean): void {
    if (visible === this.visible) {
      return;
    }

    this.visible = visible;
    this.viewContainer.clear();

    if (visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
