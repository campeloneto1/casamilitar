import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

import {PessoasService} from '../../services/pessoas.service';
import {VeiculosService} from '../../services/veiculos.service';
import {ManifestacoesService} from '../../services/manifestacoes.service';
import {SindicatosService} from '../../services/sindicatos.service';

@Component({
  selector: 'app-estconsulta',
  templateUrl: './estconsulta.component.html',
  styleUrls: ['./estconsulta.component.css']
})
export class EstconsultaComponent implements OnInit {

  loading = true;
  itenspage = 5;
  p: number = 1;
  q: number = 1;
  r: number = 1;
  s: number = 1;
  textfilter = '';

  pessoas$: any;
  veiculos$: any;
  manifestacoes$: any;
  sindicatos$: any;

  cadform = new FormGroup({
    id: new FormControl(),
    nome: new FormControl()
  });

  constructor(private toastr: ToastrService,

    private pessoas: PessoasService,
    private manifestacoes: ManifestacoesService,
    private veiculos: VeiculosService,
    private sindicatos: SindicatosService,
    private session: SessionService,  
    private router: Router) { 
 
}

  ngOnInit(): void {
    this.loading = false;

    if(!this.session.user.perfil.estrategico){
      this.router.navigate(['/inicio']);
    }else{
      
    }
  }

  consultar(){
    if(this.cadform.value.nome == ''){
      this.pessoas$ = null;
      this.veiculos$ = null;
      this.sindicatos$ = null;
      this.manifestacoes$ = null;
      //console.log('aaaa');
    }else{
      this.pessoas.where(this.cadform.value.nome).subscribe(data => {
        this.pessoas$ = data;
      });
  
      this.veiculos.where(this.cadform.value.nome).subscribe(data => {
        this.veiculos$ = data;
      });
  
      this.sindicatos.where(this.cadform.value.nome).subscribe(data => {
        this.sindicatos$ = data;
      });
  
      this.manifestacoes.where(this.cadform.value.nome).subscribe(data => {
        this.manifestacoes$ = data;
      });
      
    }
    
  }

}
