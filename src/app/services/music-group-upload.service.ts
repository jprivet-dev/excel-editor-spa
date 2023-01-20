import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { MusicGroupFileUpload } from '@shared/music-group-file-upload.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicGroupUploadService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<MusicGroupFileUpload> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<MusicGroupFileUpload>(
      `${environment.apiUrl}/upload`,
      formData
    );
  }
}
