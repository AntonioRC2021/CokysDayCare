
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
// import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from "../../app/firebase.credentials";
// import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";

@IonicPage()
@Component({
  selector: 'page-add-kid',
  templateUrl: 'add-kid.html',
})
export class AddKidPage {
  kid: Kid = {
    name: '',
    lastName: ''
  }
  // titulo: string;
  // imagenPreview: string;
  // imagen64: string;
  // foto: Foto;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera
              // public _cap: CargaArchivoProvider
             ) {
             initializeApp(FIREBASE_CONFIG);
           }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddKidPage');
  }

  async takePhoto() {
   try {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    const result = await this.camara.getPicture(options);

    const image = `data:image/jpeg;base64,${result}`;

    const pictures = storage().ref('pictures');
    pictures.putString(image, 'data_url');
  }
  catch (e) {
    console.error(e);

  }

    // this.camara.getPicture(options).then((imageData) => {
    //   this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
    //   this.imagen64 = imageData;
    // }, (err) => {
    //   // Handle error
    //   console.log( "ERROR EN CAMARA", JSON.stringify(err) );
    // });
  }

  addKid(kid: Kid) {
    console.log(kid)
    this.kids.addKid(kid)
      .then(ref => {
        console.log(ref)
          this.toast.show(`${kid.name} added!`);
          this.navCtrl.setRoot('HomePage', { key: ref.key });
    });
  }

  // crear_post(){
  //
  //   let archivo = {
  //     img: this.imagen64,
  //     titulo: this.titulo
  //   }
  //
  //   this._cap.cargar_imagen_firebase(archivo);
  // }

}
