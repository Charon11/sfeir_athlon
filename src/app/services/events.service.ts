import {Injectable} from '@angular/core';
import {Event} from '../models/event';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class EventsService {

  private _events: AngularFirestoreCollection<Event>;

  constructor(private _fbDataBase: AngularFirestore) {
    this._events = this._fbDataBase.collection('events');
  }

  get events(): Observable<Array<Event>> {
    return this._events.valueChanges()
      .map(events =>
        events
          .map(e => {
              e.classement.map(c => {
                c.tl.get().then(x => c.teamleader = x.data());
                return c;
              });
            return e;
          }).reverse());
  }
}
