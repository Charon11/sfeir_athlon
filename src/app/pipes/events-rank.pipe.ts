import { Pipe, PipeTransform } from '@angular/core';
import {EventRank} from '../models/event-rank';

@Pipe({
  name: 'eventsRank'
})
export class EventsRankPipe implements PipeTransform {

  transform(value: Array<EventRank>, args?: any): any {
    return value ? value
      .sort((a: EventRank, b: EventRank) => {
        if (a.rank < b.rank) {
          return -1;
        } else if (a.rank > b.rank) {
          return 1;
        } else if (a.rank === b.rank) {
          if (a.teamleader.lastname < b.teamleader.lastname) {
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
