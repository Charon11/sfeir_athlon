import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './components/app/app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxMdModule } from 'ngx-md';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { CompetitorComponent } from './components/competitor/competitor.component';
import { RulesDialogComponent } from './components/rules-dialog/rules-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LeaderboardPipe } from './pipes/leaderboard.pipe';
import { EventsService } from './services/events.service';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { EventsRankPipe } from './pipes/events-rank.pipe';
import { EventsPipe } from './pipes/events.pipe';
import { EventRankComponent } from './components/event-rank/event-rank.component';
import { CompetitorEventsDialogComponent } from './components/competitor-events-dialog/competitor-events-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterTeamleaderEventPipe } from './pipes/filter-teamleader-event.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CompetitorComponent,
    RulesDialogComponent,
    ToolbarComponent,
    LeaderboardComponent,
    LeaderboardPipe,
    EventsComponent,
    EventComponent,
    EventsRankPipe,
    EventsPipe,
    EventRankComponent,
    CompetitorEventsDialogComponent,
    SafeHtmlPipe,
    FilterTeamleaderEventPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxMdModule.forRoot(),
    FontAwesomeModule,
    FlexLayoutModule,
    ChartsModule
  ],
  entryComponents: [
    CompetitorEventsDialogComponent
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
