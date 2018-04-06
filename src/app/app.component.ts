import {Component} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  items: Observable<any[]>;
  collabs: any[] = new Array<any>();

  constructor(db: AngularFirestore) {
    const that = this;
    this.items = db.collection('items').valueChanges();
    db.firestore.collection('collab').get().then(querySnapshot => {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        that.collabs.push(doc.data());
      });
    });
    db.collection('items').add({
      'test': (Math.random().toString(16).substr(2, 8))
    }).then(value => console.log('bla' + value));
  }
}
