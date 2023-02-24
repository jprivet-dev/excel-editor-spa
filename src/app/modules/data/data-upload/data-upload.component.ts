import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { DataUploadService } from './data-upload.service';
import { consoleDevMode } from '@core/utils';
import { DataUpload } from './data-upload.model';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent implements OnDestroy {
  private invalidMessageSubject = new BehaviorSubject<string | null>(null);
  readonly invalidMessage$ = this.invalidMessageSubject.asObservable();

  private uploadSubscription: Subscription = new Subscription();
  private dataLoadSubscription: Subscription = new Subscription();

  public results: DataUpload | null = null;

  constructor(
    private uploadService: DataUploadService,
    private dataService: DataTableService
  ) {}

  onFileSelected(file: File): void {
    this.invalidMessageSubject.next(null);

    this.uploadSubscription = this.uploadService.upload(file).subscribe(
      (response) => {
        consoleDevMode.log(
          'DataUploadComponent | onFileSelected() | response',
          response
        );

        this.results = response;

        this.loadData();
      },
      (error: HttpErrorResponse) => {
        this.invalidMessageSubject.next(error.error.message);
      }
    );
  }

  private loadData() {
    // TODO: do not use subscription
    this.dataLoadSubscription = this.dataService.load().subscribe();
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
    this.dataLoadSubscription.unsubscribe();
  }
}
