import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupDataComponent } from './music-group-data.component';

describe('MusicGroupDataComponent', () => {
  let component: MusicGroupDataComponent;
  let fixture: ComponentFixture<MusicGroupDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
