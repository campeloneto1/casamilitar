import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViaturasService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"viaturas");
  }

  index2(){
    return this.http.get(environment.url+"viaturas");
  }

  find(data: number){
    return this.http.get(environment.url+"viaturas/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"viaturas/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"viaturas",data);
  }

  put(data: any){
    return this.http.put(environment.url+"viaturas",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"viaturas/"+data);
  }
}
