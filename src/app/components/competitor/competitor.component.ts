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

  @ViewChild("baseChart") chart: BaseChartDirective;

  @Input('teamleader') private _teamLeader: RankedTeamleader;
  private _photoUrl;

  private genClassment: Map<string, number> = new Map<string, number>() ;

  private labels_line = Array<any>();

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
    { data: [], label: 'Account A' },
  ];

  chartLabels = ['January', 'February', 'Mars', 'April', 'Mai', 'June', 'Jully'];

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

      this._eventsService.getClassmentEveryEventGeneralByTL(this._teamLeader).subscribe((result) => {
        this.genClassment = result;
        console.log(this._teamLeader.lastname);
        console.log(this.genClassment);
      });
      //this.chartData.push({ data: this.genClassment, label: 'Account A' });
      //this.refresh_chart()

    //  console.log(this.chartData[0].data);
    });
  }

 /* refresh_chart() {
    setTimeout(() => {
      if (this.chart && this.chart.chart && this.chart.chart.config) {
        this.chartData.length = 0;
        this.chartData.push( {data: this.genClassment, label : "test"});
        this.chart.chart.update();
      }
    });
  } */


}
