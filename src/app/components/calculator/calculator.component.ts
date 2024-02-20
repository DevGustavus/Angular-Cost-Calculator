import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Extrato } from 'src/app/modules/extrato';
import { ExtratoService } from 'src/app/services/extrato.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  //extratos: Extrato[] = []
  extratos$ = new Observable<Extrato[]>();

  constructor(private extratoService: ExtratoService){
    console.log('TO AQUI', environment.api);
    this.obterExtratosCadastrados();
  }

  //form
  id: string = "";
  nome: string = "";
  descricao: string = "";
  valor: number = 0;

  somaTotal: number = 0;

  obterExtratosCadastrados() {
    //this.extratoService.obterExtratos().subscribe(extratos => this.extratos = extratos);

    this.extratos$ = this.extratoService.obterExtratos();
    this.extratos$.subscribe(extratos => {
      this.somaTotal = this.somarCustos(extratos);
    });
  }

  btnCadastrarExtrato() {
    if(!this.nome || !this.descricao || !this.valor){
      alert("Todos os campos devem ser preenchidos corretamente!");
      return;
    }

    if(this.id){
      this.btnEditarExtrato();
      return;
    }

    this.extratoService.cadastrarExtrato({nome: this.nome, descricao: this.descricao, valor: this.valor })
      .subscribe(() => {
        this.obterExtratosCadastrados();
    });
  }

  btnEditarExtrato() {
    this.extratoService.editarExtrato({id: this.id, nome: this.nome, descricao: this.descricao, valor: this.valor}).subscribe(() => this.obterExtratosCadastrados());
  }

  preencherCampos(extrato: Extrato) {
    this.id = extrato.id!;
    this.nome = extrato.nome;
    this.descricao = extrato.descricao;
    this.valor = extrato.valor;
  }

  remover(id: string) {
    this.extratoService.remover(id).subscribe(() => this.obterExtratosCadastrados());
  }

  btnCancelar() {
    this.id = "";
    this.nome = "";
    this.descricao = "";
    this.valor = 0;

    const btnCancelar = document.getElementById('cancelar_btn');
    if (btnCancelar) {
      btnCancelar.style.display = 'none';
    }
  }

  mostrarBotaoCancelar() {
    const btnCancelar = document.getElementById('cancelar_btn');
    if (btnCancelar) {
      btnCancelar.style.display = 'block';
    }
  }

  somarCustos(extratos: Extrato[]): number {
    return extratos.reduce((total, extrato) => total + extrato.valor, 0);
  }
}
