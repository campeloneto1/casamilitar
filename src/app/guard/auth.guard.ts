import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service';
import {SessionService} from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth : any;
  ativo: any;
  constructor(private login: LoginService,
    private session: SessionService,
    private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {   
      
      if(this.session.token){
        return true;
      }else{
        this.router.navigate(['/']);
        return false;
      }
    }

    
  
}
