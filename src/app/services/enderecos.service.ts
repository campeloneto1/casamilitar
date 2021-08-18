import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {

  constructor(private http: HttpClient) { 

  }

  getCep(data: string){
    return this.http.get("https://viacep.com.br/ws/"+data+"/json/");
  }

  getEstados(){
    return this.http.get(environment.url+"estados");
  }

  getCidades(data: number){
    return this.http.get(environment.url+"cidades/"+data+"/where");
  }

}
