import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@shared/models';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DataTableClient } from './data-table.client';
import { DataTableState } from './data-table.state';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  readonly isLoading$ = this.state.isLoading$;
  readonly data$ = this.state.data$;
  readonly errorMessage$ = this.state.errorMessage$;

  constructor(private client: DataTableClient, private state: DataTableState) {}

  load(): Observable<Data[]> {
    this.loading();
    return this.client.read().pipe(
      catchError((e) => this.handleError(e)),
      tap((response) => {
        this.success();
        this.state.setData(response);
      })
    );
  }

  delete(data: Data): Observable<null> {
    this.loading();
    return this.client.delete(data.id).pipe(
      catchError((e) => this.handleError(e)),
      tap(() => {
        this.success();
        this.state.deleteData(data);
      })
    );
  }

  create(formData: any): Observable<Data> {
    this.loading();
    return this.client.create(formData).pipe(
      catchError((e) => this.handleError(e)),
      tap((data) => {
        this.success();
        this.state.addData(data);
      })
    );
  }

  update(id: number, formData: any): Observable<Data> {
    this.loading();
    return this.client.update(id, formData).pipe(
      catchError((e) => this.handleError(e)),
      tap((data) => {
        this.success();
        this.state.updateData(id, data);
      })
    );
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.error(e);
    return throwError(e);
  }

  private loading(): void {
    this.state.startLoading();
    this.state.clearErrorMessage();
  }

  private success(): void {
    this.state.stopLoading();
    this.state.clearErrorMessage();
  }

  private error(e: HttpErrorResponse): void {
    this.state.stopLoading();
    this.state.setErrorMessage(e.error.detail);
  }
}
