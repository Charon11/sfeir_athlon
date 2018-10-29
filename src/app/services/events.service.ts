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

  getEventsClassementAllTL(events): object  {
    // Recupère le classement de tous les évènements qui ont eu lieu
    const classement = events.map(e => e.classement).reduce((result: Array<EventRank>, c) => result.concat(c), []);
    // Regroupe les classements des évènements par team leader
    return _.groupBy(classement, 'tl.id');
  }

  getPointsAndPlace(gr, key): RankedTeamleader {
    const er = gr[key];
    const rtl: RankedTeamleader = <RankedTeamleader>{
      teamleader : er[0].tl,
      points: er.reduce((p, c) => p + c.points, 0),
      places: er.reduce((p, c) => p + c.rank, 0),
    };
    return rtl;
  }

  getPointsAndPlaceAllTL(gr): Array<RankedTeamleader>  {
    // Calcule la somme des points ainsi que la somme des places de chaque TL
    const gtl: Array<RankedTeamleader> = [];

    for (const key in gr) {
      const rtl: RankedTeamleader = this.getPointsAndPlace(gr, key);
      // Ajout de chaque Ranked TL avec ses points ainsi que ses places
      gtl.push(rtl);
    }
    return gtl;
  }

  getPointsAndPlaceAllTLAndByNumberOfEvents(gr, number): Array<RankedTeamleader>  {
    // Calcule la somme des points ainsi que la somme des places d'un seul TL
    const gtl: Array<RankedTeamleader> = [];
    let compt = 1;
    for (const key in gr) {
      for (const key2 in gr[key]) {
        const rtl: RankedTeamleader = this.getPointsAndPlace(gr, key);
        gtl.push(rtl);
        if (compt === number) { break; } else { compt++; }
      }
      compt = 1;
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
    const thus = this;
    return this._events.valueChanges()
      .map(events => {
        const gr = thus.getEventsClassementAllTL(events);
        const gtl = thus.getPointsAndPlaceAllTL(gr);

        // Trie La liste des RTL en fonction d'abord du nombre de points puis du nombre de place
        return thus.sortRankedTeamLeader(gtl);
      });
  }

  getaddClassementByTL(tl): Observable<Array<Number>> {
    const thus = this;
    const classmentArray: Array<Number> = [];
    return this._events.valueChanges()
      .map(events => {
        const gr = thus.getEventsClassementAllTL(events);

        let compt = 1;
        for (const key in gr) {
          const gtl = thus.getPointsAndPlaceAllTLAndByNumberOfEvents(gr, compt);
          const classedTL: Array< RankedTeamleader>  = thus.sortRankedTeamLeader(gtl);

          for (const key2 in classedTL) {
            //TODO : Comment accéder au displayName ?????????????
            if (classedTL[key2].displayName === tl) {
              classmentArray.push(classedTL[key2].classement);
            }
          }
          compt++;
        }
        return classmentArray;
      });
  }
}
