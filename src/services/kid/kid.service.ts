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


  constructor(private db: AngularFireDatabase) {}

//   findKidByKidId(kidKey:string): Observable<Assist> {
//     return this.db.list('assist-list', ref => ref.where('kidId', '==', kidKey))
//   .map(results => results[0]);
// }


addKid(kid: Kid){
  return this.KidListRef.push(kid);
}

addCheck(assist: Assist){
  return this.AssistListRef.push(assist);
}

addParent(parent: Parent){
  return this.ParentListRef.push(parent);
}

editKid(kid: Kid) {
  return this.KidListRef.update(kid.key, kid);
}
editAssist(assist: Assist) {
  return this.AssistListRef.update(assist.key, assist);
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




}
