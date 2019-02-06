import {EventRank} from './event-rank';
import { IndividualEventRank } from './individual-event-rank';

export interface Event {
  name: string;
  classement: Array<EventRank>;
  individualClassement: Array<IndividualEventRank>;
  date: Date;
  url: string;
  register?: string;
}
