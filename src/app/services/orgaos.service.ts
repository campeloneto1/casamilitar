import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrgaosService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"orgaos");
  }

  index2(){
    return this.http.get(environment.url+"orgaos2");
  }

  find(data: number){
    return this.http.get(environment.url+"orgaos/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"orgaos",data);
  }

  put(data: any){
    return this.http.put(environment.url+"orgaos",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"orgaos/"+data);
  }
}
