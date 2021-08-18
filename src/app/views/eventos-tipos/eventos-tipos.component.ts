import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';


import {EventosTiposService} from '../../services/eventos-tipos.service';

@Component({
  selector: 'app-eventos-tipos',
  templateUrl: './eventos-tipos.component.html',
  styleUrls: ['./eventos-tipos.component.css']
})
export class EventosTiposComponent implements OnInit {

  loading = true;
  itenspage = 10;
  p: number = 1;
  textfilter = '';
  

  data$: any;
  temp$: any;
  form$: any;
  delete$: any;


  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl()
  });

  constructor(private toastr: ToastrService,
      private eventostipos: EventosTiposService,
      private session: SessionService,  
      private router: Router) { 
   
  }

  ngOnInit(): void {
    this.loading = false;

    if(!this.session.user.perfil.gestor){
      this.router.navigate(['/inicio']);
    }else{
      this.eventostipos.index().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });
    }
  }  

  getData(){
    this.eventostipos.index().subscribe(data => {
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
      this.eventostipos.put(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Tipo de evento editado com sucesso.',1);
        }else{
          this.showToast('Erro!','Erro ao editar, tento novamente mais tarde!',2);
        }
      });
    }else{
      this.eventostipos.post(this.cadform.value).subscribe(data => {
        //console.log(data);
        if(data == 1){
          this.cadform.reset();
          this.getData();
          this.showToast('Informações salvas!','Tipo de evento cadastrado com sucesso.',1);
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
    this.eventostipos.delete(id).subscribe(data =>{
      //console.log(data);
      if(data == 1){
        this.cadform.reset();
        this.getData();
        this.showToast('Exclusão realizada!','Tipo de evento excluido com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao excluir, tento novamente mais tarde!',2);
      }
    })
  }

}
