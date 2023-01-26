import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Roles, UserService } from '@core/auth';
import { filter, map, tap } from 'rxjs';

@Directive({
  selector: '[appIsGranted]',
})
export class IsGrantedDirective {
  private viewRef: EmbeddedViewRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    readonly templateRef: TemplateRef<any>,
    private userService: UserService
  ) {}

  @Input() set appIsGranted(role: Roles) {
    this.userService
      .retrieveUser()
      .pipe(
        map((user) => this.userService.hasRole(role)),
        filter((hasRole) => hasRole),
        tap((isGranted) => this.updateView())
      )
      .subscribe();
  }

  private updateView() {
    if (this.viewRef) {
      return;
    }

    this.viewContainerRef.clear();

    if (this.templateRef) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
