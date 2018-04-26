import {Injectable} from '@angular/core';
import {TeamLeader} from '../models/team-leader';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TeamLeaderService {

  private _db;

  constructor(private _fbDataBase: AngularFirestore) {
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    this._fbDataBase.firestore.settings(settings);
    this._fbDataBase.firestore.enablePersistence().then(this._db = this._fbDataBase.firestore);
  }

  get leaderboard(): Observable<Array<TeamLeader>> {
    return Observable.fromPromise(this._db.collection('classement').valueChanges()   .get().then(querySnapshot => {
      const source = querySnapshot.metadata.fromCache ? 'local cache' : 'server';
      console.log('Data came from ' + source);
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
