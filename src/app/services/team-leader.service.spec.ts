import { inject, TestBed } from '@angular/core/testing';

import { TeamLeaderService } from './team-leader.service';

describe('TeamLeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamLeaderService]
    });
  });

  it('should be created', inject([TeamLeaderService], (service: TeamLeaderService) => {
    expect(service).toBeTruthy();
  }));
});
