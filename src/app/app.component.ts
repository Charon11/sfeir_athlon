import {Component} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MatDialog} from '@angular/material';
import {RulesDialogComponent} from './rules-dialog/rules-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  teamLeaders: any[] = new Array<any>();

  constructor(db: AngularFirestore, public dialog: MatDialog) {
    db.collection('classement').valueChanges().subscribe(v => {
      this.teamLeaders = v.sort((a: any, b: any) => {
        if (a.classement < b.classement) { return -1; }
        else if (a.classement > b.classement) { return 1; }
        else if (a.classement === b.classement) {
          if (a.lastname < b.lastname) { return -1; } else { return 1; }
        } else { return 0; }
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RulesDialogComponent, {
      width: '70%',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };
}
