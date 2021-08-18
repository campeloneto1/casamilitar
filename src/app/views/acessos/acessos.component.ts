import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';


import {AcessosService} from '../../services/acessos.service';
import {UsuariosService} from '../../services/usuarios.service';
import {PostosService} from '../../services/postos.service';
import {OrgaosService} from '../../services/orgaos.service';

@Component({
  selector: 'app-acessos',
  templateUrl: './acessos.component.html',
  styleUrls: ['./acessos.component.css']
})
export class AcessosComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  textfilter = '';
  

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;

  usuarios$: any;
  postos$: any;
  orgaos$: any;


  cadform = new FormGroup({
    id: new FormControl(),
    user_id: new FormControl(),
    data: new FormControl(),
    hora: new FormControl(),
    posto_id: new FormControl(),
    orgao_id: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private usuarios: UsuariosService,
      private postos: PostosService,
      private orgaos: OrgaosService,
      private acessos: AcessosService,
      private session: SessionService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;

    if(!this.session.user.perfil.gestor){
      this.router.navigate(['/inicio']);
    }else{
      this.usuarios.where().subscribe(data => {
        this.usuarios$ = data;
      
      });
  
      this.orgaos.index().subscribe(data => {
        this.orgaos$ = data;
      
      });
  
      this.acessos.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }
  }  

  getPostos(){
    this.postos.where(this.cadform.value.orgao_id).subscribe(data => {
      this.postos$ = data;
    
    });
  }

  getData(){
    this.acessos.index().subscribe(data => {
      this.data$ = data;
      this.temp$ = this.data$;
    });
  }

  filterdata() {
    if(this.textfilter){
      this.data$ = this.temp$;
      const val = this.textfilter.toLowerCase();

      const temp = this.data$.filter((d: any) => {
        return d.pessoa.nome.toLowerCase().indexOf(val) !== -1 || d.posto.nome.toLowerCase().indexOf(val) !== -1 || d.responsavel.nome.toLowerCase().indexOf(val) !== -1 || !val;
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
    this.postos.where(data.orgao_id).subscribe(data => {
      this.postos$ = data;
    
    });
    this.cadform.patchValue(data);
  }

  salvar(){
    //console.log(this.cadform.value);
    if(this.cadform.value.id){
      this.acessos.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Acesso editado com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao editar, tento novamente mais tarde!',2);
        }
      });
    }else{
      this.acessos.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Acesso cadastrado com sucesso.',1);
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
    this.acessos.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Acesso excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

}
