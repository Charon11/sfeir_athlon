import {Component, Input, OnInit} from '@angular/core';
import {TeamLeader} from '../../models/team-leader';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  @Input('teamleader') private _teamLeader: TeamLeader;
  private _photoUrl;

  constructor(private _sanitizer: DomSanitizer) {
  }

  get photoUrl() {
    return this._photoUrl;
  }

  get teamLeader(): TeamLeader {
    return this._teamLeader;
  }

  ngOnInit() {
    this._photoUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this._teamLeader.photo})`);
  }

}
