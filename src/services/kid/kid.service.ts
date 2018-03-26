import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Rx";
import { Kid } from "./../../models/kid/kid.model";
import { Parent } from "./../../models/parent/parent.model";
import { Assist } from "./../../models/attendance/attendance.model";

@Injectable()
export class KidService {

  private KidListRef = this.db.list<Kid>('kid-list')

  private ParentListRef = this.db.list<Parent>('parent-list')

  private AssistListRef = this.db.list<Assist>('assist-list')
  // .valueChanges().subscribe(console.log);



  constructor(private db: AngularFireDatabase) {
    // this.assists = this.afs.collection('assist-list').valueChanges();

    // const collection: AngularFirestoreCollection<Assist> = afs.collection('assist-list')

    // collection.update(data)
    // collection.delete()
}


//   findKidByKidId(dateCheck): Observable<Assist> {
//
//     return this.db.list('assist-list', ref => ref.orderBy(date))
//   //   return afList.queryref => ref.where('date', '==', dateCheck))
//   // .map(results => results[0]);
// }


addKid(kid: Kid){
  return this.KidListRef.push(kid);
}

addCheck(assist: Assist){
  return this.AssistListRef.push(assist);
  // const afList = this.db.list('assist-list');
  // afList.push(assist);
  // const listObservable = afList.snapshotChanges();
  // listObservable.subscribe();
  // return this.AssistListRef(assist);
}

// getAssists(){

  // this.assists = this.afs.collection('assist-list').valueChanges();
  //
  // return this.assists

// this.afs.collection('assist-list', ref => ref.orderBy("date") )

  // const afList = this.db.list('assist-list');
  // afList.push(assist);
  // const listObservable = afList.snapshotChanges();
  // listObservable.subscribe();
  // return this.AssistListRef.push(assist);
// }

addParent(parent: Parent){
  return this.ParentListRef.push(parent);
}

editKid(kid: Kid) {
  return this.KidListRef.update(kid.key, kid);
}

  getKids() {
    return this.KidListRef
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

  getParents() {
    return this.ParentListRef
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

  getAssists() {
    return this.AssistListRef
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()

        }))
      }
    )
  }




}
