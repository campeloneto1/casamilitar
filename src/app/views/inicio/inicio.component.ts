import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import {InicioService} from '../../services/inicio.service';
import {SessionService} from '../../services/session.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  ultimosacessos$: any;
  garagemacessos$: any;
  proximoseventos$: any;
  user: any;
  quantpes = 0;

  constructor(private inicio: InicioService,
    private session: SessionService) { }

  ngOnInit(): void {
    this.user = this.session.user;

    this.inicio.ultimosacessos().subscribe(data => {
      this.ultimosacessos$ = data;
    });

    this.inicio.garagemacessos().subscribe(data => {
      this.garagemacessos$ = data;
    });

    this.inicio.proximoseventos().subscribe(data => {
      this.proximoseventos$ = data;
    });

  }

}
