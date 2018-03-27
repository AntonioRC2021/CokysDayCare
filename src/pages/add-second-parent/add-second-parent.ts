import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { SecondParent } from "../../models/second-parent/second-parent.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";

@IonicPage()
@Component({
  selector: 'page-add-second-parent',
  templateUrl: 'add-second-parent.html',
})
export class AddSecondParentPage {
  kid: Kid;
  secondParent: SecondParent = {
    name: '',
    lastName: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService
            ) {}

  ionViewDidLoad() {
    this.kid = this.navParams.get('kid');
    console.log(this.kid)
  }

save(secondParent: SecondParent){
    console.log(secondParent)
    this.kids.addSecondParent(secondParent)
      .then(ref => {
          this.toast.show(`${secondParent.name} added!`);
          // this.navCtrl.setRoot('HomePage', { key: ref.key });
          this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         secondParentId: ref.key,
         key: this.kid.key
          }).then(ref => {
            console.log("el nino se actualizo ", ref)
          })
    });
  }
}
