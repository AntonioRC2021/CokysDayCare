import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { KidService } from '../../services/kid/kid.service';
import { Observable } from 'rxjs/Observable';
import { Kid } from '../../models/kid/kid.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  kidsList$: Observable<Kid[]>;

  constructor(public navCtrl: NavController, private kids: KidService) {
    this.kidsList$ = this.kids
      .getKid()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

}
