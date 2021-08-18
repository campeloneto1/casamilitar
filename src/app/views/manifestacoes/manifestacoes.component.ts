import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';
import {environment} from '../../../environments/environment';

import {ManifestacoesService} from '../../services/manifestacoes.service';
import {ManifestacoesTiposService} from '../../services/manifestacoes-tipos.service';
import {PessoasVeiculosService} from '../../services/pessoas-veiculos.service';
import {VeiculosService} from '../../services/veiculos.service';
import {PessoasService} from '../../services/pessoas.service';
import {EnderecosService} from '../../services/enderecos.service';

@Component({
  selector: 'app-manifestacoes',
  templateUrl: './manifestacoes.component.html',
  styleUrls: ['./manifestacoes.component.css']
})
export class ManifestacoesComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  r: number = 1;
  textfilter = '';
  user$: any;
  path = environment.img;
  

  data$: any;
  manifestacoestipos$: any;
  transportes$: any
  pess$: any
  temp$: any;
  form$: any;
  delete$: any;
  cidades$: any;
  estados$: any;
  perfil$: any;

  selected$: any;
  deletevei$: any;
  veiculos$: any;
  cadvei = 0;

  deletepes$: any;
  pessoas$: any;
  cadpes = 0;


  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    data: new FormControl(),
    hora: new FormControl(),
 
    cep: new FormControl(),
    estado_id: new FormControl(),
    cidade_id: new FormControl(),
    rua: new FormControl(),
    numero: new FormControl(),
    bairro: new FormControl(),
    complemento: new FormControl(),
    manifestacao_tipo_id: new FormControl(),
    tipo_id: new FormControl(),

    previa: new FormControl(),
    sintese: new FormControl(),

    observacao: new FormControl()
  });

  cadformvei = new FormGroup({
    id: new FormControl(),
    veiculo_id: new FormControl(),
    manifestacao_id: new FormControl()
  });

  cadformpes = new FormGroup({
    id: new FormControl(),
    pessoa_id: new FormControl(),
    manifestacao_id: new FormControl(),
    veiculo_id: new FormControl(),
    lider: new FormControl()
  });

  constructor(private toastr: ToastrService,

      private manifestacoes: ManifestacoesService,
      private manifestacoestipos: ManifestacoesTiposService,
      private pessoasveiculos: PessoasVeiculosService,
      private session: SessionService,  
      private veiculos: VeiculosService,
      private pessoas: PessoasService,
      private enderecos: EnderecosService,
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;

    if(!this.session.user.perfil.estrategico){
      this.router.navigate(['/inicio']);
    }else{
      this.user$ = this.session.user;
      this.perfil$ = this.session.user.perfil;
      this.enderecos.getEstados().subscribe(data => {
        this.estados$ = data as any;
      });
  
      this.enderecos.getCidades(6).subscribe(data => {
        this.cidades$ = data as any;
      });

      this.veiculos.index().subscribe(data => {
        this.transportes$ = data as any;
      });

      this.pessoas.index().subscribe(data => {
        this.pess$ = data as any;
      });
      
      this.manifestacoestipos.index().subscribe(data => {
        this.manifestacoestipos$ = data;
      });

      this.manifestacoes.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });

    }
  }  

  getData(){
    this.manifestacoes.index().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
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
        return d.nome.toLowerCase().indexOf(val) !== -1 || !val;
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

    this.cadform.patchValue(data);
  }

  salvar(){
    
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.manifestacoes.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Manifestação editada com sucesso.',1);
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
      this.manifestacoes.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Manifestação cadastrada com sucesso.',1);
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
    this.manifestacoes.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Manifestação excluida com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  getPessoas(data: any){
    this.selected$ = data;
    this.pessoas$ = data.pessoas;
  }

  deletarpessoa(data: any){
    this.deletepes$ = data;
  }

  cadastropessoa(){
    this.cadformpes.controls.manifestacao_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postPessoaManifestacao(this.cadformpes.value).subscribe(data => {
      if(data == 1){
        this.cadformpes.reset();
        this.getData();
        this.showToast('Edição realizada!','Pessoa cadastrado com sucesso.',1);
        this.manifestacoes.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.pessoas$ = data.pessoas;
        });
        this.cadpes = 0;
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

  confirmpessoa(id:number){
    this.pessoasveiculos.deletePessoaManifestacao(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Pessoa excluida com sucesso.',1);
        this.manifestacoes.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.pessoas$ = data.pessoas;
        });
        this.deletepes$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  getVeiculos(data: any){
    this.selected$ = data;
    this.veiculos$ = data.veiculos;
  }

  deletarveiculo(data: any){
    this.deletevei$ = data;
  }

  cadastroveiculo(){
    this.cadformvei.controls.manifestacao_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postManifestacaoVeiculo(this.cadformvei.value).subscribe(data => {
      if(data == 1){
        this.cadformvei.reset();
        this.getData();
        this.showToast('Edição realizada!','Veículo cadastrado com sucesso.',1);
        this.manifestacoes.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.cadvei = 0;
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

  confirmveiculo(id:number){
    this.pessoasveiculos.deleteManifestacaoVeiculo(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Veículo excluido com sucesso.',1);
        this.manifestacoes.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.deletevei$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }
}
