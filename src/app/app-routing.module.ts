import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CadastroComponent } from './container/produtos/cadastro/cadastro.component';
import { ProdutosComponent } from './container/produtos/produtos.component';
import { ClientesComponent } from './container/clientes/clientes.component';
import { HomeComponent } from './container/home/home.component';
import { CadastroClienteComponent } from './container/clientes/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { RegistroComponent } from './autenticacao/registro/registro.component';
import { ContainerComponent } from './container/container.component';

import { AutGuard } from './autenticacao/aut-guard.service';

const routes: Routes = [
  {
    path: '', component: ContainerComponent, canActivate: [AutGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'produtos', component: ProdutosComponent },
      { path: 'novo_produto', component: CadastroComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'novo_cliente', component: CadastroClienteComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
