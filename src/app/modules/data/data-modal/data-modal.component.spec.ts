import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DataModalComponent } from './data-modal.component';

describe('DataModalComponent', () => {
  let component: DataModalComponent;
  let fixture: ComponentFixture<DataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataModalComponent],
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
