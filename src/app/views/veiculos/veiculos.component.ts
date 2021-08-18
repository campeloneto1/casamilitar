import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {environment} from '../../../environments/environment';

import {SessionService} from '../../services/session.service';
import {VeiculosService} from '../../services/veiculos.service';
import {PessoasService} from '../../services/pessoas.service';
import {MarcasService} from '../../services/marcas.service';
import {ModelosService} from '../../services/modelos.service';
import {CoresService} from '../../services/cores.service';
import {VeiculosTiposService} from '../../services/veiculos-tipos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  r: number = 1;
  textfilter = '';
  path = environment.img;

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;
  deleteusu$: any;
  selected$: any;

  cores$: any;
  orgaos$: any;
  setores$: any;
  marcas$: any;
  modelos$: any;
  veiculostipos$: any;
  perfil$: any;
  pess$: any;

  pessoas$: any;

  manifestacoes$: any;

  cadform = new FormGroup({
    id: new FormControl(),
    placa: new FormControl(),
    chassi: new FormControl(),
    renavam: new FormControl(),
    cor_id: new FormControl(),
    marca_id: new FormControl(),
    modelo_id: new FormControl(),
    pessoa_id: new FormControl(),
    veiculo_tipo_id: new FormControl(),
    observacao: new FormControl()
  });


  constructor(private toastr: ToastrService,
      private session: SessionService, 
      private cores: CoresService,  
      private marcas: MarcasService,  
      private modelos: ModelosService,  
      private veiculostipos: VeiculosTiposService,
      private veiculos: VeiculosService,  
      private pessoas: PessoasService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;
    

    if(!this.session.user.perfil.estrategico){
      this.router.navigate(['/inicio']);
    }else{
      this.perfil$ = this.session.user.perfil;
      this.marcas.index().subscribe(data => {
        this.marcas$ = data;
      });

      this.cores.index().subscribe(data => {
        this.cores$ = data;
      });

      this.veiculostipos.index().subscribe(data => {
        this.veiculostipos$ = data;
      });

      this.pessoas.index().subscribe(data => {
        this.pess$ = data;
      });
  
      this.veiculos.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }

    
  }  

  getData(){
    this.veiculos.index().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
    });
  }

  getModelos(){
    this.modelos.where(this.cadform.value.marca_id).subscribe(data => {
      this.modelos$ = data;
    });
  }

 

  filterdata() {
    if(this.textfilter){
      this.data$ = this.temp$;
      const val = this.textfilter.toLowerCase();

      const temp = this.data$.filter((d: any) => {
        return d.placa.toLowerCase().indexOf(val) !== -1 || d.renavam.toLowerCase().indexOf(val) !== -1 || d.chassi.toLowerCase().indexOf(val) !== -1  || !val;
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
    this.modelos.where(data.marca_id).subscribe(data => {
      this.modelos$ = data;
    });

    this.cadform.patchValue(data); 
  }

  salvar(){
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.veiculos.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Veículo editado com sucesso.',1);
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
      this.veiculos.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Veículo cadastrado com sucesso.',1);
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
    this.veiculos.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Vepiculo excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

  getPessoas(data: any){
    this.selected$ = data;
    this.pessoas$ = data.pessoas;
  }

  getManifestacoes(data: any){
    this.selected$ = data;
    this.manifestacoes$ = data.manifestacoes;
  }
}
