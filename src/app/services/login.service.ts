import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 

  }

  check(){    
    return this.http.get(environment.url+"check");
  }

  login(data: any){    
    return this.http.post(environment.url+"login", data);
  }

  logout(){    
    return this.http.get(environment.url+"logout");
  }
}
