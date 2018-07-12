import { Pipe, PipeTransform } from '@angular/core';
import {TeamleaderEvent} from '../models/teamleader-event';

@Pipe({
  name: 'filterTeamLeaderEvent'
})
export class FilterTeamleaderEventPipe implements PipeTransform {

  transform(value: Array<TeamleaderEvent>, args?: any): any {
    return value ? value
      .filter((e: TeamleaderEvent) =>  e.classement !== undefined ) : null;
  }

}
