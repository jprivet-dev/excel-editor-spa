import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '@core/snack-bar';
import { Data } from '@shared/models';
import { emptyToNull } from '@shared/utils';
import { catchError, Observable, Subscription, tap, throwError } from 'rxjs';
import { DataTableService } from '../data-table/data-table.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit, OnDestroy {
  // TODO: Nous avons là un composant hybride smart/presentational. Réfléchir à une approche plus propre entre la modal et le formulaire.

  @Input() id!: number;
  @Input() data!: Data;
  @Output() closeEvent = new EventEmitter();

  errorMessage: string = '';
  private subscriptionDetails!: Subscription;
  private subscriptionCreate!: Subscription;
  private subscriptionUpdate!: Subscription;

  form = this.formBuilder.group({
    nomDuGroupe: ['', [Validators.required]],
    origine: '',
    ville: '',
    anneeDebut: ['', [Validators.pattern(`^[1-9][0-9]{3}$`)]],
    anneeSeparation: ['', [Validators.pattern(`^[1-9][0-9]{3}$`)]],
    fondateurs: '',
    membres: 0,
    courantMusical: '',
    presentation: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataTableService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.subscriptionDetails = this.dataService
        .details(this.id)
        .pipe(tap((data) => this.form.patchValue(data)))
        .subscribe();
    }
  }

  get nomDuGroupe(): any {
    return this.form.get('nomDuGroupe');
  }

  nomDuGroupeErrorMessage(): string | void {
    return this.nomDuGroupe.hasError('required')
      ? 'Le nom du groupe est requis.'
      : '';
  }

  get anneeDebut(): any {
    return this.form.get('anneeDebut');
  }

  anneeDebutErrorMessage(): string | void {
    if (this.anneeDebut.hasError('required')) {
      return "L'année de début est requise.";
    }

    return this.anneeDebut.hasError('pattern')
      ? "L'année de début doit être valide (ex: 1998)."
      : '';
  }

  get anneeSeparation(): any {
    return this.form.get('anneeSeparation');
  }

  anneeSeparationErrorMessage(): string | void {
    if (this.anneeSeparation.hasError('required')) {
      return "L'année de séparation est requise.";
    }

    return this.anneeSeparation.hasError('pattern')
      ? "L'année de séparation doit être valide (ex: 1998)."
      : '';
  }

  // TODO: Gérer la validation des autres champs comme 'nomDuGroupe'.

  submit(): void {
    this.errorMessage = '';
    this.id ? this.update() : this.create();
  }

  create(): void {
    this.subscriptionCreate = this.dataService
      .create(emptyToNull(this.form.value))
      .pipe(
        catchError((e) => this.handleError(e)),
        tap((data) => {
          this.close();
          this.snackBar.success(`Le groupe "${data.nomDuGroupe}" a été créé.`);
        })
      )
      .subscribe();
  }

  update(): void {
    this.subscriptionUpdate = this.dataService
      .update(this.id, emptyToNull(this.form.value))
      .pipe(
        catchError((e) => this.handleError(e)),
        tap((data) => {
          this.close();
          this.snackBar.success(
            `Le groupe "${data.nomDuGroupe}" a été mis à jour.`
          );
        })
      )
      .subscribe();
  }

  close(): void {
    this.closeEvent.emit();
  }

  private handleError(e: HttpErrorResponse): Observable<any> {
    this.errorMessage = e.error.message;
    return throwError(e);
  }

  ngOnDestroy(): void {
    if (this.subscriptionDetails) {
      this.subscriptionDetails.unsubscribe();
    }
    if (this.subscriptionCreate) {
      this.subscriptionCreate.unsubscribe();
    }
    if (this.subscriptionUpdate) {
      this.subscriptionUpdate.unsubscribe();
    }
  }
}
