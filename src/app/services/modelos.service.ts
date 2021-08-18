import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"modelos");
  }

  find(data: number){
    return this.http.get(environment.url+"modelos/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"modelos/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"modelos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"modelos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"modelos/"+data);
  }
}
