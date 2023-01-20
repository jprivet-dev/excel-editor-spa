import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@core/toasts/toast.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MusicGroupDataService } from '../music-group-data/music-group-data.service';
import { MusicGroupUploadService } from './music-group-upload.service';

@Component({
  selector: 'app-music-group-upload',
  templateUrl: './music-group-upload.component.html',
  styleUrls: ['./music-group-upload.component.scss'],
})
export class MusicGroupUploadComponent implements OnInit, OnDestroy {
  private invalidMessageSubject = new BehaviorSubject<string | null>(null);
  readonly invalidMessage$ = this.invalidMessageSubject.asObservable();

  private uploadSubscription: Subscription = new Subscription();
  private dataLoadSubscription: Subscription = new Subscription();

  constructor(
    private uploadService: MusicGroupUploadService,
    private dataService: MusicGroupDataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onFileSelected(file: File): void {
    this.invalidMessageSubject.next(null);

    this.uploadSubscription = this.uploadService.upload(file).subscribe(
      (response) => {
        this.toastService.success(
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
    this.dataLoadSubscription = this.dataService.load().subscribe();
  }

  ngOnDestroy(): void {
    this.uploadSubscription.unsubscribe();
    this.dataLoadSubscription.unsubscribe();
  }
}
