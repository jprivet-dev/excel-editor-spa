import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DataTable } from './data-table.model';

@Injectable({
  providedIn: 'root',
})
export class DataTableState {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private dataSubject = new BehaviorSubject<DataTable[]>([]);
  readonly data$ = this.dataSubject.asObservable();

  private errorMessageSubject = new ReplaySubject<string | null>(1);
  readonly errorMessage$ = this.errorMessageSubject.asObservable();

  setData(dataList: DataTable[]): void {
    this.dataSubject.next(dataList);
  }

  getData(): DataTable[] {
    return this.dataSubject.value;
  }

  addData(data: DataTable): void {
    this.setData([...this.getData(), data]);
  }

  updateData(id: number, data: DataTable): void {
    this.setData(
      this.getData().map((current) => {
        return current.id === id ? { ...current, ...data } : current;
      })
    );
  }

  deleteData(data: DataTable): void {
    this.setData(this.getData().filter((current) => current.id !== data.id));
  }

  startLoading(): void {
    this.isLoadingSubject.next(true);
  }

  stopLoading(): void {
    this.isLoadingSubject.next(false);
  }

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage(): void {
    this.errorMessageSubject.next(null);
  }
}
