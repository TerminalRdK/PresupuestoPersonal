import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto:string;
  cantidad:number;
  formularioIncorrecto:boolean;
  textIncorrecto:string;
  constructor(private _pressupuestoService: PresupuestoService) {
    this.nombreGasto='';
    this.cantidad=0;
    this.formularioIncorrecto=false;
    this.textIncorrecto='';
   }

  ngOnInit(): void {
  }
  agregarGasto(){
    if (this.cantidad>this._pressupuestoService.restante) {
      this.formularioIncorrecto=true;
      this.textIncorrecto="Cantidad Ingresada es mayor al restante"
      return;
    }

    if (this.nombreGasto===''|| this.cantidad<=0) {
      this.formularioIncorrecto=true;
      this.textIncorrecto='Nombre de gasto o cantidad incorrecta';
    }else{
      //crear objeto
      const GASTO = {
        nombre:this.nombreGasto,
        cantidad:this.cantidad
      }
      //enviar el objeto a los suscriptores via subject
      this._pressupuestoService.agregarGasto(GASTO);

      //reseteamos formulario
      this.formularioIncorrecto=false;
      this.nombreGasto='';
      this.cantidad=0;
    }
  }

}
