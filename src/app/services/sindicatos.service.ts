import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SindicatosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"sindicatos");
  }

 
  find(data: number){
    return this.http.get(environment.url+"sindicatos/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"sindicatos/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"sindicatos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"sindicatos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"sindicatos/"+data);
  }
}
