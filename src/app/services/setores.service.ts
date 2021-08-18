import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetoresService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"setores");
  }

  index2(){
    return this.http.get(environment.url+"setores2");
  }

  where(data: number){
    return this.http.get(environment.url+"setores/where/"+data);
  }

  find(data: number){
    return this.http.get(environment.url+"setores/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"setores",data);
  }

  put(data: any){
    return this.http.put(environment.url+"setores",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"setores/"+data);
  }
}
