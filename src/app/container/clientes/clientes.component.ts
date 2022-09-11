import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { Cliente } from 'src/app/shared/models/clientes.models';
import { ClienteService } from './clientes.service';
import { EditeClienteComponent } from './edite/edite.component';
import { DetalhesClienteComponent } from './detalhes-cliente/detalhes-cliente.component';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  pesquisa: string = '';
  pesquisando: boolean = false;
  resultado: Cliente[] = [];

  clientes: Cliente[] = [];
  load: boolean = true;



  private unsubscribe$: Subject<any> = new Subject()

  constructor(private clientesService: ClienteService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.get();

  };

  get() {
    this.pesquisando = false
    this.clientesService.getClientes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((clientes) => {
        this.clientes = clientes
        this.load = false
      });
  }

  attFavoritos(cliente: Cliente) {

    for (let i in this.clientes) {

      if (this.clientes[i]._id === cliente._id) {
        this.clientes[i].favoritos = !this.clientes[i].favoritos;

        this.clientesService.editCliente(this.clientes[i])
          .then(() => {
            if (this.clientes[i].favoritos) this.clientesService.notificacao('Cliente adicionado aos favoritos!');
            else this.clientesService.notificacao('Cliente removido dos favoritos!');
          }
          );
      }
    }

  }


  openDialogDetails(cliente: Cliente) {

    for (let i in this.clientes) {

      if (this.clientes[i]._id === cliente._id) {
        this.dialog.open(DetalhesClienteComponent, {
          data: this.clientes[i],

        });
      }
    }

  }

  openDialogEdit(cliente: Cliente) {

    for (let i in this.clientes) {

      if (this.clientes[i]._id === cliente._id) {
        this.dialog.open(EditeClienteComponent, {
          data: this.clientes[i],
        }).afterClosed().subscribe(ret => {
          this.get();
        })
      }
    }

  };

  apagar(cliente: Cliente) {

    for (let i in this.clientes) {

      if (this.clientes[i]._id === cliente._id) {
        this.clientesService.deleteCliente(cliente)
          .then(() => {
            this.clientes.splice(Number(i), 1);
            this.clientesService.notificacao('Cliente apagado com sucesso');
          })
          .catch((e) => { this.clientesService.notificacao('Falha ao excluir cliente, tente novamente'); })
      }
    }
  };

  pesquisar() {

    if (this.pesquisa.length >= 3) {
      this.resultado = []
      this.pesquisando = true

      for (let i in this.clientes) {

        if
          (this.clientes[i].email.toUpperCase() == this.pesquisa.toUpperCase()) {
          this.resultado.push(this.clientes[i])
          console.log(this.resultado)
        }
      }
      this.pesquisa = ''
    }

  };

  cancelarPesquisa() {
    this.pesquisando = false
    this.resultado = [];
    this.pesquisa = '';
  };

  ngOnDestroy() {
    this.unsubscribe$.next('')
  }
}
