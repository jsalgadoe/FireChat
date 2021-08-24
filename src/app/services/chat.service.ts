import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mensaje} from "../shared/mensaje.interface";
import { map }  from  'rxjs/operators';
import {pipe} from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
   itemsCollection: AngularFirestoreCollection<Mensaje> | any ;

  public chats:any[] = [];
  public usuario:any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

    this.auth.authState.subscribe(user =>{
      console.log(user);


      this.usuario.nombre =  user?.displayName;

      this.usuario.uid = user?.uid;
    })
  }



  cargarMensaje(){
    this.itemsCollection = this.afs.collection<any>('chats',
        ref => ref.orderBy('fecha','desc').limit(5)
    );
    return this.itemsCollection.valueChanges( ).pipe(

      map( (mensajes:Mensaje[])=>{
        this.chats =  [];
        console.log(mensajes);
        for(let mensaje of mensajes){
          this.chats.unshift(mensaje)
          console.log(mensaje)
        }
        return this.chats;
      })
    )
  }


  addmensaje(texto:string){
    console.log(texto);
     let mensaje:Mensaje = {
      nombre:this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
      }
      return this.itemsCollection.add(mensaje)
  }

  login( proveedor:string) {
    if (proveedor == "google"){
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }else {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

  }
  logout() {
    this.usuario = {}
    this.auth.signOut();
  }

}
