import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '@core/toasts/toast.service';
import { emptyToNull } from '@shared/utils';
import { Subscription } from 'rxjs';
import { DataTable } from '../data-table/data-table.model';
import { DataTableService } from '../data-table/data-table.service';

@Component({
  selector: 'app-music-group-data-form',
  templateUrl: './music-group-data-form.component.html',
  styleUrls: ['./music-group-data-form.component.scss'],
})
export class MusicGroupDataFormComponent implements OnInit, OnDestroy {
  // TODO: Nous avons là un composant hybride smart/presentational. Réfléchir à une approche plus propre entre la modal et le formulaire.

  @Input() data!: DataTable;
  @Output() submitEvent = new EventEmitter();
  errorMessage: string = '';
  updateMode: boolean = false;
  private createSubscription: Subscription = new Subscription();
  private updateSubscription: Subscription = new Subscription();

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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.updateMode = true;
      this.form.patchValue(this.data);
    }
  }

  get nomDuGroupe(): any {
    return this.form.get('nomDuGroupe');
  }

  nomDuGroupeIsInvalid(): any {
    return (
      !this.nomDuGroupe?.valid &&
      (this.nomDuGroupe?.dirty || this.nomDuGroupe?.touched)
    );
  }

  get anneeDebut(): any {
    return this.form.get('anneeDebut');
  }

  anneeDebutIsInvalid(): any {
    return (
      !this.anneeDebut?.valid &&
      (this.anneeDebut?.dirty || this.anneeDebut?.touched)
    );
  }

  get anneeSeparation(): any {
    return this.form.get('anneeSeparation');
  }

  anneeSeparationIsInvalid(): any {
    return (
      !this.anneeSeparation?.valid &&
      (this.anneeSeparation?.dirty || this.anneeSeparation?.touched)
    );
  }

  // TODO: Gérer la validation des autres champs comme 'nomDuGroupe'.

  onSubmit(): void {
    this.errorMessage = '';

    if (this.updateMode) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.createSubscription = this.dataService
      .create(emptyToNull(this.form.value))
      .subscribe(
        (data) => {
          this.form.reset();
          this.toastService.success(
            `Le groupe "${data.nomDuGroupe}" a été créé.`
          );
          this.submitEvent.emit();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  update() {
    this.updateSubscription = this.dataService
      .update(this.data.id, emptyToNull(this.form.value))
      .subscribe(
        (data) => {
          this.form.reset();
          this.toastService.success(
            `Le groupe "${data.nomDuGroupe}" a été mis à jour.`
          );
          this.submitEvent.emit();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  ngOnDestroy(): void {
    this.createSubscription.unsubscribe();
  }
}
