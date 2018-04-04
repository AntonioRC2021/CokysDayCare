import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
// import { CargaArchivoProvider,  } from '../../providers/carga-archivo/carga-archivo';
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
              private camara: Camera,
              private imagePicker: ImagePicker
              // private imageService: CargaArchivoProvider
             ) {}


  ionViewDidLoad() {
    this.kid = this.navParams.get('kid');
    console.log(this.kid)
  }

  async takePhoto() {
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

  const pictures = storage().ref('pictures/myPhoto');
  pictures.putString(image, 'data_url')
  .then(ref => {
      this.kids.editKid({
               lastName: this.kid.lastName,
               name: this.kid.name,
               parentId: this.kid.parentId,
               secondParentId: this.kid.secondParentId,
               imageKey: ref.downloadURL
      })
  })

  }
    catch (e) {
      console.error(e)
    }
  }


  // selectPhoto() {
  //   let options:ImagePickerOptions = {
  //     quality: 70,
  //     outputType: 1,
  //     maximumImagesCount: 1
  //   }
  //
  //   this.imagePicker.getPictures(options).then((results) => {
  //     for (var i = 0; i < results.length; i++) {
  //       // console.log('Image URI: ' + results[i]);
  //       this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
  //     }
  //   }, (err) => {
  //     console.log( "ERROR en selector", JSON.stringify(err) );
  //
  //   });
  // }










//   mostrar_camara() {
//   const options: CameraOptions = {
//     quality: 50,
//     destinationType: this.camara.DestinationType.DATA_URL,
//     encodingType: this.camara.EncodingType.JPEG,
//     mediaType: this.camara.MediaType.PICTURE
//   }
//
//   this.camara.getPicture(options).then((imageData) => {
//     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
//     this.imagen64 = imageData;
//   }, (err) => {
//     // Handle error
//     console.log( "ERROR EN CAMARA", JSON.stringify(err) );
//   });
// }
//
//
//
// crear_post(){
//
//      let archivo = {
//        img: this.imagen64
//      }
//
//      this.imageService.cargar_imagen_firebase(archivo).then(response => {
//        this.kids.editKid({
//          lastName: this.kid.lastName,
//          name: this.kid.name,
//          imageKey: "response"
//        }).then(ref => {
//          console.log("el nino se actualizo ", ref)
//        })
//      });
//
//    }

}
