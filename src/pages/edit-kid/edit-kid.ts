import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
// import { Foto } from '../../models/image/image.model';
import { Parent } from '../../models/parent/parent.model';
import { KidService } from '../../services/kid/kid.service';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs/Observable';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage {
  kid: Kid;
  cdIn = false;
  parent: Parent;
  // foto: Foto;

  parentsList$: Observable<Parent[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService,
              // private imageService: CargaArchivoProvider,
              private toast: ToastService) {}

  ionViewWillLoad() {
    this.kid = this.navParams.get('kid');
    // this.parent = this.navParams.get('parent');
      if(this.kid) {
          this.edit.getParents().subscribe((parents: Parent[]) => {
            for (let parent of parents ) {
              if (parent.key === this.kid.parentId) {
                this.parent = parent
              }
            }
          });
         // this.getImageById(this.kid.imageKey)
      //   this.imageService.getFotos().subscribe((fotos: Foto[]) => {
      //   for (let foto of fotos ) {
      //     if (foto.key === this.kid.imageKey) {
      //       this.foto = foto
      //     }
      //   }
      // })
      }
  }

  checkIn() {
    this.edit.editKid(this.kid).then((res) => {
      this.kid.isChecked = true;
      this.cdIn = true;
    })
}

  checkOut() {
    this.edit.editKid(this.kid).then((res) => {
      this.kid.isChecked = false;
      this.cdIn = false;
    })
  }

  saveKid(kid: Kid) {
    this.edit.editKid(kid).then((res) => {
      this.toast.show(`${kid.name} saved!`);
      this.navCtrl.setRoot('HomePage');
    })
  }


}
