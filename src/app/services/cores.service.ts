import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoresService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"cores");
  }

  find(data: number){
    return this.http.get(environment.url+"cores/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"cores",data);
  }

  put(data: any){
    return this.http.put(environment.url+"cores",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"cores/"+data);
  }
}
