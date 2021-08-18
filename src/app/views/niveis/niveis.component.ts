import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

import {PostosService} from '../../services/postos.service';
import {NiveisService} from '../../services/niveis.service';
import {NiveisPostosService} from '../../services/niveis-postos.service';

@Component({
  selector: 'app-niveis',
  templateUrl: './niveis.component.html',
  styleUrls: ['./niveis.component.css']
})
export class NiveisComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  q: number = 1;
  textfilter = '';
  cadpost = 0;
  

  data$: any;
  postos$: any;
  temp$: any;
  form$: any;
  delete$: any;
  selected$: any;
  deletepost$ : any;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl()
  });

  cadformpost = new FormGroup({
    id: new FormControl(),
    posto_id: new FormControl(),
    nivel_id: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private niveispostos: NiveisPostosService,
      private postos: PostosService,
      private niveis: NiveisService,
      private session: SessionService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;

    if(!this.session.user.perfil.administrador){
      this.router.navigate(['/inicio']);
    }else{
      this.postos.index().subscribe(data => {
        this.postos$ = data;
       });
    
        this.niveis.index().subscribe(data => {
          this.data$ = data;
          this.temp$ = this.data$;
        });
    }
  }  

  getData(){
    this.niveis.index().subscribe(data => {
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
      this.niveis.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Nível editado com sucesso.',1);
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
      this.niveis.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Nível cadastrado com sucesso.',1);
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
    this.niveis.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Nível excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }


  getPostos(data: any){
    this.selected$ = data;
  }

  cadastroposto(){
    this.cadformpost.controls.nivel_id.patchValue(this.selected$.id);
    //console.log(this.cadformusu.value);
    
    this.niveispostos.post(this.cadformpost.value).subscribe(data => {
      if(data == 1){
        this.cadpost = 0;
        this.cadformpost.reset();
        this.getData();
        this.niveis.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.selected$ = data;
        });
        this.showToast('Cadastro realizado!','Posto cadastrado com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

  deletarposto(data: any){
    this.deletepost$ = data;
  }

  confirmposto(data: number){
    this.niveispostos.delete(data).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.deletepost$ = '';
        this.getData();
        this.niveis.find(this.selected$.id).subscribe(data => {
          //@ts-ignore
          this.selected$ = data;
        });
        this.showToast('Exclusão realizada!','Posto excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    });
  }

}
