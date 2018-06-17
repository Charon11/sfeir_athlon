import {Component, Input, OnInit} from '@angular/core';
import {EventRank} from '../../models/event-rank';
import {RankedTeamleader} from '../../models/ranked-teamleader';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-event-rank',
  templateUrl: './event-rank.component.html',
  styleUrls: ['./event-rank.component.sass']
})
export class EventRankComponent implements OnInit {

  @Input('event-rank') private _eventRank: EventRank;
  private _photoUrl;

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._eventRank.tl.onSnapshot(doc => {
      this._eventRank.teamleader = <RankedTeamleader>{
        lastname: doc.data().lastname,
        firstname: doc.data().firstname,
        displayName: doc.data().displayName,
        photo: doc.data().photo
      };
      this._photoUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this._eventRank.teamleader.photo})`);
    });
  }

  get eventRank(): EventRank {
    return this._eventRank;
  }

  get photoUrl() {
    return this._photoUrl;
  }
}
