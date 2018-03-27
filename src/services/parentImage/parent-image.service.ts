import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable( )
export class ParentImageService {

  imagenes: Foto[] = [];

  private ImageListRef = this.afDB.list<Foto>('parentImage-list')

  constructor( public toastCtrl: ToastController,
               public afDB: AngularFireDatabase) {
    console.log('Hello Parent Image');
  }

  cargar_imagen_firebase( archivo: Foto){

    let promesa = new Promise( (resolve, reject) => {

      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`aparentImage/${ nombreArchivo }`)
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

    this.afDB.object(`/parentImage-list/${ nombreArchivo }`).update(post);

    this.imagenes.push( post );

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

interface Foto{
  img: string;
  key?:string;
}
