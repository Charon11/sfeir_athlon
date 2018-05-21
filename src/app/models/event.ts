import {EventRank} from './event-rank';

export interface Event {
  name: string;
  classement: Array<EventRank>;
  date: Date;
  url: string;
}
