import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TeamLeader } from '../../models/team-leader';
import { DomSanitizer } from '@angular/platform-browser';
import {RankedTeamleader} from '../../models/ranked-teamleader';
import {EventsService} from '../../services/events.service';
import {Observable} from 'rxjs/Observable';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  @Input('teamleader') private _teamLeader: RankedTeamleader;
  private _photoUrl;



  private labels_line = Array<any>();

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
    //  this.refresh_chart();
    });
  }

 /* refresh_chart() {
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chartData.length = 0;
        const arrayChartData: Array<number> = [];
        this.genClassment.forEach((value: number , key: string) => {
          arrayChartData.push(value);
        })
        this.chartData.push( {data: arrayChartData, label : 'test'});
      }
    });
  } */


}
