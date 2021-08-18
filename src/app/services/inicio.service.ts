import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient) { 

  }

  ultimosacessos(){
    return this.http.get(environment.url+"home-ultimos-acessos");
  }

  proximoseventos(){
    return this.http.get(environment.url+"home-proximos-eventos");
  }

 
}
