import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/componentes/header/header.component';
import { MenuComponent } from './shared/componentes/menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { ProdutosComponent } from './container/produtos/produtos.component';
import { FooterComponent } from './shared/componentes/footer/footer.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CadastroComponent } from './container/produtos/cadastro/cadastro.component';
import { DetalhesComponent } from './container/produtos/detalhes/detalhes.component';
import { EditeComponent } from './container/produtos/edite/edite.component';
import { ClientesComponent } from './container/clientes/clientes.component';
import { EditeClienteComponent } from './container/clientes/edite/edite.component';
import { HomeComponent } from './container/home/home.component';
import { DetalhesClienteComponent } from './container/clientes/detalhes-cliente/detalhes-cliente.component';
import { CadastroClienteComponent } from './container/clientes/cadastro-cliente/cadastro-cliente.component';
import { AutenticacaoModule } from './autenticacao/autenticacao.module'

//MATERIAL
import { MaterialModule } from './shared/material.module';
import { AutInterceptor } from './autenticacao/aut.inteceptor';
import { environment } from 'src/environments/environment';
/////

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContainerComponent,
    ProdutosComponent,
    CadastroComponent,
    DetalhesComponent,
    EditeComponent,
    FooterComponent,
    ClientesComponent,
    HomeComponent,
    EditeClienteComponent,
    DetalhesClienteComponent,
    CadastroClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AutenticacaoModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
