import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"pessoas");
  }

  index2(){
    return this.http.get(environment.url+"pessoas");
  }

  find(data: number){
    return this.http.get(environment.url+"pessoas/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"pessoas/"+data+"/where");
  }

  where2(data: number){
    return this.http.get(environment.url+"pessoas/"+data+"/where2");
  }

  post(data: any){
    return this.http.post(environment.url+"pessoas",data);
  }

  put(data: any){
    return this.http.put(environment.url+"pessoas",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"postos/"+data);
  }
}
