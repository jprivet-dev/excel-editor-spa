import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@shared/models';
import { DataTableService } from '../data-table/data-table.service';
import { Subscription, tap } from 'rxjs';
import { SnackBarService } from '@core/snack-bar';

@Component({
  selector: 'app-data-dialog-delete',
  templateUrl: './data-dialog-delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDialogDeleteComponent implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DataDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: Data },
    private dataService: DataTableService,
    private snackBar: SnackBarService
  ) {}

  delete(): void {
    const data = this.dialogData.data;
    this.subscription = this.dataService
      .delete(data)
      .pipe(
        tap(() => {
          this.dialogRef.close();
          this.snackBar.success(
            `Le groupe "${data.nomDuGroupe}" a été supprimé.`
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }
}
