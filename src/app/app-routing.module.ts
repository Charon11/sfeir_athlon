import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import {EventsComponent} from './components/events/events.component';
import {RulesDialogComponent} from './components/rules-dialog/rules-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'rules',
    component: RulesDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
