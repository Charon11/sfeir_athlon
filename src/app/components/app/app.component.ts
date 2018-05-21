import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private _fbDataBase: AngularFirestore) {
    this._fbDataBase.firestore.enablePersistence().then();
  }
}
