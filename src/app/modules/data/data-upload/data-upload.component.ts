import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { DataUploadService } from './data-upload.service';
import { DataUpload } from './data-upload.model';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
})
export class DataUploadComponent implements OnDestroy {
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
  }

  onSubmit(file: File): void {
    this.uploadSubscription = this.uploadService
      .upload(file)
      .pipe(
        tap(
          (response) => {
            console.log(
              'DataUploadComponent | onFileSelected() | response',
              response
            );

            this.results = response;

            this.loadData();
          },
          (error: HttpErrorResponse) => {
            this.invalidMessage = error.error.detail;
          }
        )
      )
      .subscribe();
  }

  private loadData() {
    this.dataLoadSubscription = this.dataService.load().subscribe();
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
    this.dataLoadSubscription.unsubscribe();
  }
}
