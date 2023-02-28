import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { DataUploadService } from './data-upload.service';
import { DataUpload } from './data-upload.model';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent implements OnDestroy {
  private updloadInProgressSubject = new BehaviorSubject<boolean>(false);
  updloadInProgress$ = this.updloadInProgressSubject.asObservable();

  private uploadSubscription: Subscription = new Subscription();
  private dataLoadSubscription: Subscription = new Subscription();

  public invalidMessage: string | null = null;
  public results: DataUpload | null = null;

  constructor(
    private uploadService: DataUploadService,
    private dataService: DataTableService
  ) {}

  onFileSelected(file: File): void {
    this.invalidMessage = null;
    this.results = null;
  }

  onSubmit(file: File): void {
    this.uploadStart();

    this.uploadSubscription = this.uploadService
      .upload(file)
      .pipe(
        tap(
          (response) => {
            console.log(
              'DataUploadComponent | onFileSelected() | response',
              response
            );

            this.uploadStop();
            this.results = response;

            if (response.importedCount > 0) {
              this.dataLoadSubscription = this.dataService.load().subscribe();
            }
          },
          (error: HttpErrorResponse) => {
            this.uploadStop();
            this.invalidMessage = error.error.detail;
          }
        )
      )
      .subscribe();
  }

  private uploadStart(): void {
    this.updloadInProgressSubject.next(true);
  }

  private uploadStop(): void {
    this.updloadInProgressSubject.next(false);
  }

  ngOnDestroy(): void {
    this.uploadSubscription && this.uploadSubscription.unsubscribe();
    this.dataLoadSubscription && this.dataLoadSubscription.unsubscribe();
  }
}
