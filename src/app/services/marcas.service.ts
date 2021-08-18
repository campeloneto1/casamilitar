import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"marcas");
  }

  find(data: number){
    return this.http.get(environment.url+"marcas/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"marcas",data);
  }

  put(data: any){
    return this.http.put(environment.url+"marcas",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"marcas/"+data);
  }
}
