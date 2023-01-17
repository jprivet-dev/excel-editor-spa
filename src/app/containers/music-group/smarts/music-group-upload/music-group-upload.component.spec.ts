import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupUploadComponent } from './music-group-upload.component';

describe('MusicGroupUploadComponent', () => {
  let component: MusicGroupUploadComponent;
  let fixture: ComponentFixture<MusicGroupUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
