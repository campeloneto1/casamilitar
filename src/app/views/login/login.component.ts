import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {SessionService} from '../../services/session.service';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = '';

  cadform = new FormGroup({
    usuario: new FormControl(),
    password: new FormControl(),
    remember: new FormControl()
  });

  constructor(private login: LoginService,
    private session: SessionService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.logo = environment.img+'cm.png';
    if(localStorage.getItem('usu')){
      //@ts-ignore
      var temp:any = localStorage.getItem('usu').split('.');
      
      this.cadform.controls.usuario.patchValue(temp[0]+temp[3]);
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

  doLogin(){
    var temp: any;
    var max = 999;
    var min = 100;
    var random: any = Math.random() * (max - min) + min;
    
    //console.log(this.cadform.value);
    

      this.login.login(this.cadform.value).subscribe(data => {
        //console.log(data);                
        //@ts-ignore
        if(data.access_token){
          this.session.setToken(data);
          this.router.navigate(['/inicio']);
        }

        if(this.cadform.value.remember){
         
          temp = this.cadform.value.usuario.substring(0,5)+'.'+random+'.'+this.cadform.value.usuario.substring(5);
          //console.log(temp);
          localStorage.setItem('usu', temp);
        }
      },
      erro => {
        if(erro.status == 401){
          this.showToast('Usuário ou senha inválido!', 'Verifique o usuário e senha informados e tente novamente.', 2);
        }
      });
  
  }

}
