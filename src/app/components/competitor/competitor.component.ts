import { Component, Input, OnInit } from '@angular/core';
import { TeamLeader } from '../../models/team-leader';
import { DomSanitizer } from '@angular/platform-browser';
import {RankedTeamleader} from '../../models/ranked-teamleader';
import {EventsService} from '../../services/events.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  @Input('teamleader') private _teamLeader: RankedTeamleader;
  private _photoUrl;

  private genClassment: Array<Number> = [] ;

  private _everyEventsRankedTeamLeaders: Array<Array<RankedTeamleader>>;

  constructor(private _sanitizer: DomSanitizer, private _eventsService: EventsService) {
    this._eventsService.getGroupedTeamLeadersAfterEveryEvents().subscribe((result) => {
      this._everyEventsRankedTeamLeaders = result;
    });
  }

  getGeneralClassmentAfterEveryEventByTL(): Array<Number> {
    const genClassment: Array<Number> = [];
    for (const key in this._everyEventsRankedTeamLeaders) {
      const eventRTL = this._everyEventsRankedTeamLeaders[key];
      for (let key2 = 0; key2 < eventRTL.length; key2++) {
          const teamleader =  eventRTL[key2].teamleader.onSnapshot(doc => {
            if (doc.data().lastname === this._teamLeader.lastname) {
              genClassment.push(eventRTL[key2].classement);
            }
          });
      }
    }
    console.log(genClassment);
    return genClassment;
  }

  get photoUrl() {
    return this._photoUrl;
  }

  get teamLeader(): RankedTeamleader {
    return this._teamLeader;
  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: this.genClassment, label: 'Account A' },
  ];

  chartLabels = ['January', 'February', 'Mars', 'April','Mai','June','Jully'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this._teamLeader.teamleader.onSnapshot(doc => {
      this._teamLeader.lastname = doc.data().lastname;
      this._teamLeader.firstname = doc.data().firstname;
      this._teamLeader.photo = doc.data().photo;
      this._teamLeader.displayName = doc.data().displayName;
      this._photoUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this._teamLeader.photo})`);
      this.genClassment = this.getGeneralClassmentAfterEveryEventByTL();
      this.chartData.push({ data: this.genClassment, label: 'Account A' });
      console.log(this._teamLeader.lastname);
      console.log(this.genClassment);
    });
  }

}
