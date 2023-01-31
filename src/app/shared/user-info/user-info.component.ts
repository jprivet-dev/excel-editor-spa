import { Component } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  readonly user$ = this.auth.user$;
  constructor(private auth: AuthService) {}
}
