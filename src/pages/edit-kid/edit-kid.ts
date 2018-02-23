import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
import { KidService } from '../../services/kid/kid.service';

@IonicPage()
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage {
  kid: Kid;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService) {}

  ionViewWillLoad() {
    this.kid = this.navParams.get('kid');
  }

  saveKid(kid: Kid) {
    this.edit.editKid(kid).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

}
