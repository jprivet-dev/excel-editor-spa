import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {}
