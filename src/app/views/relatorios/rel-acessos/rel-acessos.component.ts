import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {SessionService} from '../../../services/session.service';
import {OrgaosService} from '../../../services/orgaos.service';
import {PostosService} from '../../../services/postos.service';
import {RelatoriosService} from '../../../services/relatorios.service';
import {environment} from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-acessos',
  templateUrl: './rel-acessos.component.html',
  styleUrls: ['./rel-acessos.component.css']
})
export class RelAcessosComponent implements OnInit {

  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  data$: any;
  
  orgaos$: any;
  postos$: any;
  cm = environment.img+'cm.jpg';
  ce = environment.img+'ce.png';
  date = new Date;
  user: any;
  show = 0;
  evento = 0;

  relform = new FormGroup({
    orgao_id: new FormControl(),
    posto_id: new FormControl(),
    data_ini: new FormControl(),
    data_fim: new FormControl()
  });


  constructor(private route: ActivatedRoute, 
    private session: SessionService, 
    private orgaos: OrgaosService,
    private relatorios: RelatoriosService, 
    private postos: PostosService,  
    private router: Router) { }

  ngOnInit(): void {
    if(!this.session.user.perfil.relatorios){
      this.router.navigate(['/inicio']);
    }else{
      // First get the product id from the current route.
      this.orgaos.index().subscribe(data => {
        this.orgaos$ = data;
      });
      this.user = this.session.user;
    }

    
    
  }

  getPostos(){
    this.relform.controls.posto_id.patchValue('');
    this.postos.where(this.relform.value.orgao_id).subscribe(data => {
      this.postos$ = data;
    });
  }

  getAcessos(){
    this.relatorios.acessos(this.relform.value).subscribe(data => {
      this.data$ = data;
      this.show = 1;
    });
  }

}
