import {Component, OnInit} from '@angular/core';
import {TeamLeader} from '../../models/team-leader';
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

  private readonly _rankedTeamLeaders: Observable<Array<RankedTeamleader>>;

  constructor(private _eventsService: EventsService) {
    this._rankedTeamLeaders = this._eventsService.groupedTeamleaders;
  }


  get rankedTeamLeaders(): Observable<Array<RankedTeamleader>> {
    return this._rankedTeamLeaders;
  }

  ngOnInit() {
  }

}
