import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Event} from '../../models/event';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  private readonly _events: Observable<Array<Event>>;

  constructor(private eventService: EventsService) {
    this._events = this.eventService.events;
  }

  get events(): Observable<Array<Event>> {
    return this._events;
  }

  ngOnInit() {
  }

}
