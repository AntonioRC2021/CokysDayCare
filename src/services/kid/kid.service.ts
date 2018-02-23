import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Kid } from "./../../models/kid/kid.model";

@Injectable()
export class KidService {

  private KidListRef = this.db.list<Kid>('kid-list')

  constructor(private db: AngularFireDatabase) {}

  getKid() {
    return this.KidListRef;
  }

  addKid(kid: Kid){
    return this.KidListRef.push(kid);
  }

  editKid(kid: Kid) {
    return this.KidListRef.update(kid.key, kid);
  }


}
