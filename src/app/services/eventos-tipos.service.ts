import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosTiposService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"eventos-tipos");
  }

  find(data: number){
    return this.http.get(environment.url+"eventos-tipos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"eventos-tipos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"eventos-tipos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"eventos-tipos/"+data);
  }
}
