import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
import { KidService } from '../../services/kid/kid.service';
import { ToastService } from '../../services/toast/toast.service';

@IonicPage()
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage {
  kid: Kid;
  cdIn = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService,
              private toast: ToastService) {}

  ionViewWillLoad() {
    this.kid = this.navParams.get('kid');
  }

  checkIn() {
    this.edit.editKid(this.kid).then(() => {
      this.kid.isChecked = true;
      this.cdIn = true;
    })
}

  checkOut() {
    this.edit.editKid(this.kid).then(() => {
      this.kid.isChecked = false;
      this.cdIn = false;
    })
  }

  saveKid(kid: Kid) {
    this.edit.editKid(kid).then(() => {
      this.toast.show(`${kid.name} saved!`);
      this.navCtrl.setRoot('HomePage');
    })
  }

}
