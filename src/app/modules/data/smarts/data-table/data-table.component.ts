import { Component, OnDestroy } from '@angular/core';
import { ToastService } from '@core/toasts/toast.service';
import { MusicGroupDataModalComponent } from '@modules/data/smarts/music-group-data-modal/music-group-data-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataTable } from './data-table.model';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-music-group-data',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnDestroy {
  readonly data$ = this.dataService.data$;
  private deleteSubscription: Subscription = new Subscription();

  constructor(
    private dataService: DataTableService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

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
    const modalRef = this.modalService.open(MusicGroupDataModalComponent);
    modalRef.componentInstance.data = data;
  }

  open(): void {
    const modalRef = this.modalService.open(MusicGroupDataModalComponent);
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
  }
}
