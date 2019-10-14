import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RankedTeamleader } from '../models/ranked-teamleader';
import { EventRank } from '../models/event-rank';
import * as _ from 'lodash';
import { TeamleaderEvent } from '../models/teamleader-event';
import { TeamLeader } from '../models/team-leader';
import { combineLatest, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class EventsService {

  private readonly _events: AngularFirestoreCollection<Event>;
  private readonly _teamLeaders: AngularFirestoreCollection<TeamLeader>;
  private readonly _events$: Observable<Array<Event>>;
  private readonly _teamLeaders$: Observable<Array<TeamLeader>>;
  private _eventsBehaviorSubject: BehaviorSubject<Array<Event>> = new BehaviorSubject<Array<Event>>([]);


  get eventsBehaviorSubject(): Observable<Array<Event>> {
    return this._eventsBehaviorSubject.asObservable();
  }

  constructor(private _fbDataBase: AngularFirestore) {
    this._events = this._fbDataBase.collection(environment.collections.events);
    this._teamLeaders = this._fbDataBase.collection(environment.collections.tl);
    this._events$ = this._events.valueChanges();
    this._teamLeaders$ = this._teamLeaders.valueChanges();
  }

  get events(): Observable<Array<Event>> {
    return this._teamLeaders$.pipe(
      combineLatest(this._events$, (a, b) => ({ tls: a, events: b })),
      map(x => {
        return x.events.map(event => {
          let classement: Map<string, { points: number, rank: number, team: any }> = new Map();
          const tempClassement: Map<string, { points: number, rank: number, team: any }> = new Map();
          let currentInvidualRank = 1;
          let currentPoint = x.tls.length;
          if (event.individualClassement) {
            event.individualClassement.forEach(c => {
              if (currentInvidualRank < c.rank) {
                tempClassement.forEach((value, key) => classement.set(key, value));
                currentPoint--;
              }
              currentInvidualRank = c.rank;
              if (tempClassement.has(c.team.id)) {
                if (c.rank <= x.tls.length) {
                  tempClassement.set(c.team.id, {
                    points: (tempClassement.get(c.team.id).points + 1),
                    rank: tempClassement.get(c.team.id).rank,
                    team: c.team
                  });
                }
              } else {
                tempClassement.set(c.team.id, {
                  points: currentPoint,
                  rank: c.rank,
                  team: c.team
                });
              }
            });
          }
          classement = tempClassement;
          const unrankTL = classement.size + 1
          x.tls.forEach(tl => {
            if (!classement.has(tl.team)) {
              classement.set(tl.team, { points: 0, rank: unrankTL, team: tl.ref });
            }
          }
          );
          let previousClas: { points: number, rank: number } = { points: 0, rank: 0 };
          let currentRank = 0;
          event.classement = [];
          Array.from(classement.values()).sort(this.sortEventClassement)
            .forEach((value, index) => {
              if (previousClas.points !== value.points || (previousClas.points === value.points && previousClas.rank !== value.rank)) {
                currentRank += 1;
              }
              previousClas = { points: value.points, rank: value.rank };
              event.classement.push(<EventRank>{
                points: value.points,
                tl: value.team,
                rank: currentRank
              });
            });
          return event;
        }).sort((a: Event, b: Event) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        });
      }),

      tap(x => this._eventsBehaviorSubject.next(x)
      )
    );
  }

  teamLeaderEvents(tlId: string): Observable<Array<TeamleaderEvent>> {
    return this.eventsBehaviorSubject.pipe(
      map((events: Array<Event>) =>
        events.map(event =>
          <TeamleaderEvent>{
            name: event.name,
            date: event.date,
            url: event.url,
            classement: event.classement.find(c => c.tl.id === tlId)
          }
        )
      )
    );
  }


  getEventsClassementAllTL(events): any {
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
      teamleader: er[0].tl,
      points: er.reduce((p, c) => p + c.points, 0),
      places: er.reduce((p, c) => p + c.rank, 0),
    };
    return rtl;
  }

  getPointsAndPlaceAllTL(eventsClassment): Array<RankedTeamleader> {
    // Calcule la somme des points ainsi que la somme des places de chaque TL
    const gtl: Array<RankedTeamleader> = [];

    for (const classment in eventsClassment) {
      gtl.push(this.getPointsAndPlace(eventsClassment, classment));
    }
    return gtl;
  }

  sortRankedTeamLeader(gtl): Array<RankedTeamleader> {
    // Trie La liste des RTL en fonction d'abord du nombre de points puis du nombre de place
    let currentPoint, currentPlace = 0
    gtl.sort((a: RankedTeamleader, b: RankedTeamleader) => {
      if (a.points === b.points) {
        return (a.places) - (b.places);
      } else {
        return (b.points) - (a.points);
      }
      // return (b.points ) - (a.points);
    }).forEach((t) => {
      if (currentPoint !== t.points || (currentPoint === t.points && currentPlace !== t.places)) {
        currentPlace++;
      }
      t.classement = currentPlace;
      currentPoint = t.points;
      return t;
    });
    return gtl;
  }

  sortEventClassement(a: { points: number, rank: number, team: any }, b: { points: number, rank: number, team: any }): number {
    if (a.points === b.points) {
      return (a.rank) - (b.rank);
    } else {
      return (b.points) - (a.points);
    }
  }

  get groupedTeamleaders(): Observable<Array<RankedTeamleader>> {
    return this.events.pipe(
      map(events => {
        const eventsClassment = this.getEventsClassementAllTL(events);
        const pointAndPlace = this.getPointsAndPlaceAllTL(eventsClassment);

        // Trie La liste des RTL en fonction d'abord du nombre de points puis du nombre de place
        return this.sortRankedTeamLeader(pointAndPlace);
      })
    );
  }

  getClassmentEveryEventGeneralByTL(tl: string): Observable<Map<string, number>> {
    return this.eventsBehaviorSubject.pipe(
      map(events => {
        const classmtEveryEventGenByTL: Map<string, number> = new Map<string, number>();

        events = _.sortBy(events, function (dateObj) {
          return new Date(dateObj.date);
        });
        for (let event = 1; event <= events.length; event++) {
          const eventsClassement = this.getNEventsClassementAllTL(events, event);
          const pointAndPlace = this.getPointsAndPlaceAllTL(eventsClassement);
          const rtl: Array<RankedTeamleader> = this.sortRankedTeamLeader(pointAndPlace);
          rtl.forEach(r => {
            if (r.teamleader.id === tl) {
              classmtEveryEventGenByTL.set(events[event - 1].name, r.classement);
            }
          });
        }
        return classmtEveryEventGenByTL;
      }));
  }


}
