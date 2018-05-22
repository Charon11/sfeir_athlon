import { Pipe, PipeTransform } from '@angular/core';
import {EventRank} from '../models/event-rank';

@Pipe({
  name: 'eventsRank'
})
export class EventsRankPipe implements PipeTransform {

  transform(value: Array<EventRank>, args?: any): any {
    return value ? value
      .sort((a: EventRank, b: EventRank) =>  a.rank - b.rank ) : null;
  }

}
