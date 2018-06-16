import { Component, Input, OnInit } from '@angular/core';
import { TeamLeader } from '../../models/team-leader';
import { DomSanitizer } from '@angular/platform-browser';
import {RankedTeamleader} from '../../models/ranked-teamleader';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  @Input('teamleader') private _teamLeader: RankedTeamleader;
  private _photoUrl;

  constructor(private _sanitizer: DomSanitizer) {
  }

  get photoUrl() {
    return this._photoUrl;
  }

  get teamLeader(): RankedTeamleader {
    return this._teamLeader;
  }

  ngOnInit() {
    this._teamLeader.teamleader.onSnapshot(doc => {
      this._teamLeader.lastname = doc.data().lastname;
      this._teamLeader.firstname = doc.data().firstname;
      this._teamLeader.photo = doc.data().photo;
      this._teamLeader.displayName = doc.data().displayName;
      this._photoUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this._teamLeader.photo})`);
    });
  }

}
