import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GaragemService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"garagem");
  }

  index2(){
    return this.http.get(environment.url+"garagem2");
  }

  find(data: number){
    return this.http.get(environment.url+"garagem/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"garagem",data);
  }

  registro(data: any){
    return this.http.post(environment.url+"garagem/registro",data);
  }

  put(data: any){
    return this.http.put(environment.url+"garagem",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"garagem/"+data);
  }
}
