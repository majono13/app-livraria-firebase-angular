import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

import { LivrosService } from 'src/app/container/produtos/livros.service';
import { Livro } from 'src/app/shared/models/livros.models';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css']
})
export class EditeComponent implements OnInit {

  livroEdite = this.fb.group({
    nome: [this.livro.nome, [Validators.required, Validators.minLength(3)]],
    autor: [this.livro.autor, [Validators.required, Validators.minLength(3)]],
    preco: [this.livro.preco, [Validators.required, Validators.minLength(1)]],
    categoria: [this.livro.categoria, [Validators.required]],
    estoque: [this.livro.estoque, [Validators.required, Validators.minLength(1)]],

  })

  livroEditado!: Livro

  @ViewChild('form') form!: NgForm


  categorias: string[] = this.livrosService.categorias

  constructor(private fb: FormBuilder, private livrosService: LivrosService, @Inject(MAT_DIALOG_DATA) public livro: Livro, private dialogRef: MatDialogRef<EditeComponent>) { }

  ngOnInit(): void {
    this.livroEdite.value.nome = this.livro.nome
  }

  submit() {

    this.livroEditado = {
      nome: this.livroEdite.value.nome,
      autor: this.livroEdite.value.autor,
      preco: this.livroEdite.value.preco,
      categoria: this.livroEdite.value.categoria,
      estoque: this.livroEdite.value.estoque,
      _id: this.livro._id
    }

    this.livrosService.editLivro(this.livroEditado)
      .then(() => {
        this.livrosService.notificacao('Produto editado com sucesso');
      })
      .catch((e) => {
        this.livrosService.notificacao('Falha ao editar produto, tente novamente');
      })

    this.cancelar()
  }

  cancelar() {
    this.dialogRef.close()
  }
}
