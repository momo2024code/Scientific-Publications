import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibtexViewer } from './bibtex-viewer';

describe('BibtexViewer', () => {
  let component: BibtexViewer;
  let fixture: ComponentFixture<BibtexViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibtexViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibtexViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
