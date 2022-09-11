import { Component, OnInit, Inject } from '@angular/core';

import { Cliente } from 'src/app/shared/models/clientes.models';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-cliente',
  templateUrl: './detalhes-cliente.component.html',
  styleUrls: ['./detalhes-cliente.component.css']
})
export class DetalhesClienteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cliente: Cliente) { }

  ngOnInit() {
  }

}
