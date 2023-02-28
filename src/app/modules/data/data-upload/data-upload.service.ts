import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { DataUpload } from './data-upload.model';

@Injectable({
  providedIn: 'root',
})
export class DataUploadService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<DataUpload> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<DataUpload>(`${environment.apiUrl}/upload`, formData)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
