import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {SessionService} from '../../services/session.service';
import {LoginService} from '../../services/login.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {
  user: any;
  logo = '';
  url = '';

  cadform = new FormGroup({
    usuario: new FormControl(),
    password: new FormControl()
  });

  constructor(private session: SessionService,
    private login: LoginService,
    private toastr: ToastrService,
    private router: Router) { }


  ngOnInit(): void {
    this.user = this.session.user;
    this.url = environment.img;
    this.logo = this.url+'cm.jpg';
    //console.log(this.user);
  }

  showToast(data1: string, data2: string, tipo: number) {
    if(tipo == 1){
      this.toastr.success(data1, data2);
    }else if(tipo == 2){
      this.toastr.error(data1, data2);
    }else if(tipo == 3){
      this.toastr.info(data1, data2);
    }else if(tipo == 4){
      this.toastr.warning(data1, data2);
    }
  }


  doLogin(){
    this.cadform.controls.usuario.patchValue(this.user.usuario);
    this.login.login(this.cadform.value).subscribe(data => {
      //@ts-ignore
      if(data.access_token){
        this.session.setToken(data);
        this.router.navigate(['/inicio']);
      }

    });
  }
  

}
