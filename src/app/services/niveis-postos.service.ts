import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NiveisPostosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"niveis-postos");
  }

  find(data: number){
    return this.http.get(environment.url+"niveis-postos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"niveis-postos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"niveis-postos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"niveis-postos/"+data);
  }
}
