import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Observable} from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TeamleaderEvent} from '../../models/teamleader-event';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-competitor-events-dialog',
  templateUrl: './competitor-events-dialog.component.html',
  styleUrls: ['./competitor-events-dialog.component.sass']
})
export class CompetitorEventsDialogComponent implements OnInit {

  public teamLeaderId: string;
  public displayName: string;
  public photo: string;
  private _events: Observable<Array<TeamleaderEvent>>;
  private arrayChartData: Array<number> = [];
  private arrayChartLabel: Array<string> = [];

  private genClassment: Map<string, number> = new Map<string, number>() ;

  constructor(private _eventsService: EventsService,
              private _sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<CompetitorEventsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this._events = this._eventsService.teamLeaderEvents(this.teamLeaderId);

    this._eventsService.getClassmentEveryEventGeneralByTL(this.displayName).subscribe((result) => {
      this.genClassment = result;
      console.log(result);
      console.log(this.displayName);
      console.log(this.genClassment);
      console.log('Taille de la map : ');
      console.log(this.genClassment.size);
      const that = this;
      setTimeout( function() {
          console.log(that.genClassment.size);
          that.genClassment.forEach((key,value) => {
            that.arrayChartData.push(key);
            that.arrayChartLabel.push(value);
          });
        that.updateChart();
      }, 100);

    });
  }

  updateChart() {
    this.chartData = this.chartData.slice();
  }

  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          display: false //this will remove only the label
        }
      }],
      yAxes: [{
        ticks: {
          reverse: true,
          suggestedMin: 1,
          suggestedMax: 7,
        }
      }]
    }
  };

  chartData = [
    { fill : false, data: this.arrayChartData, label: 'Classement' },
  ];

  chartLabels = this.arrayChartLabel;


  get events(): Observable < Array < TeamleaderEvent >> {
    return this._events;
  }

  get photoUrl() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.photo})`);
  }



}
