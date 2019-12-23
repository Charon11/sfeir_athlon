import {EventRank} from './event-rank';
import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface TeamleaderEvent {
  name: string;
  classement?: EventRank;
  date: Timestamp;
  url: string;
}
