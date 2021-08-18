import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SessionService} from '../../../services/session.service';
import {EventosService} from '../../../services/eventos.service';
import {environment} from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-eventos',
  templateUrl: './rel-eventos.component.html',
  styleUrls: ['./rel-eventos.component.css']
})
export class RelEventosComponent implements OnInit {
  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  data$: any;
  
  eventos$: any;
  cm = environment.img+'cm.jpg';
  ce = environment.img+'ce.png';
  date = new Date;
  user: any;
  show = 0;
  evento = 0;


  constructor(private route: ActivatedRoute, 
    private session: SessionService, 
    private eventos: EventosService,  
    private router: Router) { }

  ngOnInit(): void {
    if(!this.session.user.perfil.relatorios){
      this.router.navigate(['/inicio']);
    }else{
      // First get the product id from the current route.
      this.eventos.index().subscribe(data => {
        this.eventos$ = data;
      });
      this.user = this.session.user;
    }

    
    
  }

  getEvento(){
    this.eventos.find(this.evento).subscribe(data => {
      this.data$ = data;
      this.show = 1;
    });
  }

}
