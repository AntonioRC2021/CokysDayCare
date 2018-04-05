import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Rx";
import { Kid } from "./../../models/kid/kid.model";
import { Foto } from "./../../models/image/image.model";
import { Parent } from "./../../models/parent/parent.model";
import { SecondParent } from "./../../models/second-parent/second-parent.model";
import { Assist } from "./../../models/attendance/attendance.model";

@Injectable()
export class KidService {

  private KidListRef = this.db.list<Kid>('kid-list')

  private ImageListRef = this.db.list<Foto>('image-list')

  private ParentListRef = this.db.list<Parent>('parent-list')

  private SecondParentListRef = this.db.list<SecondParent>('second-parent-list')

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

addSecondParent(secondParent: SecondParent){
  return this.SecondParentListRef.push(secondParent);
}

addParent(parent: Parent){
  return this.ParentListRef.push(parent);
}

addImage(image: Foto){
  return this.ImageListRef.push(image);
}

editKid(kid: Kid) {
  return this.KidListRef.update(kid.key, kid);
}

editParent(parent: Parent) {
  return this.ParentListRef.update(parent.key, parent);
}

editSecondParent(secondParent: SecondParent) {
  return this.SecondParentListRef.update(secondParent.key, secondParent);
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

  getImages() {
    return this.ImageListRef
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    )
  }

  getSecondParents() {
    return this.SecondParentListRef
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
