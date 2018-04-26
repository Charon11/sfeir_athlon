import {Injectable} from '@angular/core';
import {TeamLeader} from '../models/team-leader';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TeamLeaderService {

  constructor(private _fbDataBase: AngularFirestore) {
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    this._fbDataBase.firestore.settings(settings);
  }

  get leaderboard(): Observable<Array<TeamLeader>> {
    return Observable.fromPromise(this._fbDataBase.firestore.collection('classement').get().then(querySnapshot => {
      return querySnapshot.docs.map(d =>  d.data()).sort((a: TeamLeader, b: TeamLeader) => {
        if (a.classement < b.classement) {
          return -1;
        } else if (a.classement > b.classement) {
          return 1;
        } else if (a.classement === b.classement) {
          if (a.lastname < b.lastname) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 0;
        }
      });
    }));
  }
}
