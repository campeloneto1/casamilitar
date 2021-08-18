import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import {SessionService} from '../../services/session.service';
import {EnderecosService} from '../../services/enderecos.service';
import {SindicatosService} from '../../services/sindicatos.service';
import {PessoasVeiculosService} from '../../services/pessoas-veiculos.service';
import {VeiculosService} from '../../services/veiculos.service';
import {PessoasService} from '../../services/pessoas.service';

@Component({
  selector: 'app-sindicatos',
  templateUrl: './sindicatos.component.html',
  styleUrls: ['./sindicatos.component.css']
})
export class SindicatosComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  r: number = 1;
  textfilter = '';
  path = environment.img;
  
  

  data$: any;
  cidades$: any;
  estados$: any;
  transportes$: any
  pess$: any
  temp$: any;
  orgaos$: any;
  form$: any;
  delete$: any;

  selected$: any;
  deletevei$: any;
  veiculos$: any;
  cadvei = 0;

  deletepes$: any;
  pessoas$: any;
  cadpes = 0;

  cadform = new FormGroup({
    id: new FormControl(),
    tipo_id: new FormControl(),
    nome: new FormControl(),
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

  cadformvei = new FormGroup({
    id: new FormControl(),
    veiculo_id: new FormControl(),
    sindicato_id: new FormControl()
  });

  cadformpes = new FormGroup({
    id: new FormControl(),
    pessoa_id: new FormControl(),
    sindicato_id: new FormControl(),
    veiculo_id: new FormControl(),
    lider: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private sindicatos: SindicatosService,
      private session: SessionService, 
      private enderecos: EnderecosService,  
      private veiculos: VeiculosService,
      private pessoas: PessoasService,
      private pessoasveiculos: PessoasVeiculosService,
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;
    if(!this.session.user.perfil.estrategico){
      this.router.navigate(['/inicio']);
    }else{
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

      this.sindicatos.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }

  }  

  getData(){
    this.sindicatos.index().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
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
      this.sindicatos.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Sindicato editado com sucesso.',1);
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
      this.sindicatos.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Sindicato cadastrado com sucesso.',1);
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
    this.sindicatos.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Sindicato excluido com sucesso.',1);
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
    this.cadformpes.controls.sindicato_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postSindicatoPessoa(this.cadformpes.value).subscribe(data => {
      if(data == 1){
        this.cadformpes.reset();
        this.getData();
        this.showToast('Edição realizada!','Pessoa cadastrado com sucesso.',1);
        this.sindicatos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.pessoas$ = data.pessoas;
        });
        this.cadpes = 0;
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    });
  }

  confirmpessoa(id:number){
    this.pessoasveiculos.deleteSindicatoPessoa(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Pessoa excluida com sucesso.',1);
        this.sindicatos.find(this.selected$.id).subscribe(data => {
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
    this.cadformvei.controls.sindicato_id.patchValue(this.selected$.id);
    this.pessoasveiculos.postSindicatoVeiculo(this.cadformvei.value).subscribe(data => {
      if(data == 1){
        this.cadformvei.reset();
        this.getData();
        this.showToast('Edição realizada!','Veículo cadastrado com sucesso.',1);
        this.sindicatos.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.veiculos$ = data.veiculos;
        });
        this.cadvei = 0;
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    });
  }

  confirmveiculo(id:number){
    this.pessoasveiculos.deleteSindicatoVeiculo(id).subscribe(data => {
      if(data == 1){
        this.getData();
        this.showToast('Exclusão realizada!','Veículo excluido com sucesso.',1);
        this.sindicatos.find(this.selected$.id).subscribe(data => {
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
