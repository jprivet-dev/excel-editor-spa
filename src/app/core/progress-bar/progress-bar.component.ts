import { Component } from '@angular/core';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  host: { class: 'fixed-top' },
})
export class ProgressBarComponent {
  readonly isLoading$ = this.progressBar.isLoading$;
  constructor(private progressBar: ProgressBarService) {}
}
