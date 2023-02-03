import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';
import { ToastService } from '@core/toasts/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Data } from '@shared/models';
import { Observable, Subscription, tap } from 'rxjs';
import { DataModalComponent } from '../data-modal/data-modal.component';
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
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.subscription.add(this.dataService.load().subscribe());
    this.subscription.add(this.iniDisplayedColumns().subscribe());
  }

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

  // TODO: to remove
  year(date: string): string {
    return date ? date : '';
  }

  membres(membres: number): string {
    return membres > 0 ? membres.toString() : '';
  }

  delete(data: Data): void {
    if (confirm(`Souhaitez-vous supprimer le groupe "${data.nomDuGroupe}" ?`)) {
      this.subscription.add(
        this.dataService.delete(data).subscribe(() => {
          this.toastService.success(
            `Le groupe "${data.nomDuGroupe}" a été supprimé.`
          );
        })
      );
    }
  }

  update(data: Data): void {
    const modalRef = this.modalService.open(DataModalComponent);
    modalRef.componentInstance.data = data;
  }

  open(): void {
    const modalRef = this.modalService.open(DataModalComponent);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
