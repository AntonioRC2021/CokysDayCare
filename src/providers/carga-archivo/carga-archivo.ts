import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivoProvider {

  constructor( public toastCtrl: ToastController) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase( archivo: ArchivoSubir ){

    let promesa = new Promise( (resolve, reject) =>{

    this.mostrar_toast('Cargando..')

    let storeRef = firebase.storage().ref();
    let nombreArchivo:string = new Date().valueOf().toString();

    let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${ nombreArchivo }`)
                .putString( archivo.img, 'base64', { contentType: 'image/jpeg'} );

        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{ },
          ( error ) =>{
            console.log("ERROR EN LA CARGA");
            console.log(JSON.stringify(error));
            this.mostrar_toast(JSON.stringify(error));
            reject();
          },
          ()=>{
            console.log('Archivo subido');
            this.mostrar_toast('Imagen cargada correctamente');

            resolve();
          }

         )

    });

    return promesa;

  }

  mostrar_toast( mensaje: string ){

    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }

}

interface ArchivoSubir{
  titulo:string;
  img: string;
  key?: string;
}
