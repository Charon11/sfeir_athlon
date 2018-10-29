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

  private addClassement: Array<Number> ;

  constructor(private _sanitizer: DomSanitizer, private _eventsService: EventsService) {
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
    { data: [330, 600, 260, 700], label: 'Account A' },
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {
    this._teamLeader.teamleader.onSnapshot(doc => {
      this._teamLeader.lastname = doc.data().lastname;
      this._teamLeader.firstname = doc.data().firstname;
      this._teamLeader.photo = doc.data().photo;
      this._teamLeader.displayName = doc.data().displayName;

      this._eventsService.getaddClassementByTL(this._teamLeader.displayName).subscribe(addClassment => {
        this.addClassement = addClassment;
      })
      console.log(this._teamLeader.displayName);
      console.log('classmenet');
      console.log(this.addClassement);
      this._photoUrl = this._sanitizer.bypassSecurityTrustStyle(`url(${this._teamLeader.photo})`);
    });
  }

}
