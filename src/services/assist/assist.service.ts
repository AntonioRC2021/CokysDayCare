// import { Injectable } from '@angular/core';
// import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
// import { Observable, Subject } from "rxjs/Rx";
// import 'rxjs/add/observable/from';
// import { Assist } from "../../models/attendance/attendance.model";
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
//
// @Injectable()
// export class AssistService {
//
//   assists$: AngularFirestoreCollection<Assist[]>;
//   assist$: AngularFireObject<Assist>;
//
//   constructor(private db: AngularFireDatabase,
//               private afs: AngularFirestore) {
//
//     const assists$ = this.afs.collection('assists')
//     // this.assist$ = this.db.object('assist')
//
//     assists$.update()
//
//   }
//
//
//
//   getAssists(checkDate) {
//   //   const assist$= new Subject<string>();
//   //   const queryObservable = assist$.switchMap(assist =>
//   //   this.db.list('assist', ref => ref.where('date', '==', assist)).valueChanges()
//   // );
//
//     // ('date', '==', assist)).valueChanges()
//     // return this.db.list('assists', res => res.where('date', '==', 'checkDate'))
//
//     // return this.db.list('assists', {
//     //   query: {
//     //     orderByChild: 'date',
//     //     equalTo: checkDate
//     //   }
//     // })
//     // .catch(Error);
//   }
//
//   // saveAssist(assist: Assist){
//   //   this.assists$.push(assist)
//   //   .then(_ => console.log('Success'))
//   //   .catch(error => console.log(error));
//   // }
// }
