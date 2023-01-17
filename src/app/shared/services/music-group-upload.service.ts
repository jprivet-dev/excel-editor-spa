import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicGroupFileUpload } from '@shared/music-group-file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class MusicGroupUploadService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<MusicGroupFileUpload> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<MusicGroupFileUpload>(
      'https://localhost/api/music-groups/upload',
      formData
    );
  }
}
