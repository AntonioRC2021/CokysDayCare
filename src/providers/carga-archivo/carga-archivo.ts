import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Foto } from "../../models/image/image.model";

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable( )
export class CargaArchivoProvider {

  imagenes: Foto[] = [];

  private ImageListRef = this.afDB.list<Foto>('image-list')

  constructor( public toastCtrl: ToastController,
               public afDB: AngularFireDatabase) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase( archivo: Foto){

    let promesa = new Promise( (resolve, reject) => {

      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`img/${ nombreArchivo }`)
                  .putString( archivo.img, 'base64', { contentType: 'image/jpeg' });

                  uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                    ()=>{ },
                    ( error ) =>{
                      console.log("ERROR EN LA CARGA");
                      console.log(JSON.stringify( error ));
                      this.mostrar_toast(JSON.stringify(error));
                      reject();
                    },
                    ()=>{
                      console.log('Archivo subido');
                      this.mostrar_toast('Imagen cargada correctamente');

                      let url = uploadTask.snapshot.downloadURL;

                      this.crear_post( url, nombreArchivo );

                      resolve();
                    }

                  )
            });

            return promesa;

          }

  private crear_post( url: string, nombreArchivo:string ){

    let post: Foto = {
      img: url,
      key: nombreArchivo
    };

    console.log( JSON.stringify(post) );

    this.afDB.object(`/image-list/${ nombreArchivo }`).update(post);

    this.imagenes.push( post );

  }

  addImage(image: Foto){
  return this.ImageListRef.push(image);
}

  mostrar_toast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
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

}
//
// interface Foto{
//   img?: string;
//   key?:string;
// }
