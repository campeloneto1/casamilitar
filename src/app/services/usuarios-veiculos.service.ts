import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosVeiculosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"usuarios-veiculos");
  }

  find(data: number){
    return this.http.get(environment.url+"usuarios-veiculos/"+data);
  }

  where(data: any){
    return this.http.get(environment.url+"usuarios-veiculos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"usuarios-veiculos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"usuarios-veiculos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"usuarios-veiculos/"+data);
  }
}
