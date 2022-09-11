import { Injectable } from '@angular/core';

import { Livro } from '../../shared/models/livros.models';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly livrosCollection: AngularFirestoreCollection<Livro> = this.afs.collection('produtos')

  readonly categorias: string[] = [
    'Terror', 'Ação', 'Comédia', 'Didático', 'Autoconhecimento', 'Fantasia', 'Romance', 'Infantil', 'Fábulas', 'Contos', 'Drama', 'Clássicos'
  ]

  constructor(private snackBar: MatSnackBar, private afs: AngularFirestore) { }

  getLivro(): Observable<Livro[]> {
    return this.livrosCollection.valueChanges();
  }

  deleteLivro(livro: Livro) {
    return this.livrosCollection.doc(livro._id).delete();
  }

  addLivro(livro: Livro) {
    livro._id = this.afs.createId();

    return this.livrosCollection.doc(livro._id).set(livro);
  }

  editLivro(livro: Livro) {
    return this.livrosCollection.doc(livro._id).set(livro);
  }

  notificacao(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 })
  }


}
