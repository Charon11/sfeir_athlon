import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRankComponent } from './event-rank.component';

describe('EventRankComponent', () => {
  let component: EventRankComponent;
  let fixture: ComponentFixture<EventRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
