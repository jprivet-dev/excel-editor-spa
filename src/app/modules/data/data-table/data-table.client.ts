import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Data } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTableClient {
  private dataUrl: string = `${environment.apiUrl}/data`;

  constructor(private http: HttpClient) {}

  details(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.dataUrl}/${id}`);
  }

  read(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.dataUrl}`);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.dataUrl}/${id}`);
  }

  create(formData: any): Observable<Data> {
    return this.http.post<Data>(`${this.dataUrl}`, formData);
  }

  update(id: number, formData: any): Observable<Data> {
    return this.http.patch<Data>(`${this.dataUrl}/${id}`, formData);
  }
}
