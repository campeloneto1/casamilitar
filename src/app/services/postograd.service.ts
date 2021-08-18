import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostogradService {

  constructor(private http: HttpClient) { 

  }

  index(){
    return this.http.get(environment.url+"postograd");
  }

  find(data: number){
    return this.http.get(environment.url+"postograd/"+data);
  }

  post(data: any){
    return this.http.post(environment.url+"postograd",data);
  }

  put(data: any){
    return this.http.put(environment.url+"postograd",data);
  }

  delete(data: number){
    return this.http.delete(environment.url+"postograd/"+data);
  }
}
