import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Kid } from '../../models/kid/kid.model';
import { Assist } from '../../models/attendance/attendance.model';
import { Foto } from "./../../models/image/image.model";
import { Parent } from '../../models/parent/parent.model';
import { SecondParent } from '../../models/second-parent/second-parent.model';
import { KidService } from '../../services/kid/kid.service';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html',
})
export class EditKidPage {
  kid: Kid;
  parent: Parent;
  secondParent:SecondParent;
  assist: Assist;
  image: Foto;
  isChecked:boolean;


  currentKidAssistences: Assist[] = [];
  todayKidAssistences = [];

  parentsList$: Observable<Parent[]>;

  secondParentsList$: Observable<SecondParent[]>;

  assistsList$: Observable<Assist[]>;

  imagesList$: Observable<Foto[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private edit: KidService,
              private toast: ToastService
            ) {
              this.assistsList$ = this.edit.getAssists();
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

        }

      if(this.kid) {
          this.edit.getSecondParents().subscribe((secondParents: SecondParent[]) => {
            for (let secondParent of secondParents ) {
              if (secondParent.key === this.kid.secondParentId) {
                this.secondParent = secondParent
              }
            }
          })
        }


        if(this.kid) {

          this.edit.getAssists().subscribe((assists: Assist[]) => {


            for (let assist of assists){
              if(assist.kidId === this.kid.key){
                this.assist = assist

                this.currentKidAssistences.push( this.assist );

              }
            }

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
                    console.log(a)

                }  })

            // console.log(this.currentKidAssistences);
            // let todayKidAssistences = [];
            // console.log(todayKidAssistences)


              let mostRecentAssistence = this.todayKidAssistences[0]
              // console.log(mostRecentAssistence)
              for(let i = 1; i < this.todayKidAssistences.length; i ++ ){

              const mostRecentDate = new Date(mostRecentAssistence.date)
              const todayKidDate = new Date(this.todayKidAssistences[i].date)

                if(mostRecentDate < todayKidDate){
                  mostRecentAssistence = this.todayKidAssistences[i];
                  // console.log(mostRecentAssistence);

                }
                // console.log(mostRecentAssistence);
              }
              this.setButton(mostRecentAssistence)


              //
              // function setButton(a) {
              //   if(this.a.actionType === "checkIn"){
              //     this.cdIn = true
              //   } else if(this.a.actionType === "checkOut") {
              //     this.cdIn = false
              //   } else {
              //     this.cdIn = null
              //   }
              // }


          }

        )

}
      }



  setButton(a) {
    if(a.actionType === "checkIn"){
      this.isChecked = true
    } else if (a.actionType === "checkOut") {
      this.isChecked = false
    } else {
      this.isChecked = null
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
    }).then(() => this.isChecked = true)
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
        }).then(() => this.isChecked = false)

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
