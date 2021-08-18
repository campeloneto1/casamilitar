import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfluenciasService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"influencias");
  }

  find(data: number){
    return this.http.get(environment.url+"influencias/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"influencias",data);
  }

  put(data: any){
    return this.http.put(environment.url+"influencias",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"influencias/"+data);
  }
}
