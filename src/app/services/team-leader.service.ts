import { Injectable } from '@angular/core';
import { TeamLeader } from '../models/team-leader';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class TeamLeaderService {

  private _teamLeaders: AngularFirestoreCollection<TeamLeader>;

  constructor(private _fbDataBase: AngularFirestore) {
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    this._fbDataBase.firestore.settings(settings);
    this._fbDataBase.firestore.enablePersistence().then();
    this._teamLeaders = this._fbDataBase.collection('classement');
  }

  get leaderboard(): Observable<Array<TeamLeader>> {
    return this._teamLeaders.valueChanges()
      .map(teamLeaders => teamLeaders
        .sort((a: TeamLeader, b: TeamLeader) => {
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
        }));
  }

}
