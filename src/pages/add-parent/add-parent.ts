import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { Parent } from "../../models/parent/parent.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";

@IonicPage()
@Component({
  selector: 'page-add-parent',
  templateUrl: 'add-parent.html',
})
export class AddParentPage {
  kid: Kid;
  parent: Parent = {
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

save(parent: Parent){
    console.log(parent)
    this.kids.addParent(parent)
      .then(ref => {
          this.toast.show(`${parent.name} added!`);
          // this.navCtrl.setRoot('HomePage', { key: ref.key });
          this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         parentId: ref.key,
         key: this.kid.key
          }).then(ref => {
            console.log("el nino se actualizo ", ref)
          })
    });
  }
}
