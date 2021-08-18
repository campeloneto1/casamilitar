import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../../services/session.service';
import {VeiculosService} from '../../services/veiculos.service';
import {environment} from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import {ArquivosService} from '../../services/arquivos.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  dayName = new Array ("domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado");
  monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");
  data$: any;
  path = environment.img;
  path2 = environment.arq;
  showarq$: any;
  deletearq$: any;
  filedata: any;
 
 
  date = new Date;
  user: any;

  cadformarq = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    nomearq: new FormControl(),
    veiculo_id: new FormControl(),
    data: new FormControl(),
    hora: new FormControl(),
    tipo_id: new FormControl()
  });


  constructor(private route: ActivatedRoute, 
    private http: HttpClient,
    private toastr: ToastrService,
    private arquivos: ArquivosService,
    private session: SessionService, 
    private veiculo: VeiculosService,
    private router: Router ) { }

  ngOnInit(): void {
    if(!this.session.user.perfil.estrategico){
      this.router.navigate(['/inicio']);
    }else{
        // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const productIdFromRoute = Number(routeParams.get('id'));
      this.user = this.session.user;
      this.veiculo.find(productIdFromRoute).subscribe(data => {
        this.data$ = data;
      });
    }
  }

  showToast(data1: string, data2: string, tipo: number) {
    if(tipo == 1){
      this.toastr.success(data2, data1);
    }else if(tipo == 2){
      this.toastr.error(data2, data1);
    }else if(tipo == 3){
      this.toastr.info(data2, data1);
    }else if(tipo == 4){
      this.toastr.warning(data2, data1);
    }
  }

  showarq(data: any){
    this.showarq$ = data;
  }

  fileEvent(e: any){
    this.filedata = e.target.files[0];
    //console.log(this.filedata);

    var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      /* Image Post Request */
      this.http.post(environment.url+'arquivos-arquivo', myFormData, {
      headers: headers
      }).subscribe(data => {
        if(data == 2){
          this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);         
        }
    },
    error => {
      //console.log(error.error.text)
      this.cadformarq.controls.nomearq.patchValue(error.error.text);
    });  
  }

  salvar(){
    this.cadformarq.controls.veiculo_id.patchValue(this.data$.id);
    this.arquivos.veiculos(this.cadformarq.value).subscribe(data => {
      if(data == 1){
        this.cadformarq.reset();
        this.veiculo.find(this.data$.id).subscribe(data => {
          this.data$ = data;
        });
        this.showToast('Informações salvas!','Arquivo cadastrado com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    });
  }

  deletar(data: any){
    this.deletearq$ = data;
  }

  confirm(id: number){
    this.arquivos.delete(this.deletearq$.id).subscribe(data => {
      if(data == 1){
        this.deletearq$ = '';
        this.veiculo.find(this.data$.id).subscribe(data => {
          this.data$ = data;
        });
        this.showToast('Exclusão realizada!','Arquivo excluído com sucesso.',1);
      }else{
        this.showToast('Erro!','Erro ao cadastrar, tento novamente mais tarde!',2);
      }
    });
  }

}
