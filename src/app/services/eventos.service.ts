import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"eventos");
  }

  index2(){
    return this.http.get(environment.url+"eventos2");
  }

  find(data: number){
    return this.http.get(environment.url+"eventos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"eventos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"eventos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"eventos/"+data);
  }
}
