import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Cliente } from 'src/app/shared/models/clientes.models';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css']
})
export class EditeClienteComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  clienteEditado!: Cliente;

  clienteEdite = this.fb.group({
    nome: [this.cliente.nome, [Validators.required, Validators.minLength(3)]],
    sobrenome: [this.cliente.sobrenome, [Validators.required, Validators.minLength(3)]],
    email: [this.cliente.email, [Validators.required, Validators.email]],
    telefone: [this.cliente.telefone, [Validators.required, Validators.minLength(11)]]
  })

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public cliente: Cliente, private dialogRef: MatDialogRef<EditeClienteComponent>, private clientesService: ClienteService) { }

  ngOnInit(): void {
  }

  submit() {
    this.clienteEditado = {

      nome: this.clienteEdite.value.nome,
      sobrenome: this.clienteEdite.value.sobrenome,
      email: this.clienteEdite.value.email,
      telefone: this.clienteEdite.value.telefone,
      favoritos: this.cliente.favoritos,
      _id: this.cliente._id
    };

    this.clientesService.editCliente(this.clienteEditado)
      .then((() => this.clientesService.notificacao('Cliente editado com sucesso')))
      .catch((() => this.clientesService.notificacao('Falha ao editar cliente')))
    this.cancelar()
  }

  cancelar() {
    this.dialogRef.close();
  }

}
