import {Component, OnInit} from '@angular/core';
import {TeamLeader} from '../../models/team-leader';
import {TeamLeaderService} from '../../services/team-leader.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  private _teamLeaders: Observable<Array<TeamLeader>>;
  private _tls: Array<TeamLeader>;

  constructor(private _teamLeaderService: TeamLeaderService) {
  }

  get teamLeaders(): Observable<Array<TeamLeader>> {
    return this._teamLeaders;
  }

  get tl(): Array<TeamLeader> {
    return this._tls;
  }

  ngOnInit() {
    // this._teamLeaderService.leaderboard.subscribe(x => this._tls = x);
    this._teamLeaders = this._teamLeaderService.leaderboard;
  }

}
