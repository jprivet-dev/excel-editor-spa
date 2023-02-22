import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@core/auth';
import { SnackBarService } from '@core/snack-bar';
import { Data } from '@shared/models';
import { Observable, Subscription, tap } from 'rxjs';
import { DataDialogEditComponent } from '../data-dialog-edit';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  readonly isLoading$ = this.dataService.isLoading$;
  readonly data$ = this.dataService.data$;
  readonly errorMessage$ = this.dataService.errorMessage$;
  readonly displayedColumns$ = this.dataService.displayedColumns$;

  constructor(
    private auth: AuthService,
    private dataService: DataTableService,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription.add(this.dataService.load().subscribe());
    this.subscription.add(this.iniDisplayedColumns().subscribe());
  }

  /**
   * Choice of the table columns to display,
   * according to the rights of the user.
   */
  private iniDisplayedColumns(): Observable<boolean> {
    return this.auth
      .isGranted('ROLE_ADMIN')
      .pipe(
        tap((isGranted) =>
          isGranted
            ? this.dataService.displayedColumnsWithActions()
            : this.dataService.displayedColumnsWithoutActions()
        )
      );
  }

  delete(data: Data): void {
    if (confirm(`Souhaitez-vous supprimer le groupe "${data.nomDuGroupe}" ?`)) {
      this.subscription.add(
        this.dataService.delete(data).subscribe(() => {
          this.snackBar.success(
            `Le groupe "${data.nomDuGroupe}" a été supprimé.`
          );
        })
      );
    }
  }

  update(data: Data): void {
    this.dialog.open(DataDialogEditComponent, {
      // Beware of the confusion between the "dialog" data
      // and the "excel" data which have the same name.
      // data[of the dialog]: { id: data[of the excel element].id }
      data: { id: data.id },
    });
  }

  create(): void {
    this.dialog.open(DataDialogEditComponent, {
      // Beware of the confusion between the "dialog" data
      // and the "excel" data which have the same name.
      // data[of the dialog]: { id: data[of the excel element].id }
      data: { id: null },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
