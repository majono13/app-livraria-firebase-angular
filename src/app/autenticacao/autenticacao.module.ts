import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoComponent } from './autenticacao.component';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from '../shared/material.module';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutInterceptor } from './aut.inteceptor';


@NgModule({
  declarations: [
    AutenticacaoComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AutenticacaoModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AutenticacaoModule,
      providers: [
        AutInterceptor
      ]
    }
  }
}
