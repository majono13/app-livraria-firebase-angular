import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { LivrosService } from 'src/app/container/produtos/livros.service';
import { Livro } from 'src/app/shared/models/livros.models';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  livroForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(3)]],
    preco: ['', [Validators.required, Validators.minLength(1)]],
    categoria: ['', [Validators.required]],
    estoque: ['', [Validators.required, Validators.minLength(1)]],

  })

  @ViewChild('form') form!: NgForm

  novoLivro!: Livro
  private unsubscribe$: Subject<any> = new Subject()

  categorias: string[] = this.livrosService.categorias

  constructor(private fb: FormBuilder, private livrosService: LivrosService) { }

  ngOnInit(): void {
  }


  cancelar() {
    this.form.resetForm()
  }

  submit() {
    this.novoLivro = {
      nome: this.livroForm.value.nome,
      autor: this.livroForm.value.autor,
      preco: this.livroForm.value.preco,
      categoria: this.livroForm.value.categoria,
      estoque: this.livroForm.value.estoque
    }

    this.livrosService.addLivro(this.novoLivro)
      .then(() => {
        this.livrosService.notificacao('Produto Adicionado com sucesso!')
      })
      .catch((e) => {
        this.livrosService.notificacao('Falha ao cadastrar produto')
      })
    //.subscribe(e => this.livrosService.notificacao('Produto Adicionado com sucesso!'))

    this.cancelar()
  }

  ngOnDestroy() {
    this.unsubscribe$.next('')
  }

}
