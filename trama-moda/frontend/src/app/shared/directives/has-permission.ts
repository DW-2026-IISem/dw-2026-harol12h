
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

  readonly appHasPermission = input.required<string>();

  private visible = false;

  private readonly permissionEffect = effect(() => {
    const requirement = this.appHasPermission().trim();
    const separator = requirement.indexOf(' ');

    if (separator < 1) {
      this.updateVisibility(false);
      return;
    }

    const method = requirement.slice(0, separator).toUpperCase();
    const path = requirement.slice(separator + 1).trim();

    const allowed =
      !!path && this.sessionStore.canPermission(method, path);

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

