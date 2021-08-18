import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../../services/session.service';
import {EventosService} from '../../services/eventos.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-eventos-print',
  templateUrl: './eventos-print.component.html',
  styleUrls: ['./eventos-print.component.css']
})
export class EventosPrintComponent implements OnInit {
  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  data$: any;
  cm = environment.img+'cm.jpg';
  ce = environment.img+'ce.png';
  date = new Date;
  user: any;
  constructor(private route: ActivatedRoute, 
    private session: SessionService, 
    private eventos: EventosService,
    private router: Router ) { }

  ngOnInit(): void {
    if(!this.session.user.perfil.eventos){
      this.router.navigate(['/inicio']);
    }else{
        // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const productIdFromRoute = Number(routeParams.get('id'));
      this.user = this.session.user;
      this.eventos.find(productIdFromRoute).subscribe(data => {
        this.data$ = data;
      });
    }
  }

}
