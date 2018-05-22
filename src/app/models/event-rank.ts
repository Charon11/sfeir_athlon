import {RankedTeamleader} from './ranked-teamleader';

export interface EventRank {
  rank: number;
  points: number;
  tl: any;
  teamleader: RankedTeamleader;
}
