import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcessosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"acessos");
  }

  index2(){
    return this.http.get(environment.url+"acessos2");
  }

  find(data: number){
    return this.http.get(environment.url+"acessos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"acessos",data);
  }

  registro(data: any){
    return this.http.post(environment.url+"acessos/registro",data);
  }

  put(data: any){
    return this.http.put(environment.url+"acessos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"acessos/"+data);
  }
}
