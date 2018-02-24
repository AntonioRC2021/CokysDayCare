import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  imagenPreview: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddKidPage');
  }

  mostrar_camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }

    this.camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log( "ERROR EN CAMARA", JSON.stringify(err) );
    });
  }

  addKid(kid: Kid) {
    this.kids.addKid(kid).then(ref => {
      this.toast.show(`${kid.name} added!`);
      this.navCtrl.setRoot('HomePage', { key: ref.key });
    });
  }

}
