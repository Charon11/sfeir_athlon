import {Injectable} from '@angular/core';
import {TeamLeader} from '../models/team-leader';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {LocalForageService} from 'ngx-localforage';

@Injectable()
export class TeamLeaderService {

  private _teamLeaders: AngularFirestoreCollection<TeamLeader>;

  constructor(private _fbDataBase: AngularFirestore, private localforage: LocalForageService) {
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    this._fbDataBase.firestore.settings(settings);
    this._teamLeaders = this._fbDataBase.collection('classement');
  }

  get leaderboard(): Observable<Array<TeamLeader>> {
    return this._teamLeaders.valueChanges()
      .map(teamLeaders => {
        this.localforage.setItem('tl', teamLeaders);
        return teamLeaders.sort((a: TeamLeader, b: TeamLeader) => {
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
      });
  }

  get cachedLeaderboard(): Observable<Array<TeamLeader>> {
    return this.localforage.getItem('tl').map(teamLeaders => {
      console.log('cached');
      return teamLeaders.sort((a: TeamLeader, b: TeamLeader) => {
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
    });
  }

}
