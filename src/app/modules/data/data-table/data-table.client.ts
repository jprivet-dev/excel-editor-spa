import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DataTable } from './data-table.model';

@Injectable({
  providedIn: 'root',
})
export class DataTableClient {
  private dataUrl: string = `${environment.apiUrl}/data`;

  constructor(private http: HttpClient) {}

  read(): Observable<DataTable[]> {
    return this.http.get<DataTable[]>(`${this.dataUrl}`);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>(`${this.dataUrl}/${id}`);
  }

  create(formData: any): Observable<DataTable> {
    return this.http.post<DataTable>(`${this.dataUrl}`, formData);
  }

  update(id: number, formData: any): Observable<DataTable> {
    return this.http.patch<DataTable>(`${this.dataUrl}/${id}`, formData);
  }
}
