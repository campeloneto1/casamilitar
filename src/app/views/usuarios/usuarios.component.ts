import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';

import {SessionService} from '../../services/session.service';
import {UsuariosService} from '../../services/usuarios.service';
import {EnderecosService} from '../../services/enderecos.service';
import {PerfisService} from '../../services/perfis.service';
import {FuncoesService} from '../../services/funcoes.service';
import {OrgaosService} from '../../services/orgaos.service';
import {PostosService} from '../../services/postos.service';
import {SetoresService} from '../../services/setores.service';
import {PostogradService} from '../../services/postograd.service';
import {NiveisService} from '../../services/niveis.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  loading = true;
  itenspage = 10;
  p: number = 1;
  textfilter = '';
  filedata: any;
  user$: any;
  path = environment.img;

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;
  digital$: any;
  foto$: any;
  pass$: any;
  cidades$: any;
  estados$: any;
  perfis$: any;
  funcoes$: any;
  orgaos$: any;
  postos$: any;
  setores$: any;
  postograd$: any;
  perfil$: any;
  niveis$: any;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    nome_guerra: new FormControl(),
    cpf: new FormControl(),
    data_nascimento: new FormControl(),
    posto_grad_id: new FormControl(),
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
    orgao_id: new FormControl(),
    setor_id: new FormControl(),
    posto_id: new FormControl(),
    perfil_id: new FormControl(),
    nivel_id: new FormControl(),
    funcao_id: new FormControl(),
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

  constructor(private toastr: ToastrService,
    private http: HttpClient,
      private session: SessionService,  
      private usuarios: UsuariosService,
      private perfis: PerfisService,
      private funcoes: FuncoesService,
      private orgaos: OrgaosService,
      private postos: PostosService,
      private setores: SetoresService,
      private postograd: PostogradService,
      private niveis: NiveisService,
      private enderecos: EnderecosService,
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;
  
    if(!this.session.user.perfil.users){
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
  
      this.perfis.index().subscribe(data => {
        this.perfis$ = data as any;
      });
  
      this.orgaos.index2().subscribe(data => {
        this.orgaos$ = data as any;
      });
  
      this.funcoes.index().subscribe(data => {
        this.funcoes$ = data as any;
      });
  
      this.postos.index().subscribe(data => {
        this.postos$ = data as any;
      });
  
      this.postograd.index().subscribe(data => {
        this.postograd$ = data as any;
      });
  
      this.niveis.index().subscribe(data => {
        this.niveis$ = data as any;
      });
  
      this.usuarios.index2().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }

    
  }  

  getData(){
    this.usuarios.index2().subscribe(data => {
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

  getSetores(){
    this.setores.where(this.cadform.value.orgao_id).subscribe(data2 => {
      this.setores$ = data2;
    });
  }

  

  changeAcesso(data: any){
    if(data.acesso == 1){
      this.usuarios.acesso_desativar(data.id).subscribe(data => {
        if(data == 1){
          this.cadform.reset()
          this.getData();
          this.showToast('Informações salvas!','Permissão de acesso retirada com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao permitir acesso, tento novamente mais tarde!',2);
        }
      },
      erro => {
        if(erro.status == 500){
          this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
        }
      });
    }else{
      this.usuarios.acesso_ativar(data.id).subscribe(data => {
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Permissão de acesso concedida com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao permitir acesso, tento novamente mais tarde!',2);
        }
      },
      erro => {
        if(erro.status == 500){
          this.showToast('Informação já cadastrada', 'Verifique se a informação já foi cadastrada.', 2);
        }
      })
    }
  }

  editar(data: any){
    this.setores.where(data.orgao_id).subscribe(data2 => {
      this.setores$ = data2;
    });

    this.enderecos.getCidades(data.estado_id).subscribe(data2 => {
      this.cidades$ = data2 as any;      
    });

    this.cadform.patchValue(data);
  }

  salvar(){
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.usuarios.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Usuário editado com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao editar, tento novamente mais tarde!',2);
        }
      });
    }else{

      if(!this.user$.perfil.administrador || this.user$.perfil.gestor){
        this.cadform.controls.perfil_id.patchValue(2);
        this.cadform.controls.nivel_id.patchValue(1);
      }

      this.usuarios.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Usuário cadastrado com sucesso.',1);
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
    this.usuarios.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Usuário excluido com sucesso.',1);
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
      this.http.post(environment.url+'usuarios-foto', myFormData, {
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

  resetar(data: any){
    this.pass$ = data;
  }

  confirmpass(data: number){
    this.usuarios.reset_password(data).subscribe(data => {
      if(data == 1){
        this.showToast('Edição realizada!','Senha alterada com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

  




}
