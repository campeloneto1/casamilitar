import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';

import {SessionService} from '../../services/session.service';
import {PessoasService} from '../../services/pessoas.service';
import {PessoasVeiculosService} from '../../services/pessoas-veiculos.service';
import {VeiculosService} from '../../services/veiculos.service';
import {EnderecosService} from '../../services/enderecos.service';
import {RedesSociaisService} from '../../services/redes-sociais.service';
import {InfluenciasService} from '../../services/influencias.service';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  t: number = 1;
  textfilter = '';
  filedata: any;
  user$: any;
  path = environment.img;
  cpf = false;

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;
  digital$: any;
  foto$: any;
  pass$: any;
  cidades$: any;
  estados$: any;
  tiposredes$: any;
  influencias$: any;
  perfil$: any;

  transportes$: any;
  selected$: any;
  deletevei$: any;
  veiculos$: any;
  cadvei = 0;

  deleteman$: any;
  manifestacoes$: any;
  cadman = 0;

  deleterede$: any;
  redessociais$: any;
  cadrede = 0;

  deletesind$: any;
  sindicatos$: any;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    alcunha: new FormControl(),
    cpf: new FormControl(),
    data_nascimento: new FormControl(),
    mae: new FormControl(),
    pai: new FormControl(),
    influencia_id: new FormControl(),
    telefone1: new FormControl(),
    telefone2: new FormControl(),
    email: new FormControl(),
    cep: new FormControl(),
    estado_id: new FormControl(),
    cidade_id: new FormControl(),

    rua: new FormControl(),
    numero: new FormControl(),
    bairro: new FormControl(),
    complemento: new FormControl(),

    observacao: new FormControl()
  });

  cadformdigital = new FormGroup({
    id: new FormControl(),
    digital: new FormControl()
  });

  cadformfoto = new FormGroup({
    id: new FormControl(),
    foto: new FormControl()
  });

  cadformvei = new FormGroup({
    id: new FormControl(),
    veiculo_id: new FormControl(),
    pessoa_id: new FormControl()
  });

  cadformrede = new FormGroup({
    id: new FormControl(),    
    pessoa_id: new FormControl(),
    rede_social_id: new FormControl(),
    nome: new FormControl()
  });

  constructor(private toastr: ToastrService,
    private http: HttpClient,
      private session: SessionService,  
      private pessoas: PessoasService,
      private pessoasveiculos: PessoasVeiculosService,
      private veiculos: VeiculosService,
      private enderecos: EnderecosService,
      private redessociais: RedesSociaisService,
      private influencias: InfluenciasService,
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

      this.redessociais.index().subscribe(data => {
        this.tiposredes$ = data;
      });

      this.influencias.index().subscribe(data => {
        this.influencias$ = data;
      });
  
      this.pessoas.index2().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }

    
  }  

  getData(){
    this.pessoas.index2().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
    });
  }

  filterdata() {
    if(this.textfilter){
      this.data$ = this.temp$;
      const val = this.textfilter.toLowerCase();

      const temp = this.data$.filter((d: any) => {
        return d.nome.toLowerCase().indexOf(val) !== -1 || d.cpf.toLowerCase().indexOf(val) !== -1 || !val;
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

  getCep(){
    this.enderecos.getCep(this.cadform.value.cep).subscribe(data =>{
      //@ts-ignore  
      this.enderecos.getCidades(data.ibge.substr(0,2)).subscribe(data2 => {
        this.cidades$ = data2 as any;
        
      });
      //@ts-ignore
      this.cadform.controls.rua.patchValue(data.logradouro);
      //@ts-ignore
      this.cadform.controls.complemento.patchValue(data.complemento);
      //@ts-ignore
      this.cadform.controls.bairro.patchValue(data.bairro);
      
      //@ts-ignore
      this.cadform.controls.estado.patchValue(data.ibge.substr(0,2));    
      
      //@ts-ignore
      this.cadform.controls.cidade.patchValue(data.ibge);
      
    });
  }

  getCidades(){
    //console.log(this.cadform.controls.estado.value);
    this.enderecos.getCidades(this.cadform.controls.estado_id.value).subscribe(data => {
      this.cidades$ = data as any;
    });
  }

  checkCpf(){
    this.pessoas.where2(this.cadform.value.cpf).subscribe(data => {
      //@ts-ignore
      if(data[0]){
        this.cpf = true;
        alert('CPF já existe!')
      }
    });
  }

  editar(data: any){
    
    this.enderecos.getCidades(data.estado_id).subscribe(data2 => {
      this.cidades$ = data2 as any;      
    });

    this.cadform.patchValue(data);
  }

  salvar(){
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.pessoas.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
       
          this.showToast('Informações salvas!','Pessoa editada com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao editar, tento novamente mais tarde!',2);
        }
      });
    }else{
      this.pessoas.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
       
          this.showToast('Informações salvas!','Pessoa cadastrada com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
        }
        
      });
    }       
  }

  deletar(data: any){
    this.delete$ = data;
  }

  confirm(id: number){
    this.pessoas.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Pessoa excluida com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  digital(data: any){
    this.digital$ = data;
  }

  foto(data: any){
    this.foto$ = data;
  }

  fileEvent(e: any){
    this.filedata = e.target.files[0];
    //console.log(this.filedata);

    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      myFormData.append('id', this.foto$.id);
      /* Image Post Request */
      this.http.post(environment.url+'pessoas-foto', myFormData, {
      headers: headers
      }).subscribe(data => {
        if(data == 1){
          this.cadformfoto.reset();
          this.getData();
          this.showToast('Edição realizada!','Foto cadastrada com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
        }
    });  
  }

  confirmdigital(){
    this.cadformdigital.controls.id.patchValue(this.digital$.id);
    /*
    this.usuarios.digital(this.cadformdigital.value).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadformfoto.reset();
        this.getData();
        this.showToast('Edição realizada!','Foto cadastrada com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });*/
  }

  getVeiculos(data: any){
    this.selected$ = data;
    this.veiculos$ = data.veiculos;
  }

  deletarveiculo(data: any){
    this.deletevei$ = data;
  }

  cadastroveiculo(){
    this.cadformvei.controls.pessoa_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postPessoaVeiculo(this.cadformvei.value).subscribe(data => {
      if(data == 1){
        this.cadformvei.reset();
        this.getData();
        this.showToast('Edição realizada!','Veículo cadastrado com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
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
    this.pessoasveiculos.deletePessoaVeiculo(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Veículo excluido com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.deletevei$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  getManifestacoes(data: any){
    this.selected$ = data;
    this.manifestacoes$ = data.manifestacoes;
  }

  deletarmanifestacao(data: any){
    this.deleteman$ = data;
  }

  confirmmanifest(id:number){
    this.pessoasveiculos.deletePessoaManifestacao(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Manifestação excluida com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.manifestacoes$ = data.manifestacoes;
        });
        this.deleteman$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  getRedes(data: any){
    this.selected$ = data;
    this.redessociais$ = data.redes_sociais;
  }

  deletarrede(data: any){
    this.deleterede$ = data;
  }

  confirmrede(id:number){
    this.pessoasveiculos.deletePessoaRede(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Rede social excluida com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.redessociais$ = data.redes_sociais;
        });
        this.deleterede$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  cadastroredesocial(){
    this.cadformrede.controls.pessoa_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postPessoaRede(this.cadformrede.value).subscribe(data => {
      if(data == 1){
        this.cadformrede.reset();
        this.getData();
        this.showToast('Edição realizada!','Rede social cadastrada com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.redessociais$ = data.redes_sociais;
        });
        this.cadrede = 0;
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

  getSindicatos(data: any){
    this.selected$ = data;
    this.sindicatos$ = data.sindicatos;
  }

  deletarsind(data: any){
    this.deletesind$ = data;
  }

  confirmsind(id:number){
    this.pessoasveiculos.deleteSindicatoPessoa(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Sindicato excluido com sucesso.',1);
        this.pessoas.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.sindicatos$ = data.sindicatos;
        });
        this.deletesind$ = '';
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }


}
