import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";

@IonicPage()
@Component({
  selector: 'page-add-kid',
  templateUrl: 'add-kid.html',
})
export class AddKidPage {
  kid: Kid = {
    name: '',
    lastName: '',
    parent: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddKidPage');
  }

  addKid(kid: Kid) {
    this.kids.addKid(kid).then(ref => {
      this.toast.show(`${kid.name} added!`);
      this.navCtrl.setRoot('HomePage', { key: ref.key });
    });
  }

}
