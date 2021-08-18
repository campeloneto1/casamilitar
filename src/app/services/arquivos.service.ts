import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  constructor(private http: HttpClient) { 

  }

  pessoas(data: any){
    return this.http.post(environment.url+"arquivos-pessoas",data);
  }

  veiculos(data: any){
    return this.http.post(environment.url+"arquivos-veiculos",data);
  }

  manifestacoes(data: any){
    return this.http.post(environment.url+"arquivos-manifestacoes",data);
  }

  sindicatos(data: any){
    return this.http.post(environment.url+"arquivos-sindicatos",data);
  }

  
  delete(data: number){
    return this.http.delete(environment.url+"arquivos/"+data);
  }
}
