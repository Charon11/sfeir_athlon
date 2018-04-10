import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorComponent } from './competitor.component';

describe('CompetitorComponent', () => {
  let component: CompetitorComponent;
  let fixture: ComponentFixture<CompetitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
