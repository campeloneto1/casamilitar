import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosTiposService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"veiculos-tipos");
  }

  find(data: number){
    return this.http.get(environment.url+"veiculos-tipos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"veiculos-tipos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"veiculos-tipos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"veiculos-tipos/"+data);
  }
}
