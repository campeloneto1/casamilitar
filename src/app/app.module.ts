import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './views/login/login.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { FooterComponent } from './views/footer/footer.component';
import { C1Component } from './views/c1/c1.component';
import { ControlbarComponent } from './views/controlbar/controlbar.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { AcessoComponent } from './views/acesso/acesso.component';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSelectModule } from 'ngx-select-ex';
import { SetoresComponent } from './views/setores/setores.component';
import { OrgaosComponent } from './views/orgaos/orgaos.component';
import { FuncoesComponent } from './views/funcoes/funcoes.component';
import { PerfisComponent } from './views/perfis/perfis.component';
import { AcessosComponent } from './views/acessos/acessos.component';
import { PostosComponent } from './views/postos/postos.component';
import { LogsComponent } from './views/logs/logs.component';
import { CidadesComponent } from './views/cidades/cidades.component';
import { EstadosComponent } from './views/estados/estados.component';
import { EventosComponent } from './views/eventos/eventos.component';
import { EventosTiposComponent } from './views/eventos-tipos/eventos-tipos.component';
import { LocaisComponent } from './views/locais/locais.component';
import { EventosPrintComponent } from './views/eventos-print/eventos-print.component';
import { RelEventosComponent } from './views/relatorios/rel-eventos/rel-eventos.component';
import { RelAcessosComponent } from './views/relatorios/rel-acessos/rel-acessos.component';
import { NiveisComponent } from './views/niveis/niveis.component';
import { LockscreenComponent } from './views/lockscreen/lockscreen.component';
import { MarcasComponent } from './views/marcas/marcas.component';
import { ModelosComponent } from './views/modelos/modelos.component';
import { VeiculosComponent } from './views/veiculos/veiculos.component';
import { VeiculosTiposComponent } from './views/veiculos-tipos/veiculos-tipos.component';
import { RelVeiculosComponent } from './views/relatorios/rel-veiculos/rel-veiculos.component';
import { ViaturasComponent } from './views/viaturas/viaturas.component';
import { PessoasComponent } from './views/pessoas/pessoas.component';
import { PessoaComponent } from './views/pessoa/pessoa.component';
import { ManifestacoesTiposComponent } from './views/manifestacoes-tipos/manifestacoes-tipos.component';
import { ManifestacoesComponent } from './views/manifestacoes/manifestacoes.component';
import { RedesSociaisComponent } from './views/redes-sociais/redes-sociais.component';
import { ManifestacaoComponent } from './views/manifestacao/manifestacao.component';
import { CoresComponent } from './views/cores/cores.component';
import { InfluenciasComponent } from './views/influencias/influencias.component';
import { SindicatosComponent } from './views/sindicatos/sindicatos.component';

import { SindicatoComponent } from './views/sindicato/sindicato.component';
import { VeiculoComponent } from './views/veiculo/veiculo.component';
import { EstconsultaComponent } from './views/estconsulta/estconsulta.component';
import { SafePipe } from './safe.pipe';
import { GaragemComponent } from './views/garagem/garagem.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    C1Component,
    ControlbarComponent,
    UsuariosComponent,
    AcessoComponent,
    SetoresComponent,
    OrgaosComponent,
    FuncoesComponent,
    PerfisComponent,
    AcessosComponent,
    PostosComponent,
    LogsComponent,
    CidadesComponent,
    EstadosComponent,
    EventosComponent,
    EventosTiposComponent,
    LocaisComponent,
    EventosPrintComponent,
    RelEventosComponent,
    RelAcessosComponent,
    NiveisComponent,
    LockscreenComponent,
    MarcasComponent,
    ModelosComponent,
    VeiculosComponent,
    VeiculosTiposComponent,
    RelVeiculosComponent,
    ViaturasComponent,
    PessoasComponent,
    PessoaComponent,
    ManifestacoesTiposComponent,
    ManifestacoesComponent,
    RedesSociaisComponent,
    ManifestacaoComponent,
    CoresComponent,
    InfluenciasComponent,
    SindicatosComponent,
    SindicatoComponent,
    VeiculoComponent,
    EstconsultaComponent,
    SafePipe,
    GaragemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    NgxSelectModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
