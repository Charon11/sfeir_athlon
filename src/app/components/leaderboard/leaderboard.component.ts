import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventsService} from '../../services/events.service';
import {RankedTeamleader} from '../../models/ranked-teamleader';
import {MatDialog} from '@angular/material';
import {CompetitorEventsDialogComponent} from '../competitor-events-dialog/competitor-events-dialog.component';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  private readonly _rankedTeamLeaders: Observable<Array<RankedTeamleader>>;

  constructor(private _eventsService: EventsService,
              private dialog: MatDialog) {
    this._rankedTeamLeaders = this._eventsService.groupedTeamleaders;
  }


  get rankedTeamLeaders(): Observable<Array<RankedTeamleader>> {
    return this._rankedTeamLeaders;
  }

  ngOnInit() {
  }

  onCardClick(item: RankedTeamleader) {
    this._eventsService.teamLeaderEvents('rch').subscribe();
    const dialogRef = this.dialog.open(CompetitorEventsDialogComponent, {
      width: '90%',
      height: '100%'
    });
    dialogRef.componentInstance.teamLeaderId = item.teamleader.id;
    dialogRef.componentInstance.displayName = item.displayName;
    dialogRef.componentInstance.photo = item.photo;
  }

}
