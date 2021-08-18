import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {SessionService} from '../../services/session.service'
import {LoginService} from '../../services/login.service'
import {UsuariosService} from '../../services/usuarios.service'
import { ToastrService } from 'ngx-toastr';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  postgrad = '';
  foto = '';
  path = '';

  pasform = new FormGroup({
    id: new FormControl(),
    password: new FormControl(),
    confirm: new FormControl()
  });

  constructor(private session: SessionService,
    private toastr: ToastrService,
    private login: LoginService,
    private usuarios: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    //console.log(this.session.user);
    this.user = this.session.user;
    this.postgrad = this.user.posto_grad.nome;
    this.foto = environment.img+this.user.foto;
    this.path = environment.img;
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

  logout(){
    this.login.logout().subscribe(data => {
      //@ts-ignore
      if(data.message == 1){
        this.session.destroyToken();
        this.router.navigate(['/']);
        
      }
    });
  }

  changePass(){
    this.pasform.controls.id.patchValue(this.user.id);
    this.usuarios.change_password(this.pasform.value).subscribe(data => {
      if(data == 1){
        this.pasform.reset();
        this.showToast('Informações salvas!','Senha alterada com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    })
  }

}
