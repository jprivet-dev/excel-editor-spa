import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  success(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-success text-light' });
  }

  danger(textOrTpl: string | TemplateRef<any>) {
    this.show(textOrTpl, { classname: 'bg-danger text-light' });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
