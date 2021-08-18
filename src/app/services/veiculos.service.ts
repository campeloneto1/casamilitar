import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"veiculos");
  }

  index2(){
    return this.http.get(environment.url+"veiculos2");
  }

  find(data: number){
    return this.http.get(environment.url+"veiculos/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"veiculos/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"veiculos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"veiculos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"veiculos/"+data);
  }
}
