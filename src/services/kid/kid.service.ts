import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Rx";
import { Kid } from "./../../models/kid/kid.model";
import { Parent } from "./../../models/parent/parent.model";

@Injectable()
export class KidService {

  private KidListRef = this.db.list<Kid>('kid-list')

  private ParentListRef = this.db.list<Parent>('kid-list')


  constructor(private db: AngularFireDatabase) {}

  getKid() {
    return this.KidListRef;
  }

  addKid(kid: Kid){
    return this.KidListRef.push(kid);
  }

  addParent(parent: Parent){
    return this.ParentListRef.push(parent);
  }

  editKid(kid: Kid) {
    return this.KidListRef.update(kid.key, kid);
  }


}
