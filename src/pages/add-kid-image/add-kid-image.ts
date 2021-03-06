import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase'
import { FIREBASE_CONFIG } from "../../app/firebase.credentials";

@IonicPage()
@Component({
  selector: 'page-add-kid-image',
  templateUrl: 'add-kid-image.html',
})
export class AddKidImagePage {
  kid: Kid;
  imagenPreview: string;
  // imagen64: string;
  image: Foto;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera
             ) {}


  ionViewDidLoad() {
    this.kid = this.navParams.get('kid');
    console.log(this.kid)
  }

  async takePhoto(image: Foto) {
   try {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }

  const result =  await this.camara.getPicture(options)

  const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref().child(`pictures/${this.kid.name}"`).putString(image, 'data_url', {contentType: 'image/jpeg'})
  .then ( ref => {
          this.toast.show(`${ref.downloadURL} added!`);
          this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         parentId: this.kid.parentId,
         key: this.kid.key,
         imageKey: ref.downloadURL
       })

}) }
    catch (e) {
      console.error(e)
    }
  }

}
