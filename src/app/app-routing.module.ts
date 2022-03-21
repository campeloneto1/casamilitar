import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {LoginComponent} from '../app/views/login/login.component';
import {InicioComponent} from '../app/views/inicio/inicio.component';
import {C1Component} from '../app/views/c1/c1.component';
import {UsuariosComponent} from '../app/views/usuarios/usuarios.component';
import {AcessoComponent} from '../app/views/acesso/acesso.component';
import {GaragemComponent} from '../app/views/garagem/garagem.component';
import {SetoresComponent} from '../app/views/setores/setores.component';
import {OrgaosComponent} from '../app/views/orgaos/orgaos.component';
import {PerfisComponent} from '../app/views/perfis/perfis.component';
import {AcessosComponent} from '../app/views/acessos/acessos.component';
import {AcessosGaragemComponent} from '../app/views/acessos-garagem/acessos-garagem.component';
import {FuncoesComponent} from '../app/views/funcoes/funcoes.component';
import {PostosComponent} from '../app/views/postos/postos.component';
import {LogsComponent} from '../app/views/logs/logs.component';
import {CidadesComponent} from '../app/views/cidades/cidades.component';
import {EstadosComponent} from '../app/views/estados/estados.component';
import {EventosComponent} from '../app/views/eventos/eventos.component';
import {EventosTiposComponent} from '../app/views/eventos-tipos/eventos-tipos.component';
import {EventosPrintComponent} from '../app/views/eventos-print/eventos-print.component';
import {NiveisComponent} from '../app/views/niveis/niveis.component';
import {MarcasComponent} from '../app/views/marcas/marcas.component';
import {ModelosComponent} from '../app/views/modelos/modelos.component';
import {VeiculosComponent} from '../app/views/veiculos/veiculos.component';
import {VeiculoComponent} from '../app/views/veiculo/veiculo.component';
import {ViaturasComponent} from '../app/views/viaturas/viaturas.component';
import {PessoasComponent} from '../app/views/pessoas/pessoas.component';
import {PessoaComponent} from '../app/views/pessoa/pessoa.component';
import {VeiculosTiposComponent} from '../app/views/veiculos-tipos/veiculos-tipos.component';
import {ManifestacoesTiposComponent} from '../app/views/manifestacoes-tipos/manifestacoes-tipos.component';
import {ManifestacoesComponent} from '../app/views/manifestacoes/manifestacoes.component';
import {ManifestacaoComponent} from '../app/views/manifestacao/manifestacao.component';
import {LockscreenComponent} from '../app/views/lockscreen/lockscreen.component';
import {RedesSociaisComponent} from '../app/views/redes-sociais/redes-sociais.component';
import {CoresComponent} from '../app/views/cores/cores.component';
import {EstconsultaComponent} from '../app/views/estconsulta/estconsulta.component';
import {SindicatoComponent} from '../app/views/sindicato/sindicato.component';
import {SindicatosComponent} from '../app/views/sindicatos/sindicatos.component';
import {InfluenciasComponent} from '../app/views/influencias/influencias.component';
import {RelEventosComponent} from '../app/views/relatorios/rel-eventos/rel-eventos.component';
import {RelAcessosComponent} from '../app/views/relatorios/rel-acessos/rel-acessos.component';
import {RelVeiculosComponent} from '../app/views/relatorios/rel-veiculos/rel-veiculos.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inicio',
    canActivate: [AuthGuard],
    component: InicioComponent
  },
  {
    path: 'c1',
    canActivate: [AuthGuard],
    component: C1Component
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    component: UsuariosComponent
  },
  {
    path: 'acesso',
    canActivate: [AuthGuard],
    component: AcessoComponent
  },
  {
    path: 'acessos',
    canActivate: [AuthGuard],
    component: AcessosComponent
  },
  {
    path: 'acessos-garagem',
    canActivate: [AuthGuard],
    component: AcessosGaragemComponent
  },
  {
    path: 'garagem',
    canActivate: [AuthGuard],
    component: GaragemComponent
  },
  {
    path: 'cidades',
    canActivate: [AuthGuard],
    component: CidadesComponent
  },
  {
    path: 'estados',
    canActivate: [AuthGuard],
    component: EstadosComponent
  },
  {
    path: 'setores',
    canActivate: [AuthGuard],
    component: SetoresComponent
  },
  {
    path: 'orgaos',
    canActivate: [AuthGuard],
    component: OrgaosComponent
  },
  {
    path: 'funcoes',
    canActivate: [AuthGuard],
    component: FuncoesComponent
  },
  {
    path: 'perfis',
    canActivate: [AuthGuard],
    component: PerfisComponent
  },
  {
    path: 'postos',
    canActivate: [AuthGuard],
    component: PostosComponent
  },
  {
    path: 'logs',
    canActivate: [AuthGuard],
    component: LogsComponent
  },
  {
    path: 'niveis',
    canActivate: [AuthGuard],
    component: NiveisComponent
  },
  {
    path: 'marcas',
    canActivate: [AuthGuard],
    component: MarcasComponent
  },
  {
    path: 'modelos',
    canActivate: [AuthGuard],
    component: ModelosComponent
  },
  {
    path: 'veiculos/tipos',
    canActivate: [AuthGuard],
    component: VeiculosTiposComponent
  },
  {
    path: 'veiculos',
    canActivate: [AuthGuard],
    component: VeiculosComponent
  },
  {
    path: 'veiculo/:id',
    canActivate: [AuthGuard],
    component: VeiculoComponent
  },
  {
    path: 'viaturas',
    canActivate: [AuthGuard],
    component: ViaturasComponent
  },
  {
    path: 'pessoas',
    canActivate: [AuthGuard],
    component: PessoasComponent
  },
  {
    path: 'pessoa/:id',
    canActivate: [AuthGuard],
    component: PessoaComponent
  },
  {
    path: 'eventos',
    canActivate: [AuthGuard],
    component: EventosComponent
  },
  {
    path: 'eventos/tipos',
    canActivate: [AuthGuard],
    component: EventosTiposComponent
  },
  {
    path: 'manifestacoes/tipos',
    canActivate: [AuthGuard],
    component: ManifestacoesTiposComponent
  },
  {
    path: 'manifestacoes',
    canActivate: [AuthGuard],
    component: ManifestacoesComponent
  },
  {
    path: 'manifestacao/:id',
    canActivate: [AuthGuard],
    component: ManifestacaoComponent
  },
  {
    path: 'redes-sociais',
    canActivate: [AuthGuard],
    component: RedesSociaisComponent
  },
  {
    path: 'cores',
    canActivate: [AuthGuard],
    component: CoresComponent
  },
  {
    path: 'consulta',
    canActivate: [AuthGuard],
    component: EstconsultaComponent
  },
  {
    path: 'influencias',
    canActivate: [AuthGuard],
    component: InfluenciasComponent
  },
  {
    path: 'sindicato/:id',
    canActivate: [AuthGuard],
    component: SindicatoComponent
  },
  {
    path: 'sindicatos',
    canActivate: [AuthGuard],
    component: SindicatosComponent
  },
  {
    path: 'eventos/:id',
    canActivate: [AuthGuard],
    component: EventosPrintComponent
  },
  {
    path: 'relatorios/eventos',
    canActivate: [AuthGuard],
    component: RelEventosComponent
  },
  {
    path: 'relatorios/acessos',
    canActivate: [AuthGuard],
    component: RelAcessosComponent
  },
  {
    path: 'relatorios/viaturas',
    canActivate: [AuthGuard],
    component: RelVeiculosComponent
  },
  {
    path: 'lock',
    canActivate: [AuthGuard],
    component: LockscreenComponent
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: InicioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
