import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupDataFormComponent } from './music-group-data-form.component';

describe('MusicGroupDataFormComponent', () => {
  let component: MusicGroupDataFormComponent;
  let fixture: ComponentFixture<MusicGroupDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupDataFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
