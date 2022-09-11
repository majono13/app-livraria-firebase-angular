import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from 'src/app/shared/models/user.models';
import { AutService } from '../aut.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro = this.fb.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha1: ['', [Validators.required, Validators.minLength(6)]],
    senha2: ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchSenha });

  constructor(private fb: FormBuilder, private autService: AutService, private sanckBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  matchSenha(group: FormGroup) {
    if (group) {
      const senha1 = group.controls['senha1'].value;
      const senha2 = group.controls['senha2'].value;

      if (senha1 === senha2) return null
    }

    return { matching: false }
  }

  onSubmit() {
    this.autService.registro({
      nome: this.formRegistro.value.nome,
      sobrenome: this.formRegistro.value.sobrenome,
      email: this.formRegistro.value.email,
      senha: this.formRegistro.value.senha1,
    })
      .subscribe({
        error: (e) => {
          this.sanckBar.open(e.error.message, 'Ok', { duration: 2000 })
        },
        complete: () => {
          this.sanckBar.open('Usuário cadastrado com sucesso!', 'Ok', { duration: 2000 });
          this.router.navigateByUrl('/login')
        }
      })
  }

}
