import { Component } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-data-toolbar',
  templateUrl: './data-toolbar.component.html',
  styleUrls: ['./data-toolbar.component.scss'],
})
export class DataToolbarComponent {
  readonly user$ = this.auth.user$;

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}
