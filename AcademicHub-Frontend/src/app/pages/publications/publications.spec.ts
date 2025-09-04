import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publications } from './publications';

describe('Publications', () => {
  let component: Publications;
  let fixture: ComponentFixture<Publications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Publications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
