import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManifestacoesService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"manifestacoes");
  }

  find(data: number){
    return this.http.get(environment.url+"manifestacoes/"+data);
  }

  where(data: number){
    return this.http.get(environment.url+"manifestacoes/"+data+"/where");
  }

  post(data: any){
    return this.http.post(environment.url+"manifestacoes",data);
  }

  put(data: any){
    return this.http.put(environment.url+"manifestacoes",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"manifestacoes/"+data);
  }
}
