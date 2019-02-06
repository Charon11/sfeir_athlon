import { RankedSfeirien } from './ranked-sfeirien';
import { TeamLeader } from './team-leader';

export interface IndividualEventRank {
  rank: number;
  team: TeamLeader;
  sfeirien: RankedSfeirien;
}
