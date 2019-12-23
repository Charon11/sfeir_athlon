import {Pipe, PipeTransform} from '@angular/core';
import {Event} from '../models/event';

@Pipe({
  name: 'events'
})
export class EventsPipe implements PipeTransform {

  transform(value: Array<Event>, args?: any): any {
    return value ? value
        .sort((a: Event, b: Event) => {
          if (a.date.seconds > b.date.seconds) {
            return -1;
          } else if (a.date.seconds < b.date.seconds) {
            return 1;
          } else {
            return 0;
          }
        })
      : null;
  }

}
