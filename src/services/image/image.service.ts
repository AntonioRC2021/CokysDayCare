import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
// import {FirebaseListObservable} from "angularfire2/database-deprecated";
// import { imageUpload } from "../../models/image/image.model";
// import * as firebase from 'firebase';
//
// @Injectable()
// export class UploadImageService {
//
//   private basePath = '/images';
//
//   imageUploads: FirebaseListObservable<imageUpload[]>;
//
//   constructor(private db: AngularFireDatabase) {}
//
//   private saveImageData(imageUpload: imageUpload) {
//   this.db.list(`images`).push(imageUpload);
// }
//
// addImageToFirebase(imageUpload: imageUpload){
//   let promise = new Promise( (resolve, reject)=> {
//
//     let storageRef = firebase.storage().ref();
//     let uploadTask = storageRef.child(`img/${ imageUpload.$key }`).put(File);
//
//   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//       () => {},
//       (error) => {
//         // fail
//         console.log(error)
//       },
//       () => {
//         // success
//         imageUpload.url = uploadTask.snapshot.downloadURL
//         imageUpload.name = imageUpload.file.name
//         this.saveImageData(imageUpload)
//       }
//     );
//
//     })
// }
//
//   getImageUploads(query = {}) {
//     this.imageUploads = this.db.list(this.basePath, {
//       query: query
//     });
//     return this.imageUploads
//   }
// }
