import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorEventsDialogComponent } from './competitor-events-dialog.component';

describe('CompetitorEventsDialogComponent', () => {
  let component: CompetitorEventsDialogComponent;
  let fixture: ComponentFixture<CompetitorEventsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorEventsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
