import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Extrato } from '../modules/extrato';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importe o operador map aqui

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  private url: string = `${environment.api}/extratos`;

  constructor(private httpClient: HttpClient) {
  }

  obterExtratos() {
    return this.httpClient.get<Extrato[]>(this.url);
  }

  cadastrarExtrato(extrato: Extrato) {
    return this.httpClient.post<Extrato>(this.url, extrato);
  }

  editarExtrato(extrato: Extrato) {
    return this.httpClient.put<Extrato>(`${this.url}/${extrato.id}`, extrato);
  }

  remover(id: string){
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
