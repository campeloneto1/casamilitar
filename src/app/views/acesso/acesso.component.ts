import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

import {PostosService} from '../../services/postos.service';
import {UsuariosService} from '../../services/usuarios.service';
import {AcessosService} from '../../services/acessos.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  posto: any;
  selecionado: any;
  show = 0;
  user_id = 0;
  postos$: any;
  usuarios$: any;
  data$: any;
  date: any;
  eventos$: any;
  participantes$: any;
  registrado = 0;
  permissao = 0;
  foto = '';
  path = environment.img
  constructor(private postos: PostosService,
    private usuarios: UsuariosService,
    private toastr: ToastrService,
    private acessos: AcessosService,
    private session: SessionService,  
    private router: Router) {

   
   }

  ngOnInit(): void {
    if(!this.session.user.perfil.acesso){
      this.router.navigate(['/inicio']);
    }else{
      this.usuarios.index2().subscribe(data => {
        //console.log(data);
        this.usuarios$ = data;
      });
  
      this.postos.acesso().subscribe(data => {
        //console.log(data);
        this.postos$ = data;
      });
  
      this.date = new Date;
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

  getPosto(){
    //console.log(this.posto);
    this.show = 1;
    this.postos.find(this.posto).subscribe(data =>{
      this.selecionado = data;
    });
  }

  getUsuario(){
    this.permissao = 0;
    this.data$ = '';
    this.eventos$ = '';
    if(this.user_id){
      this.usuarios.find(this.user_id).subscribe(data => {
        this.data$ = data;
        //@ts-ignore
        for (let index = 0; index < data.nivel.postos.length; index++) {
          //@ts-ignore
          if(data.nivel.postos[index].id == this.selecionado.id){
            //console.log()
            //console.log(this.data$.niveis.postos[index]);
            this.permissao = 1;
          }
        }
        
          //@ts-ignore
          this.foto = data.foto;
       
        //@ts-ignore
        //this.eventos$ = data.eventos;        
      });
      this.usuarios.proxeventos(this.user_id).subscribe(data => {
        //this.data$ = data;
        //@ts-ignore
        this.eventos$ = data;        
      });
     
      
    }else{
      this.data$ = '';
      this.eventos$ = '';
    }
   
  }

  voltar(){
    this.show = 0;
    this.data$ = '';
    this.eventos$ = '';
    this.user_id = 0;
  }

  registrar(){
    var temp = {'user_id': this.user_id, 'posto_id': this.selecionado.id, 'orgao_id': this.selecionado.orgao.id};
    this.acessos.registro(temp).subscribe(data => {
      if(data == 1){
        this.showToast('Entrada autorizada!','Acesso registrado com sucesso.',1);
        this.user_id = 0;
        this.data$ = '';
        this.eventos$ = '';
        this.permissao = 0;
      }
    });
  }

}
