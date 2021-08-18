import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(private http: HttpClient) { 

  }

  acessos(data: any){
    return this.http.post(environment.url+"relatorios-acessos", data);
  }

  veiculos(data: any){
    return this.http.post(environment.url+"relatorios-viaturas", data);
  }

 
}
