import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Parent } from "../../models/parent/parent.model";
import { Foto } from "../../models/image/image.model";
import { KidService } from "../../services/kid/kid.service";
import { ToastService } from "../../services/toast/toast.service";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ParentImageService  } from '../../services/parentImage/parent-image.service';

@IonicPage()
@Component({
  selector: 'page-add-parent-image',
  templateUrl: 'add-parent-image.html',
})
export class AddParentImagePage {
  parent: Parent;
  imagenPreview: string;
  imagen64: string;
  image: Foto;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private kids: KidService,
              private toast: ToastService,
              private camara: Camera,
              private imageService: ParentImageService
            ) {}

  ionViewDidLoad() {
    this.parent = this.navParams.get('parent');
    console.log(this.parent)
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
       img: this.imagen64
     }

     this.imageService.cargar_imagen_firebase(archivo);
     // .then(ref => {
     //   this.toast.show('image added');
     //   this.kids.editKid({
     //     lastName: this.kid.lastName,
     //     name: this.kid.name,
     //     imageKey: ref.key
     //   })
     //
     // });
   }


//
// save(image: Foto){
//     console.log(image)
//     this.imageService.cargar_imagen_firebase(archivo)
//       .then(ref => {
//           this.toast.show(`${parent.name} added!`);
//           // this.navCtrl.setRoot('HomePage', { key: ref.key });
//           this.kids.editKid({
//          lastName: this.kid.lastName,
//          name: this.kid.name,
//          parentId: ref.key,
//          key: this.kid.key
//           }).then(ref => {
//             console.log("el nino se actualizo ", ref)
//           })
//     });
//   }
}
