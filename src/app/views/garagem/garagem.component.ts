import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

import {UsuariosService} from '../../services/usuarios.service';
import {UsuariosVeiculosService} from '../../services/usuarios-veiculos.service';
import {PostosService} from '../../services/postos.service';
import {GaragemService} from '../../services/garagem.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-garagem',
  templateUrl: './garagem.component.html',
  styleUrls: ['./garagem.component.css']
})
export class GaragemComponent implements OnInit {

  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  posto: any;
  selecionado: any;
  show = 0;
  user_id = 0;
  placa = '';
  postos$: any;
  data$: any;
  date: any;
  veiculos$: any;
  foto = '';
  path = environment.img;
  

  constructor(private postos: PostosService,
    private usuarios: UsuariosService,
    private toastr: ToastrService,
    private session: SessionService,  
    private usuariosveiculos: UsuariosVeiculosService,  
    private garagem: GaragemService,
    private router: Router) { 

    }

  ngOnInit(): void {
    if(!this.session.user.perfil.acesso){
      this.router.navigate(['/inicio']);
    }else{
      this.usuariosveiculos.index().subscribe(data => {
        //console.log(data);
        this.veiculos$ = data;
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

  getVeiculo(){
    //console.log(this.placa);
    if(this.placa){
      this.usuariosveiculos.where(this.placa).subscribe(data => {
        //@ts-ignore
        this.data$ = data[0];
        //@ts-ignore
        this.foto = this.data[0].usuario.foto;
      });
    }else{
      this.data$ = '';
    }
  }


  voltar(){
    this.show = 0;
    this.data$ = '';
  }

  registrar(){
      var temp = {'user_veiculo_id': this.data$.id, 'posto_id': this.selecionado.id, 'orgao_id': this.selecionado.orgao.id};
      this.garagem.registro(temp).subscribe(data => {
        if(data == 1){
          this.showToast('Entrada autorizada!','Veículo registrado com sucesso.',1);
          this.data$ = '';
        }
        
      });
  }

}
