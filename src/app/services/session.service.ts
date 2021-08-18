import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService{

  user: any;
  token: any;

  constructor() { 
    if(localStorage.getItem('token')){
      //console.log(sessionStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      //@ts-ignore
      this.user = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  setToken(data: any){
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('usuario', JSON.stringify(data.user));
    this.token = data.access_token; 
    this.user = data.user; 
  
  }

  destroyToken(){
    var temp: any = localStorage.getItem('usu');
    localStorage.clear();
    localStorage.setItem('usu', temp);
    this.user = '';
    this.token = '';
  }


  logout(){

  }
}
