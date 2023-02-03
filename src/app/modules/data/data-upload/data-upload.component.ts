import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackBarService } from '@shared/snack-bar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';
import { DataUploadService } from './data-upload.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss'],
})
export class DataUploadComponent implements OnInit, OnDestroy {
  private invalidMessageSubject = new BehaviorSubject<string | null>(null);
  readonly invalidMessage$ = this.invalidMessageSubject.asObservable();

  private uploadSubscription: Subscription = new Subscription();
  private dataLoadSubscription: Subscription = new Subscription();

  constructor(
    private uploadService: DataUploadService,
    private dataService: DataTableService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onFileSelected(file: File): void {
    this.invalidMessageSubject.next(null);

    this.uploadSubscription = this.uploadService.upload(file).subscribe(
      (response) => {
        this.snackBar.success(
          `Le fichier ${response.filename} a été téléchargé.`
        );

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
