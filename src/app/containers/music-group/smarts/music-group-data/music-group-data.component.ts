import { Component, OnDestroy } from '@angular/core';
import { MusicGroupDataService } from '@shared/services/music-group-data.service';
import { Subscription } from 'rxjs';
import { MusicGroupData } from '@shared/music-group-data.model';
import { ToastService } from '@shared/services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MusicGroupDataModalComponent } from '@containers/music-group/smarts/music-group-data-modal/music-group-data-modal.component';

@Component({
  selector: 'app-music-group-data',
  templateUrl: './music-group-data.component.html',
  styleUrls: ['./music-group-data.component.scss'],
})
export class MusicGroupDataComponent implements OnDestroy {
  readonly data$ = this.dataService.data$;
  private deleteSubscription: Subscription = new Subscription();

  constructor(
    private dataService: MusicGroupDataService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  year(date: string): string {
    return date ? date : '';
  }

  membres(membres: number): string {
    return membres > 0 ? membres.toString() : '';
  }

  delete(data: MusicGroupData): void {
    if (confirm(`Souhaitez-vous supprimer le groupe "${data.nomDuGroupe}" ?`)) {
      this.deleteSubscription = this.dataService.delete(data).subscribe(() => {
        this.toastService.success(
          `Le groupe "${data.nomDuGroupe}" a été supprimé.`
        );
      });
    }
  }

  update(data: MusicGroupData): void {
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
