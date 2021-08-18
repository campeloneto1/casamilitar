import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosViaturasService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"eventos-viaturas");
  }

  find(data: number){
    return this.http.get(environment.url+"eventos-viaturas/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"eventos-viaturas",data);
  }

  put(data: any){
    return this.http.put(environment.url+"eventos-viaturas",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"eventos-viaturas/"+data);
  }
}
