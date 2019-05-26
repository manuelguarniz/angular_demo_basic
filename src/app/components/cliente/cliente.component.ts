import { Component, OnInit } from '@angular/core';
import { CLIENTES } from 'src/app/shared/cliente/clientes.json';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private _clienteServices: ClienteService
  ) { }

  ngOnInit() {
    this._clienteServices.getClientes().subscribe((req) => {
      this.clientes = req;
    });
  }

}
