import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MusicGroupData } from './music-group-data.model';

@Injectable({
  providedIn: 'root',
})
export class MusicGroupDataService {
  private dataSubject = new BehaviorSubject<MusicGroupData[]>([]);
  readonly data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  read(): Observable<MusicGroupData[]> {
    return this.http.get<MusicGroupData[]>(`${environment.apiUrl}/data`);
  }

  load(): Observable<MusicGroupData[]> {
    return this.read().pipe(tap((response) => this.dataSubject.next(response)));
  }

  delete(data: MusicGroupData): Observable<null> {
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

  create(formData: any): Observable<MusicGroupData> {
    return this.http
      .post<MusicGroupData>(`${environment.apiUrl}/data`, formData)
      .pipe(
        tap((data) => this.dataSubject.next([...this.dataSubject.value, data]))
      );
  }

  update(id: number, formData: any): Observable<MusicGroupData> {
    return this.http
      .put<MusicGroupData>(`${environment.apiUrl}/data/${id}`, formData)
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
