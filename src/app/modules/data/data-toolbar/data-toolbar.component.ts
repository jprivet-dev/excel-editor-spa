import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/auth';
import { DataDialogUploadComponent } from '../data-dialog-upload';

@Component({
  selector: 'app-data-toolbar',
  templateUrl: './data-toolbar.component.html',
  styleUrls: ['./data-toolbar.component.scss'],
})
export class DataToolbarComponent {
  readonly user$ = this.auth.user$;

  constructor(private auth: AuthService, public dialog: MatDialog) {}

  logout(): void {
    this.auth.logout();
  }

  upload(): void {
    this.dialog.open(DataDialogUploadComponent);
  }
}
