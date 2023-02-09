import { Component } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  isAuthenticated$ = this.auth.isAuthenticated$;

  constructor(private auth: AuthService) {}
}
