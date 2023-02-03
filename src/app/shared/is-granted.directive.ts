import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService, Roles } from '@core/auth';
import { Subscription, tap } from 'rxjs';

// TODO: move it in core/auth, and use/test standalone property
@Directive({
  selector: '[appIsGranted]',
})
export class IsGrantedDirective implements OnDestroy {
  private subscription!: Subscription;
  private viewRef: EmbeddedViewRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    readonly templateRef: TemplateRef<any>,
    private auth: AuthService
  ) {}

  @Input() set appIsGranted(role: Roles) {
    this.subscription = this.auth
      .isGranted(role)
      .pipe(tap((isGranted) => isGranted && this.updateView()))
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
