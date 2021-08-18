import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {SessionService} from '../../../services/session.service';
import {OrgaosService} from '../../../services/orgaos.service';
import {ViaturasService} from '../../../services/viaturas.service';
import {RelatoriosService} from '../../../services/relatorios.service';
import {environment} from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-veiculos',
  templateUrl: './rel-veiculos.component.html',
  styleUrls: ['./rel-veiculos.component.css']
})
export class RelVeiculosComponent implements OnInit {

  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  data$: any;
  
  orgaos$: any;
  viaturas$: any;
  selected$: any;
  cm = environment.img+'cm.jpg';
  ce = environment.img+'ce.png';
  date = new Date;
  user: any;
  show = 0;
  evento = 0;

  relform = new FormGroup({
    orgao_id: new FormControl(),
    viatura_id: new FormControl(),
    data_ini: new FormControl(),
    data_fim: new FormControl()
  });


  constructor(private route: ActivatedRoute, 
    private session: SessionService, 
    private orgaos: OrgaosService,
    private relatorios: RelatoriosService, 
    private viaturas: ViaturasService,  
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

  getViaturas(){
    this.relform.controls.viatura_id.patchValue('');
    this.viaturas.where(this.relform.value.orgao_id).subscribe(data => {
      this.viaturas$ = data;
    });
  }

  getViatura(){
    this.relatorios.veiculos(this.relform.value).subscribe(data => {
      this.data$ = data;
      this.show = 1;
    });
    this.viaturas.find(this.relform.value.viatura_id).subscribe(data => {
      this.selected$ = data;
    });
  }

}
