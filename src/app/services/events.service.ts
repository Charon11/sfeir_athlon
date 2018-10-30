import {Injectable} from '@angular/core';
import {Event} from '../models/event';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {RankedTeamleader} from '../models/ranked-teamleader';
import {EventRank} from '../models/event-rank';
import * as _ from 'lodash';
import {TeamleaderEvent} from '../models/teamleader-event';


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

  teamLeaderEvents(tlId: string): Observable<Array<TeamleaderEvent>> {
    return this.events.map((events: Array<Event>) => {
      return events.map(event => {
        return <TeamleaderEvent>{
          name: event.name,
          date: event.date,
          url: event.url,
          classement: event.classement.find(c => c.tl.id === tlId)
        };
      });
    });
  }

  getEventsClassementAllTL(events): any  {
    // Recupère le classement de tous les évènements qui ont eu lieu
    const classement = events.map(e => e.classement).reduce((result: Array<EventRank>, c) => result.concat(c), []);
    // Regroupe les classements des évènements par team leader
    return _.groupBy(classement, 'tl.id');
  }

  getNEventsClassementAllTL(events, n): any {
    // Recupère le classement de tous les évènements qui ont eu lieu
    const sliceEvents = events.slice(0, n);
    const classement = sliceEvents.map(e => e.classement).reduce((result: Array<EventRank>, c) => result.concat(c), []);
    // Regroupe les classements des évènements par team leader
    return _.groupBy(classement, 'tl.id');
  }

  getPointsAndPlace(eventsClassment, classment): RankedTeamleader {
    const er = eventsClassment[classment];
    const rtl: RankedTeamleader = <RankedTeamleader>{
      teamleader : er[0].tl,
      points: er.reduce((p, c) => p + c.points, 0),
      places: er.reduce((p, c) => p + c.rank, 0),
    };
    return rtl;
  }

  getPointsAndPlaceAllTL(eventsClassment): Array<RankedTeamleader>  {
    // Calcule la somme des points ainsi que la somme des places de chaque TL
    const gtl: Array<RankedTeamleader> = [];

    for (const classment in eventsClassment) {
      const rtl: RankedTeamleader = this.getPointsAndPlace(eventsClassment, classment);
      // Ajout de chaque Ranked TL avec ses points ainsi que ses places
      gtl.push(rtl);
    }
    return gtl;
  }

  sortRankedTeamLeader(gtl): Array<RankedTeamleader> {
    // Trie La liste des RTL en fonction d'abord du nombre de points puis du nombre de place
    gtl.sort((a: RankedTeamleader, b: RankedTeamleader) => {
      if (a.points === b.points) {
        return (a.places) - (b.places);
      } else {
        return (b.points ) - (a.points);
      }
      // return (b.points ) - (a.points);
    }).map((t, i) => {
      t.classement = i + 1;
      return t;
    });
    return gtl;
  }

  get groupedTeamleaders(): Observable<Array<RankedTeamleader>> {
    return this._events.valueChanges()
      .map(events => {
        const eventsClassment = this.getEventsClassementAllTL(events);
        const pointAndPlace = this.getPointsAndPlaceAllTL(eventsClassment);

        // Trie La liste des RTL en fonction d'abord du nombre de points puis du nombre de place
        return this.sortRankedTeamLeader(pointAndPlace);
      });
  }

  getClassmentEveryEventGeneralByTL(tl: RankedTeamleader): Observable<Map<string, number>> {
    const classmtEveryEventGenByTL: Map<string, number> = new Map<string, number>();
    return this._events.valueChanges()
      .map(events => {
        for (let event = 1; event < events.length; event++) {
          const  eventsClassment = this.getNEventsClassementAllTL(events, event);
          const pointAndPlace = this.getPointsAndPlaceAllTL(eventsClassment);
          const rtl: Array<RankedTeamleader> = this.sortRankedTeamLeader(pointAndPlace);
            for (let key2 = 0; key2 < rtl.length; key2++) {
              const teamleader =  rtl[key2].teamleader.onSnapshot(doc => {
                if (doc.data().lastname === tl.lastname) {
                  classmtEveryEventGenByTL.set(events[event].name, rtl[key2].classement);
                }
              });
          }
        }
        return classmtEveryEventGenByTL;
      });
  }


}
