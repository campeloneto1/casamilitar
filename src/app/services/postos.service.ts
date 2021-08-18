import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"postos");
  }

  index2(){
    return this.http.get(environment.url+"postos2");
  }

  find(data: number){
    return this.http.get(environment.url+"postos/"+data);
  }

  acesso(){
    return this.http.get(environment.url+"postos-acesso");
  }

  where(data: number){
    return this.http.get(environment.url+"postos/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"postos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"postos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"postos/"+data);
  }

  
}
