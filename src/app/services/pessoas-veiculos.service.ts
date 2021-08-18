import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasVeiculosService {

  constructor(private http: HttpClient) { 

  }
  
  postPessoaVeiculo(data: any){
    return this.http.post(environment.url+"pessoas-veiculos",data);
  }

  deletePessoaVeiculo(data: number){
    return this.http.delete(environment.url+"pessoas-veiculos/"+data);
  }

  postPessoaManifestacao(data: any){
    return this.http.post(environment.url+"pessoas-manifestacoes",data);
  }

  deletePessoaManifestacao(data: number){
    return this.http.delete(environment.url+"pessoas-manifestacoes/"+data);
  }

  postManifestacaoVeiculo(data: any){
    return this.http.post(environment.url+"manifestacoes-veiculos",data);
  }

  deleteManifestacaoVeiculo(data: number){
    return this.http.delete(environment.url+"manifestacoes-veiculos/"+data);
  }

  postSindicatoVeiculo(data: any){
    return this.http.post(environment.url+"sindicatos-veiculos",data);
  }

  deleteSindicatoVeiculo(data: number){
    return this.http.delete(environment.url+"sindicatos-veiculos/"+data);
  }

  postSindicatoPessoa(data: any){
    return this.http.post(environment.url+"sindicatos-pessoas",data);
  }

  deleteSindicatoPessoa(data: number){
    return this.http.delete(environment.url+"sindicatos-pessoas/"+data);
  }

  postPessoaRede(data: any){
    return this.http.post(environment.url+"pessoas-redes",data);
  }

  deletePessoaRede(data: number){
    return this.http.delete(environment.url+"pessoas-redes/"+data);
  }
}
