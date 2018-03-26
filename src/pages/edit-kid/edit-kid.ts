import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
import { Assist } from '../../models/attendance/attendance.model';
import { Foto } from "./../../models/image/image.model";
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Foto } from '../../models/image/image.model';
import { Parent } from '../../models/parent/parent.model';
import { KidService } from '../../services/kid/kid.service';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs/Observable';
import { CargaArchivoProvider,  } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage {
  kid: Kid;
  parent: Parent;
  assist: Assist;
  image: Foto
  cdIn = false;
  imagenPreview: string;
  imagen64: string;
  // foto: Foto;

  parentsList$: Observable<Parent[]>;
  assistsList$: Observable<Assist[]>;
  imagesList$: Observable<Foto[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService,
              private toast: ToastService,
              private camara: Camera,
              private imageService: CargaArchivoProvider
            ) {
              this.assistsList$ = this.edit.getAssists();
            }

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
          })
          if (this.edit.getAssists().subscribe((assists: Assist[]) => {
            for (let assist of assists){
              if(assist.kidId === this.kid.key){
                this.assist = assist
                // console.log(assist)
              }
            }
          }))
          if (this.imageService.getImages().subscribe((images: Foto[]) => {
            for (let image of images){
              if(image.key === this.kid.imageKey){
                this.image = image
                console.log(image)
              }
            }
          })){

          };
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

crear_post(){

     let archivo = {
       img: this.imagen64,
       kidid: this.kid.key
     }

     this.imageService.cargar_imagen_firebase(archivo);
   }


  checkIn(assist: Assist) {
this.edit.addCheck(assist)
  .then(ref => {
    this.edit.addCheck({
      kidId: this.kid.key,
      parentId: this.parent.key,
      date: new Date().toString(),
      actionType: "checkIn"
    }).then(() => this.cdIn = true)
  })

  //   if(this.kid){
  //     this.edit.addCheck(assist)
  //       .then(ref => {
  //         console.log(ref)
  //       })
  //   } else {
  //
  //
  // }
  // this.edit.editKid(this.kid).then((res) => {
  //   this.kid.isChecked = true;
  //   this.cdIn = true;
  // })
}

  checkOut(assist: Assist) {
    this.edit.addCheck(assist)
      .then(ref => {
        this.edit.addCheck({
          kidId: this.kid.key,
          parentId: this.parent.key,
          date: new Date().toString(),
          actionType: "checkOut"
        }).then(() => this.cdIn = false)
      })
  //   // this.edit.editKid(this.kid).then((res) => {
  //   //   this.kid.isChecked = false;
  //   //   this.cdIn = false;
  //   // })
  }

  saveKid(kid: Kid) {
    this.edit.editKid(kid).then((res) => {
      this.toast.show(`${kid.name} saved!`);
      this.navCtrl.setRoot('HomePage');
    })
  }



}
