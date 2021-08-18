import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

import {PerfisService} from '../../services/perfis.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  textfilter = '';
  

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;
  orgaos$: any;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    administrador: new FormControl(),
    gestor: new FormControl(),
    acesso: new FormControl(),
    c1: new FormControl(),
    relatorios: new FormControl(),
    estrategico: new FormControl(),
    users: new FormControl(),
    users_cad: new FormControl(),
    users_edit: new FormControl(),
    users_del: new FormControl(),
    users_dig: new FormControl(),
    users_ace: new FormControl(),
    users_foto: new FormControl(),
    eventos: new FormControl(),
    eventos_cad: new FormControl(),
    eventos_edit: new FormControl(),
    eventos_del: new FormControl(),
    eventos_usu: new FormControl(),
    eventos_vei: new FormControl(),
    viaturas: new FormControl(),
    viaturas_cad: new FormControl(),
    viaturas_edit: new FormControl(),
    viaturas_del: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private perfis: PerfisService,
      private session: SessionService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;
    if(!this.session.user.perfil.administrador){
      this.router.navigate(['/inicio']);
    }else{
      this.perfis.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }
  }  

  getData(){
    this.perfis.index().subscribe(data => {
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
      this.perfis.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Perfil editado com sucesso.',1);
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
      this.perfis.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Perfil cadastrado com sucesso.',1);
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
    this.perfis.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Perfil excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

}
