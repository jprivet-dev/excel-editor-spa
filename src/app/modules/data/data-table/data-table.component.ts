import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@core/toasts/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { DataTable } from './data-table.model';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnDestroy {
  readonly displayedColumns = ['nomDuGroupe'];

  readonly isLoading$ = this.dataService.isLoading$;
  readonly data$ = this.dataService.data$;
  readonly errorMessage$ = this.dataService.errorMessage$;

  private deleteSubscription: Subscription = new Subscription();
  private dataLoadSubscription: Subscription = new Subscription();

  constructor(
    private dataService: DataTableService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // TODO: do not use subscription
    this.dataLoadSubscription = this.dataService.load().subscribe();
  }

  // TODO: to remove
  year(date: string): string {
    return date ? date : '';
  }

  membres(membres: number): string {
    return membres > 0 ? membres.toString() : '';
  }

  delete(data: DataTable): void {
    if (confirm(`Souhaitez-vous supprimer le groupe "${data.nomDuGroupe}" ?`)) {
      this.deleteSubscription = this.dataService.delete(data).subscribe(() => {
        this.toastService.success(
          `Le groupe "${data.nomDuGroupe}" a été supprimé.`
        );
      });
    }
  }

  update(data: DataTable): void {
    const modalRef = this.modalService.open(DataModalComponent);
    modalRef.componentInstance.data = data;
  }

  open(): void {
    const modalRef = this.modalService.open(DataModalComponent);
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
    this.dataLoadSubscription.unsubscribe();
  }
}
