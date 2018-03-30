import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
import { Assist } from '../../models/attendance/attendance.model';
import { Foto } from "./../../models/image/image.model";
// import { Foto } from '../../models/image/image.model';
import { Parent } from '../../models/parent/parent.model';
import { SecondParent } from '../../models/second-parent/second-parent.model';
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
  secondParent:SecondParent;
  imagenPreview: string;
  assist: Assist;
  image: Foto
  cdIn = false;

  // foto: Foto;

  parentsList$: Observable<Parent[]>;

  secondParentsList$: Observable<SecondParent[]>;

  assistsList$: Observable<Assist[]>;

  imagesList$: Observable<Foto[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService,
              private toast: ToastService,

              private imageService: CargaArchivoProvider
            ) {
              this.assistsList$ = this.edit.getAssists();
              this.imagesList$ = this.imageService.getImages();


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

                let kidAssist = this.assist

                // let today = new Date()



                // console.log(kidAssist)
              }
            }
          }))
          if (this.imageService.getImages().subscribe((images: Foto[]) => {
            for (let image of images){
              if(image.kidId === this.kid.key){
                this.image = image
                // console.log(image)
              }
            }
          }))
              this.edit.getSecondParents().subscribe((secondParents: SecondParent[]) => {
                for (let secondParent of secondParents ) {
                  if (secondParent.key === this.kid.secondParentId) {
                    this.secondParent = secondParent
                  }
                }
              })


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

  checkIn(assist: Assist) {
this.edit.addCheck(assist)
  .then(ref => {
    this.edit.addCheck({
      kidId: this.kid.key,
      parentId: this.parent.key,
      date: new Date().toString(),
      actionType: "checkIn"
    })
  }).then(() => this.cdIn = true)

// }).then( _ => {
//   if (this.edit.getAssists().subscribe((assists: Assist[]) => {
//     for (let assist of assists){
//       if(assist.kidId === this.kid.key){
//         this.assist = assist
//
//         let kidAssist = this.assist
//
//         let date = new Date();
//
//         date.getFullYear();
//
//         if (kidAssist === date){
//           if(assist.actionType === "checkIn"){
//             this.cdIn = false
//           }
//         }

        // console.log(kidAssist)
  //     }
    // }
  // })) {

  // }
// })
// }).then(() => this.cdIn = true)


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
        })
        // .then(_ => {
        //   if(this.kid) {
        //     if (this.edit.getAssists().subscribe((assists: Assist[]) => {
        //       for (let assist of assists){
        //         if(assist.date === this.today.getDay().toString()){
        //           if(this.assist.actionType === "checkOut"){
        //             this.cdIn = false
        //
        //           }
        //           // console.log(assist)
        //         }
        //       }
        //     }))
        //   console.log(_)}
        // })
      // }).then(() => this.cdIn = true)

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
