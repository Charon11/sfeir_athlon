import {Component} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  teamLeaders: any[] = new Array<any>();

  constructor(db: AngularFirestore) {
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
}
