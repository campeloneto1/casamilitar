import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import {SessionService} from '../../services/session.service';


@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.css']
})
export class C1Component implements OnInit {
  
  itenspage = 12;
  p: number = 1;
  textfilter = '';
  data$: any;
  temp$: any;
  path = '';
  

  constructor(private usuarios: UsuariosService,
    private session: SessionService,  
    private router: Router
    ) { }

  ngOnInit(): void {
    if(!this.session.user.perfil.c1){
      this.router.navigate(['/inicio']);
    }else{
      this.usuarios.index2().subscribe(data => {
        this.data$ = data;
        this.temp$ = this.data$;
      });

      this.path = environment.img;
    }
  }

  filterdata() {
    if(this.textfilter){
      this.data$ = this.temp$;
      var val = this.textfilter.toLowerCase();     

      const temp = this.data$.filter((d: any) => {
        return d.nome.toLowerCase().indexOf(val) !== -1 || d.cpf.toLowerCase().indexOf(val) !== -1 || !val;
      });

      this.data$ = temp;
    }else{
      this.data$ = this.temp$;
    }
    
  }

}
