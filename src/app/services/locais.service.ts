import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"locais");
  }

  find(data: number){
    return this.http.get(environment.url+"locais/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"locais",data);
  }

  put(data: any){
    return this.http.put(environment.url+"locais",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"locais/"+data);
  }
}
