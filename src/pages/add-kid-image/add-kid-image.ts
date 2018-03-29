import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from "../../models/kid/kid.model";
import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider,  } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-add-kid-image',
  templateUrl: 'add-kid-image.html',
})
export class AddKidImagePage {
  kid: Kid;
  imagenPreview: string;
  imagen64: string;
  image: Foto;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera,
              private imageService: CargaArchivoProvider
            ) {}

  ionViewDidLoad() {
    this.kid = this.navParams.get('kid');
    console.log(this.kid)
  }

  mostrar_camara() {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camara.DestinationType.DATA_URL,
    encodingType: this.camara.EncodingType.JPEG,
    mediaType: this.camara.MediaType.PICTURE
  }

  this.camara.getPicture(options).then((imageData) => {
    this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
    this.imagen64 = imageData;
  }, (err) => {
    // Handle error
    console.log( "ERROR EN CAMARA", JSON.stringify(err) );
  });
}

crear_post(image: Foto){

     let archivo = {
       img: this.imagen64,
       kidId: this.kid.key
     }

     this.imageService.cargar_imagen_firebase(archivo);

     this.imageService.addImage(archivo)
     .then(ref => {
       this.toast.show('image added');
       this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         imageKey: ref.key
       })
     
     });
   }

   save(image: Foto) {
     this.imageService.addImage(image)
     .then(ref => {
       this.kids.editKid({
         lastName: this.kid.lastName,
         name: this.kid.name,
         imageKey: ref.key
       }). then(ref =>{
         console.log("el nino se actualizo", ref)
       })
     })
   }


//
// save(image: Foto){
//     console.log(image)
//     this.imageService.addImage(image)
//       .then(ref => {
//           this.toast.show("added!");
//           // this.navCtrl.setRoot('HomePage', { key: ref.key });
//           this.kids.editKid({
//          lastName: this.kid.lastName,
//          name: this.kid.name,
//          imageKey: ref.key,
//           }).then(ref => {
//             console.log("el nino se actualizo ", ref)
//           })
//     });
//   }
}
