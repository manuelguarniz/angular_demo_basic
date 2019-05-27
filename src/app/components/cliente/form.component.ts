import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = 'Crear cliente';

  constructor(
    private _clienteServices: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  create(): void {
    this._clienteServices.create(this.cliente).subscribe(
      reponse => {
        this.router.navigate(['/clientes']);
      }
    );
  }
}
