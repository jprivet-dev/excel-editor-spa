import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private subscription!: Subscription;
  public form: FormGroup;
  readonly isLoading$ = this.auth.isLoading$;
  readonly error$ = this.auth.error$;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const values = this.form.value;

    if (values.username && values.password) {
      this.subscription = this.auth.login(values).subscribe();
    }
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
