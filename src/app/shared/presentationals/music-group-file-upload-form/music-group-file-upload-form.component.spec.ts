import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupFileUploadFormComponent } from './music-group-file-upload-form.component';

describe('MusicGroupFileUploadFormComponent', () => {
  let component: MusicGroupFileUploadFormComponent;
  let fixture: ComponentFixture<MusicGroupFileUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupFileUploadFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupFileUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
