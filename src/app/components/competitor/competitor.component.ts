import { Component, Input, OnInit } from '@angular/core';
import { TeamLeader } from '../../models/team-leader';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer) {
  }

  @Input('teamleader') private _teamLeader: TeamLeader;

  get teamLeader(): TeamLeader {
    return this._teamLeader;
  }

  ngOnInit() {
  }

  getSafeBackground(photo) {
    console.log(this._sanitizer.bypassSecurityTrustStyle(`url(${photo})`));
    return this._sanitizer.bypassSecurityTrustStyle(`url(${photo})`);
  }

}
