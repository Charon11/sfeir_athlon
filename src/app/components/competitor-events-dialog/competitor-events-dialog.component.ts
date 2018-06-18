import {Component, Inject, Input, OnInit} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Observable} from 'rxjs/Observable';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TeamleaderEvent} from '../../models/teamleader-event';

@Component({
  selector: 'app-competitor-events-dialog',
  templateUrl: './competitor-events-dialog.component.html',
  styleUrls: ['./competitor-events-dialog.component.sass']
})
export class CompetitorEventsDialogComponent implements OnInit {

  public teamLeaderId: string;
  public displayName: string;
  private _events: Observable<Array<TeamleaderEvent>>;

  constructor(private _eventsService: EventsService,
              public dialogRef: MatDialogRef<CompetitorEventsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this._events = this._eventsService.teamLeaderEvents(this.teamLeaderId);
  }

  get events(): Observable<Array<TeamleaderEvent>> {
    return this._events;
  }

}
