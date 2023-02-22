import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Roles } from './auth.models';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appIsGranted]',
  standalone: true,
})
export class IsGrantedDirective implements OnDestroy {
  private subscription!: Subscription;
  private embeddedViewRef: EmbeddedViewRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    readonly templateRef: TemplateRef<any>,
    private auth: AuthService
  ) {}

  @Input() set appIsGranted(role: Roles) {
    this.subscription = this.auth
      .isGranted(role)
      .pipe(tap((isGranted) => this.updateView(isGranted)))
      .subscribe();
  }

  private updateView(isGranted: boolean) {
    if (isGranted && !this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
        this.templateRef
      );
    } else if (!isGranted && this.embeddedViewRef) {
      this.viewContainerRef.clear();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
