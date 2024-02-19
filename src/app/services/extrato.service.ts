import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Extrato } from '../modules/extrato';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  private url: string = environment.api;

  constructor(private httpClient: HttpClient) {
  }

  obterExtratos() {
    return this.httpClient.get<Extrato[]>(this.url + '/extratos');
  }

}
