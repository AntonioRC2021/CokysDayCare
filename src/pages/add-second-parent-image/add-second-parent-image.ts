import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { SecondParent } from "../../models/second-parent/second-parent.model";
import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { storage, initializeApp } from 'firebase'
import { FIREBASE_CONFIG } from "../../app/firebase.credentials";

@IonicPage()
@Component({
  selector: 'page-add-second-parent-image',
  templateUrl: 'add-second-parent-image.html',
})
export class AddSecondParentImagePage {
  kid: Kid;
  secondParent: SecondParent;
  imagenPreview: string;
  image: Foto;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera,
              private imagePicker: ImagePicker
             ) {}


  ionViewDidLoad() {
    this.kid = this.navParams.get('kid');
    this.secondParent = this.navParams.get('secondParent');
    console.log(this.kid)
    console.log(this.secondParent)
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

  const pictures = storage().ref().child(`secondParentPictures/${this.kid.secondParentId}`).putString(image, 'data_url', {contentType: 'image/jpeg'})
  .then ( ref => {
          this.toast.show(`${ref.downloadURL} added!`);
          this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         key: this.kid.key,
         secondParentId: this.kid.secondParentId,
         secondParentImageKey: ref.downloadURL
       })

}) }
    catch (e) {
      console.error(e)
    }
  }

}
