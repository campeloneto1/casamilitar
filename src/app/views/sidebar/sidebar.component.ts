import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {environment} from '../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  logo = '';
  menu1 = false;
  menu2 = false;
  menu3 = false;
  menu4 = false;

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.user = this.session.user;
    this.logo = environment.img+'cm.png';

   // 
    //console.log(this.user);
  }


  tree1(){
    //console.log('aaaaaaaa');
    //$('[data-widget="treeview"]').Treeview('trigger');
    if(this.menu1){
      this.menu1 = false;
    }else{
      this.menu1 = true;
    }
    
  }

  tree2(){
    //console.log('aaaaaaaa');
    //$('[data-widget="treeview"]').Treeview('trigger');
    if(this.menu2){
      this.menu2 = false;
    }else{
      this.menu2 = true;
    }
    
  }

  tree3(){
    //console.log('aaaaaaaa');
    //$('[data-widget="treeview"]').Treeview('trigger');
    if(this.menu3){
      this.menu3 = false;
    }else{
      this.menu3 = true;
    }
    
  }

  tree4(){
    //console.log('aaaaaaaa');
    //$('[data-widget="treeview"]').Treeview('trigger');
    if(this.menu4){
      this.menu4 = false;
    }else{
      this.menu4 = true;
    }
    
  }

 

}
