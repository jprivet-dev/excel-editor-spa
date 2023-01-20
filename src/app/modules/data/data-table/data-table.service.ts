import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DataTable } from './data-table.model';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  private dataSubject = new BehaviorSubject<DataTable[]>([]);
  readonly data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  read(): Observable<DataTable[]> {
    return this.http.get<DataTable[]>(`${environment.apiUrl}/data`);
  }

  load(): Observable<DataTable[]> {
    return this.read().pipe(tap((response) => this.dataSubject.next(response)));
  }

  delete(data: DataTable): Observable<null> {
    return this.http
      .delete<null>(`${environment.apiUrl}/data/${data.id}`)
      .pipe(
        tap(() =>
          this.dataSubject.next(
            this.dataSubject.value.filter((d) => d.id !== data.id)
          )
        )
      );
  }

  create(formData: any): Observable<DataTable> {
    return this.http
      .post<DataTable>(`${environment.apiUrl}/data`, formData)
      .pipe(
        tap((data) => this.dataSubject.next([...this.dataSubject.value, data]))
      );
  }

  update(id: number, formData: any): Observable<DataTable> {
    return this.http
      .put<DataTable>(`${environment.apiUrl}/data/${id}`, formData)
      .pipe(
        tap((data) =>
          this.dataSubject.next(
            this.dataSubject.value.map((d) => {
              if (d.id === id) {
                return { ...d, ...data };
              }
              return d;
            })
          )
        )
      );
  }
}
