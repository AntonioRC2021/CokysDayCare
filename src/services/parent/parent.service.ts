import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Parent } from "./../../models/parent/parent.model";

@Injectable()
export class ParentService {

  private ParentListRef = this.db.list<Parent>('parent-list')

  constructor(private db: AngularFireDatabase) {}

  getParent() {
    return this.ParentListRef;
  }

  addKid(parent: Parent){
    return this.ParentListRef.push(parent);
  }

  editKid(parent: Parent) {
    return this.ParentListRef.update(parent.key, parent);
  }


}
