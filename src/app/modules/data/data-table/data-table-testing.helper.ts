import { of } from 'rxjs';
import { DataTableService } from './data-table.service';

export class DataTableServiceStub implements Partial<DataTableService> {
  load() {
    return of();
  }
}
