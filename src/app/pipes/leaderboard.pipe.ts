import { Pipe, PipeTransform } from '@angular/core';
import { TeamLeader } from '../models/team-leader';

@Pipe({
  name: 'leaderboard'
})
export class LeaderboardPipe implements PipeTransform {

  transform(teamLeaders: Array<TeamLeader>, args?: any): any {
    return teamLeaders ? teamLeaders
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
      }) : null;
  }

}
