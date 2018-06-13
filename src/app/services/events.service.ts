import {Injectable} from '@angular/core';
import {Event} from '../models/event';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {RankedTeamleader} from '../models/ranked-teamleader';
import {EventRank} from '../models/event-rank';
import * as _ from 'lodash';
import {TeamLeader} from '../models/team-leader';

@Injectable()
export class EventsService {

  private _events: AngularFirestoreCollection<Event>;

  constructor(private _fbDataBase: AngularFirestore) {
    this._events = this._fbDataBase.collection('events');
  }

  get events(): Observable<Array<Event>> {
    return this._events.valueChanges()
      .map(events =>
        events.sort((a: Event, b: Event) => b.date.getTime() - a.date.getTime()));
  }

  get groupedTeamleaders(): Observable<Array<RankedTeamleader>> {
    return this._events.valueChanges()
      .map(events => {
        const classement = events.map(e => e.classement).reduce((result: Array<EventRank>, c) => result.concat(c), []);
        const gr = _.groupBy(classement, 'tl.id');
        const gtl: Array<RankedTeamleader> = [];

        for (const key in gr) {
          const er = gr[key];
          const rtl: RankedTeamleader = <RankedTeamleader>{
            teamleader : er[0].tl,
            points: er.reduce((p, c) => p + c.points, 0),
            places: er.reduce((p, c) => p + c.rank, 0),
          };
          gtl.push(rtl);
          console.log(rtl);
        }

        return gtl.sort((a: RankedTeamleader, b: RankedTeamleader) => {
          if (a.points === b.points) {
            return (a.places) - (b.places);
          } else {
            return (b.points ) - (a.points);
          }
          // return (b.points ) - (a.points);
        })
          .map((t, i) => {
            t.classement = i + 1;
            console.log(t)
            return t;
          });
      });
  }
}
