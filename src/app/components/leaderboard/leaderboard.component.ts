import { Component, OnInit } from '@angular/core';
import { TeamLeader } from '../../models/team-leader';
import { TeamLeaderService } from '../../services/team-leader.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  private readonly _teamLeaders: Observable<Array<TeamLeader>>;

  constructor(private _teamLeaderService: TeamLeaderService) {
    this._teamLeaders = this._teamLeaderService.leaderboard;
  }

  get teamLeaders(): Observable<Array<TeamLeader>> {
    return this._teamLeaders;
  }

  ngOnInit() {
  }

}
