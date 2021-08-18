import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"usuarios");
  }

  index2(){
    return this.http.get(environment.url+"usuarios2");
  }

  find(data: number){
    return this.http.get(environment.url+"usuarios/"+data);
  }

  where(){
    return this.http.get(environment.url+"usuarios-acesso");
  }

  proxeventos(data: number){
    return this.http.get(environment.url+"usuarios-eventos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"usuarios",data);
  }

  put(data: any){
    return this.http.put(environment.url+"usuarios",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"usuarios/"+data);
  }
  
  acesso_ativar(data: number){
    return this.http.get(environment.url+"usuarios/"+data+"/acesso/ativar");
  }

  acesso_desativar(data: number){
    return this.http.get(environment.url+"usuarios/"+data+"/acesso/desativar");
  }

  foto(data: any){
    return this.http.post(environment.url+"usuarios-foto",data);
  }

  digital(data: any){
    return this.http.post(environment.url+"usuarios-digital",data);
  }

  reset_password(data: number){
    return this.http.get(environment.url+"usuarios-resetpass/"+data);
  }

  change_password(data:any){
    return this.http.post(environment.url+"usuarios-changepass",data);
  }

}
