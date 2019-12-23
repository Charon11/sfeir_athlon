import {EventRank} from './event-rank';
import { IndividualEventRank } from './individual-event-rank';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface Event {
  name: string;
  classement: Array<EventRank>;
  individualClassement: Array<IndividualEventRank>;
  date: Timestamp;
  url: string;
  register?: string;
}
