import {Component, Input, OnInit} from '@angular/core';
import {EventRank} from '../../models/event-rank';
import {RankedTeamleader} from '../../models/ranked-teamleader';

@Component({
  selector: 'app-event-rank',
  templateUrl: './event-rank.component.html',
  styleUrls: ['./event-rank.component.sass']
})
export class EventRankComponent implements OnInit {

  @Input('event-rank') private _eventRank: EventRank;

  constructor() {
  }

  ngOnInit() {
    this._eventRank.tl.onSnapshot(doc => {
      this._eventRank.teamleader = <RankedTeamleader>{
        lastname: doc.data().lastname,
        firstname: doc.data().firstname,
        photo: doc.data().photo
      };
    });
  }

  get eventRank(): EventRank {
    return this._eventRank;
  }
}
