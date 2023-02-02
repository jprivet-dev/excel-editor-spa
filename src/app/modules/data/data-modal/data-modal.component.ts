import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Data } from '@shared/models';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.component.html',
  styleUrls: ['./data-modal.component.scss'],
})
export class DataModalComponent implements OnInit {
  // TODO: Nous avons là un composant hybride smart/presentational. Réfléchir à une approche plus propre entre la modal et le formulaire.

  @Input() data!: Data;
  updateMode: boolean = false;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.data) {
      this.updateMode = true;
    }
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(): void {
    this.activeModal.close();
  }
}
