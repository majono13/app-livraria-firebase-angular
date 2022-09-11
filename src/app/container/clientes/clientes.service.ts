import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from 'src/app/shared/models/clientes.models';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly clientesCollection: AngularFirestoreCollection<Cliente> = this.afs.collection('clientes')

  constructor(private snackBar: MatSnackBar, private afs: AngularFirestore) { }

  getClientes(): Observable<Cliente[]> {
    return this.clientesCollection.valueChanges();
  }

  addCliente(cliente: Cliente) {
    cliente._id = this.afs.createId();

    return this.clientesCollection.doc(cliente._id).set(cliente);
  }

  editCliente(cliente: Cliente) {
    return this.clientesCollection.doc(cliente._id).set(cliente);
  }
  deleteCliente(cliente: Cliente) {
    return this.clientesCollection.doc(cliente._id).delete();
  }

  notificacao(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 })
  };


}
