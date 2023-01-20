import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupDataModalComponent } from './music-group-data-modal.component';

describe('MusicGroupDataModalComponent', () => {
  let component: MusicGroupDataModalComponent;
  let fixture: ComponentFixture<MusicGroupDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupDataModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
