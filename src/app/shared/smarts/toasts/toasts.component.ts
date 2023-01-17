import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: {
    class: 'toast-container position-fixed bottom-0 start-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsComponent {
  // TODO: Ce composant pourrait être placé plutôt dans le dossier core.

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
