import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import {SessionService} from '../../services/session.service';
import {EventosService} from '../../services/eventos.service';
import {OrgaosService} from '../../services/orgaos.service';
import {SetoresService} from '../../services/setores.service';
import {EventosTiposService} from '../../services/eventos-tipos.service';
import {EventosUsuariosService} from '../../services/eventos-usuarios.service';
import {EventosViaturasService} from '../../services/eventos-viaturas.service';
import {UsuariosService} from '../../services/usuarios.service';
import {VeiculosService} from '../../services/veiculos.service';
import {EnderecosService} from '../../services/enderecos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  textfilter = '';
  

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;
  
  selected$: any;

  orgaos$: any;
  setores$: any;
  eventostipos$: any;
  perfil$: any;
  cidades$: any;
  estados$: any;

  transportes$: any;
  usuarios$: any;
  deleteusu$: any;
  pessoas$: any;
  viaturas$: any;
  deletevei$: any;
  caduser = 0;
  cadvei = 0;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    orgao_id: new FormControl(),
    setor_id: new FormControl(),
    evento_tipo_id: new FormControl(),
    cidade_id: new FormControl(),
    estado_id: new FormControl(),
    observacao: new FormControl(),
    data: new FormControl(),
    hora: new FormControl()
  });

  cadformusu = new FormGroup({
    user_id: new FormControl(),
    evento_id: new FormControl(),
    id: new FormControl()
  });

  cadformvei = new FormGroup({
    viatura_id: new FormControl(),
    evento_id: new FormControl(),
    id: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private session: SessionService, 
      private orgaos: OrgaosService,  
      private usuarios: UsuariosService,  
      private setores: SetoresService,
      private veiculos: VeiculosService,
      private eventostipos: EventosTiposService,
      private eventosusuarios: EventosUsuariosService,
      private eventosviaturas: EventosViaturasService,
      
      private enderecos: EnderecosService,
      private eventos: EventosService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;
    

    if(!this.session.user.perfil.eventos){
      this.router.navigate(['/inicio']);
    }else{
      this.perfil$ = this.session.user.perfil;
      this.orgaos.index().subscribe(data => {
        this.orgaos$ = data;
      });
  
      this.usuarios.index2().subscribe(data => {
        this.usuarios$ = data;
      });

      this.veiculos.index().subscribe(data => {
        this.transportes$ = data;
      });
  
      this.eventostipos.index().subscribe(data => {
        this.eventostipos$ = data;
      });
  
      this.enderecos.getEstados().subscribe(data => {
        this.estados$ = data as any;
      });
  
      this.eventos.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }

    
  }  

  getData(){
    this.eventos.index().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
    });
  }

  getSetores(){
    this.setores.where(this.cadform.value.orgao_id).subscribe(data => {
      this.setores$ = data;
    });
  }

  getCidades(){
    //console.log(this.cadform.controls.estado.value);
    this.enderecos.getCidades(this.cadform.controls.estado_id.value).subscribe(data => {
      this.cidades$ = data as any;
    });
  }

  filterdata() {
    if(this.textfilter){
      this.data$ = this.temp$;
      const val = this.textfilter.toLowerCase();

      const temp = this.data$.filter((d: any) => {
        return d.nome.toLowerCase().indexOf(val) !== -1 || d.setor.nome.toLowerCase().indexOf(val) !== -1 || d.orgao.nome.toLowerCase().indexOf(val) !== -1 || d.eventotipo.nome.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.data$ = temp;
    }else{
      this.data$ = this.temp$;
    }
    
  }

  showToast(data1: string, data2: string, tipo: number) {
    if(tipo == 1){
      this.toastr.success(data2, data1);
    }else if(tipo == 2){
      this.toastr.error(data2, data1);
    }else if(tipo == 3){
      this.toastr.info(data2, data1);
    }else if(tipo == 4){
      this.toastr.warning(data2, data1);
    }
  }

  editar(data: any){
    this.setores.where(data.orgao_id).subscribe(data => {
      this.setores$ = data;
    });

    this.enderecos.getCidades(data.estado_id).subscribe(data2 => {
      this.cidades$ = data2 as any;      
    });
    this.cadform.patchValue(data);

    
  }

  salvar(){
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.eventos.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Evento editado com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao editar, tento novamente mais tarde!',2);
        }
      },
      erro => {
        if(erro.status == 500){
          this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
        }
      });
    }else{
      this.eventos.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Evento cadastrado com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
        }
        
      },
      erro => {
        if(erro.status == 500){
          this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
        }
      });
    }       
  }

  deletar(data: any){
    this.delete$ = data;
  }

  confirm(id: number){
    this.eventos.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Evento excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }


  getUsuarios(data: any){
    this.pessoas$ = data.usuarios;
    this.selected$ = data;
  }

  cadastrousuario(){
    this.cadformusu.controls.evento_id.patchValue(this.selected$.id);
    //console.log(this.cadformusu.value);
    
    this.eventosusuarios.post(this.cadformusu.value).subscribe(data => {
      if(data == 1){
        this.caduser = 0;
        this.cadformusu.reset();
        this.getData();
        this.eventos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.pessoas$ = data.usuarios;
        });
        this.showToast('Cadastro realizado!','Pessoa cadastrada com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    });
  }

  deletarpessoa(data: any){
    this.deleteusu$ = data;
  }

  confirmpessoa(data: number){
    this.eventosusuarios.delete(data).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.deleteusu$ = '';
        this.getData();
        this.eventos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.pessoas$ = data.usuarios;
        });
        this.showToast('Exclusão realizada!','Pessoa excluida com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    },
    erro => {
      if(erro.status == 500){
        this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
      }
    });
  }

  getViaturas(data: any){
    this.viaturas$ = data.viaturas;
    this.selected$ = data;
  }

  cadastroveiculo(){
    this.cadformvei.controls.evento_id.patchValue(this.selected$.id);
    //console.log(this.cadformusu.value);
    
    this.eventosviaturas.post(this.cadformvei.value).subscribe(data => {
      if(data == 1){
        this.cadvei = 0;
        this.cadformvei.reset();
        this.getData();
        this.eventos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.showToast('Cadastro realizado!','Veículo cadastrado com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    },
    erro => {
      if(erro.status == 500){
        this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
      }
    });
  }

  deletarveiculo(data: any){
    this.deletevei$ = data;
  }

  confirmveiculo(data: number){
    this.eventosviaturas.delete(data).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.deletevei$ = '';
        this.getData();
        this.eventos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.showToast('Exclusão realizada!','Veículo excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

}
