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


  currentKidAssistences: Assist[] = [];
  todayKidAssistences = [];

  // todayAssistences = [];




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
    let today = new Date();
    let currentYear = today.getFullYear()
    let currentMonth = today.getMonth();
    let currentDay = today.getDate();

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
          this.edit.getSecondParents().subscribe((secondParents: SecondParent[]) => {
            for (let secondParent of secondParents ) {
              if (secondParent.key === this.kid.secondParentId) {
                this.secondParent = secondParent
              }
            }
          })


          this.edit.getAssists().subscribe((assists: Assist[]) => {
            this.currentKidAssistences.forEach( a => {
              let aDate = new Date(a.date);
              let aYear = aDate.getFullYear()
              let aMonth = aDate.getMonth();
              let aDay = aDate.getDate()

                if(a.kidId === this.kid.key &&
                  aYear === currentYear &&
                  aMonth === currentMonth &&
                  aDay === currentDay ){
                    this.todayKidAssistences.push(a);
                    // console.log(todayKidAssistences)

                }  })

            for (let assist of assists){
              if(assist.kidId === this.kid.key){
                this.assist = assist

                this.currentKidAssistences.push( this.assist );

              }
            }

            // console.log(this.currentKidAssistences);
            // let todayKidAssistences = [];
            // console.log(todayKidAssistences)

            // function setButton(a) {
            //   if(this.a.actionType === "checkIn"){
            //     this.cdIn = true
            //   } else if(this.a.actionType === "checkOut") {
            //     this.cdIn = false
            //   } else {
            //     this.cdIn = null
            //   }
            // }

              let mostRecentAssistence = this.todayKidAssistences[0]
              // console.log(mostRecentAssistence)
              for(let i = 1; i < this.todayKidAssistences.length; i ++ ){
                if(mostRecentAssistence.date < this.todayKidAssistences[i]){
                  mostRecentAssistence = this.todayKidAssistences[i];
                  console.log(mostRecentAssistence);

                }
                // console.log(mostRecentAssistence);
                // setButton(mostRecentAssistence)
              }

          }

        )

          // if (this.imageService.getImages().subscribe((images: Foto[]) => {
          //   for (let image of images){
          //     if(image.kidId === this.kid.key){
          //       this.image = image
          //       // console.log(image)
          //     }
          //   }
          // }))


      {}}
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
     .then(() => this.cdIn = true)
  })

// }).then(() => this.cdIn = true)

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
