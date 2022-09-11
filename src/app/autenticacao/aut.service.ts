import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import { signInWithRedirect, getAuth, getRedirectResult, GoogleAuthProvider, UserCredential } from "firebase/auth";

import { Observable, map, catchError, of, from, switchMap, throwError } from 'rxjs';

import { User } from '../shared/models/user.models';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AutService {

  private readonly userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) { }

  registro(user: User): Observable<boolean> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.senha))
      .pipe(
        switchMap((u: any) =>
          this.userCollection.doc(u.user.uid).set({ ...user, _id: u.user.uid })
            .then(() => true)
        )
      )
  }

  login(credenciais: { email: string, senha: string }) {
    return from(this.afAuth.signInWithEmailAndPassword(credenciais.email, credenciais.senha))
      .pipe(
        switchMap((user: any) => this.userCollection.doc<User>(user.user.uid).valueChanges()),
        catchError((err) => throwError(() => err))
      )
  }

  estaAutenticado(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(u => (u) ? true : false)
      )
  }

  getUser(): Observable<User> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      )
  }

  logout() {
    this.afAuth.signOut();
  }

  loginGoogle() {
    const auth_ = getAuth();
    const provider = new GoogleAuthProvider()

    signInWithRedirect(auth_, provider)
  }

  ResultadoGoogleLogin() {
    const auth_ = getAuth();
    getRedirectResult(auth_)
      .then((u) => {
        this.router.navigateByUrl('/')
        this.salvaUserDoGoogle(u)
      })
      .catch((err) => {
        this.snackBar.open('Falha ao tentar logar', 'Ok', { duration: 3000 });
      })
  }

  salvaUserDoGoogle(u: UserCredential) {
    this.userCollection.doc(u.user.uid).set({
      nome: u.user.displayName,
      sobrenome: '',
      email: u.user.email,
      senha: ''
    });
  }
}
