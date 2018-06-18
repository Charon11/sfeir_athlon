import {EventRank} from './event-rank';

export interface TeamleaderEvent {
  name: string;
  classement?: EventRank;
  date: Date;
  url: string;
}
