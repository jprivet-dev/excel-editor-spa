import { Injectable } from '@angular/core';
import { Data } from '@shared/models';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTableState {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoadingSubject.asObservable();

  private dataSubject = new BehaviorSubject<Data[]>([]);
  readonly data$ = this.dataSubject.asObservable();

  private errorMessageSubject = new ReplaySubject<string | null>(1);
  readonly errorMessage$ = this.errorMessageSubject.asObservable();

  private displayedColumns: string[] = [
    '#',
    'nomDuGroupe',
    'anneeDebut',
    'anneeSeparation',
    'presentation',
    'actions',
  ];

  private displayedColumnsSubject = new BehaviorSubject<string[]>([]);
  readonly displayedColumns$ = this.displayedColumnsSubject.asObservable();

  setData(dataList: Data[]): void {
    this.dataSubject.next(dataList);
  }

  getData(): Data[] {
    return this.dataSubject.value;
  }

  clearData(): void {
    return this.dataSubject.next([]);
  }

  addData(data: Data): void {
    this.setData([...this.getData(), data]);
  }

  updateData(id: number, data: Data): void {
    this.setData(
      this.getData().map((current) =>
        current.id === id ? { ...current, ...data } : current
      )
    );
  }

  deleteData(data: Data): void {
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

  displayedColumnsWithActions(): void {
    this.displayedColumnsSubject.next(this.displayedColumns);
  }

  displayedColumnsWithoutActions(): void {
    this.displayedColumnsSubject.next(
      this.displayedColumns.filter((column) => column !== 'actions')
    );
  }
}
