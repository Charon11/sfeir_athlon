import {Component, OnInit} from '@angular/core';
import {TeamLeader} from '../../models/team-leader';
import {TeamLeaderService} from '../../services/team-leader.service';
import {Observable} from 'rxjs/Observable';
import {EventsService} from '../../services/events.service';
import {EventRank} from '../../models/event-rank';
import * as _ from 'lodash';
import {RankedTeamleader} from '../../models/ranked-teamleader';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  private readonly _teamLeaders: Observable<Array<TeamLeader>>;
  private readonly _rankedTeamLeaders: Observable<Array<RankedTeamleader>>;
  private _tls: Array<TeamLeader>;

  constructor(private _teamLeaderService: TeamLeaderService, private _eventsService: EventsService) {
    this._teamLeaders = this._teamLeaderService.leaderboard;
    this._rankedTeamLeaders = this._eventsService.groupedTeamleaders;
    /*this._eventsService.events.subscribe(events => {
      this._tls = [];
      const classement = events.map(e => e.classement).reduce((result: Array<EventRank>, c) => result.concat(c), []);
      const gr = _.groupBy(classement, 'tl.id');
      for (const key in gr) {
        const er = gr[key];
        er[0].tl.get().then(x => {
          const tl: TeamLeader = x.data();
          tl.points = er.reduce((p, c) => p + c.points, 0);
          tl.places = er.reduce((p, c) => p + c.rank, 0);
          this._tls.push(tl);
          this._tls = this._tls
            .sort((a: TeamLeader, b: TeamLeader) => {
              return (b.points - b.places) - (a.points - a.places);
            })
            .map((t, i) => {
              t.classement = i + 1;
              return t;
            });
        });
      }
      this._tls = this._tls
        .sort((a: TeamLeader, b: TeamLeader) => (b.points - b.places) - (a.points - a.places));
    });*/
  }

  get teamLeaders(): Observable<Array<TeamLeader>> {
    return this._teamLeaders;
  }

  get tls() {
    return this._tls;
  }

  get rankedTeamLeaders(): Observable<Array<RankedTeamleader>> {
    return this._rankedTeamLeaders;
  }

  ngOnInit() {
  }

}
