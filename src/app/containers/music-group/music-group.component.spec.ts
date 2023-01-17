import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupComponent } from './music-group.component';

describe('MusicGroupComponent', () => {
  let component: MusicGroupComponent;
  let fixture: ComponentFixture<MusicGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MusicGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
