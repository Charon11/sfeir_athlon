import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../models/event';
import {RankedTeamleader} from '../../models/ranked-teamleader';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {

  @Input('event') private _event: Event;

  constructor() { }

  ngOnInit() {
    this._event.classement = this._event.classement
      .map(c => {
        c.teamleader = <RankedTeamleader>{}
        return c;
      });
  }

  get event() {
    return this._event;
  }

  eventDate(event) {
  // convert firebase seconds to milliseconds
    return event.date.seconds * 1000;
  }

}
