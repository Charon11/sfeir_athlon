import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Observable } from 'rxjs/Observable';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamleaderEvent } from '../../models/teamleader-event';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseChartDirective } from 'ng2-charts';

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


  constructor(private _eventsService: EventsService,
    private _sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  chartOptions = {
    responsive: true,
    animation: {
      onComplete: function () {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            const data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    layout: {
      padding: {right: 10, top: 20}
    },
    responsiveAnimationDuration: 0,
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false // this will remove only the label
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
      }],
      yAxes: [{
        ticks: {
          reverse: true,
          suggestedMin: 1,
          suggestedMax: 10  , // TODO : Taille de la liste des RTL
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }]
    }
  };

  private _chartData = [
    { fill: false, data: this.arrayChartData, label: 'Classement' },
  ];

  chartLabels = this.arrayChartLabel;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @HostListener('window:resize')
  onResize() {
    this.chart.chart.update();
  }

  ngOnInit() {
    this._events = this._eventsService.teamLeaderEvents(this.teamLeaderId);

    this._eventsService.getClassmentEveryEventGeneralByTL(this.teamLeaderId).subscribe((result) => {
        result.forEach((key, value) => {
          this.arrayChartData.push(key);
          this.arrayChartLabel.push(value);
        });
        this.chart.chart.update();
    });
  }


  get events(): Observable<Array<TeamleaderEvent>> {
    return this._events;
  }

  get photoUrl() {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${this.photo})`);
  }

  get chartData() {
    return this._chartData;
  }




}
