import { Component } from '@angular/core';
import { Extrato } from 'src/app/modules/extrato';
import { ExtratoService } from 'src/app/services/extrato.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  extratos: Extrato[] = []

  constructor(private extratoService: ExtratoService){
    console.log('TO AQUI', environment.api);
    this.obterExtratosCadastrados();
  }

  obterExtratosCadastrados() {
    this.extratoService.obterExtratos().subscribe(extratos => this.extratos = extratos);
  }
}
