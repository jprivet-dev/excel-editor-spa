import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '@core/progress-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private progressBarSubscription!: Subscription;
  private loginSubscription!: Subscription;
  public form: FormGroup;
  readonly error$ = this.auth.error$;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private progressBar: ProgressBarService
  ) {
    this.progressBarSubscription = this.auth.isLoading$.subscribe((isLoading) =>
      isLoading ? this.progressBar.start() : this.progressBar.stop()
    );

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const values = this.form.value;

    if (values.username && values.password) {
      this.loginSubscription = this.auth.login(values).subscribe();
    }
  }

  ngOnDestroy() {
    this.progressBarSubscription && this.progressBarSubscription.unsubscribe();
    this.loginSubscription && this.loginSubscription.unsubscribe();
  }
}
