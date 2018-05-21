import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {

  @Input('event') private _event: Event
  constructor() { }

  ngOnInit() {
  }

  get event() {
    return this._event;
  }

}
