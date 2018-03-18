import {Injectable, Inject} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable, Subject} from "rxjs/Rx";
import {FirebaseApp} from 'angularfire2';
import {Http} from "@angular/http";

@Injectable()
export class ParentService {

  constructor(private db:AngularFireDatabase,
              @Inject(FirebaseApp) fb: FirebaseApp,
              private http:Http) {}

  sdkDb:any;

  parents: Parent[] = [];

  private addParent( name:string, lastName:string, key?: string ){

    let post: Parent = {
      name: name,
      lastName: lastName,
      key: key
    };

    console.log( JSON.stringify(post) );

    this.db.object(`/post/${ key }`).update(post);

    this.parents.push( post );

  }

  // addNewParent(kidId:string, parent:any): Observable<any> {
  //
  //        const parentToSave = Object.assign({}, parent, {kidId});
  //
  //        const newLessonKey = this.sdkDb.child('parents').push().key;
  //
  //        let dataToSave = {};
  //
  //
  //
  //        return this.firebaseUpdate(dataToSave);
  //    }
  //
  //    firebaseUpdate(dataToSave) {
  //       const subject = new Subject();
  //
  //       this.sdkDb.update(dataToSave)
  //           .then(
  //               val => {
  //                   subject.next(val);
  //                   subject.complete();
  //
  //               },
  //               err => {
  //                   subject.error(err);
  //                   subject.complete();
  //               }
  //           );
  //
  //       return subject.asObservable();
  //   }



}

interface Parent{
  name: string;
  lastName: string;
  key?: string;
}
