import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = 'Crear cliente';

  constructor(
    private clienteServices: ClienteService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRouter.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteServices.getCliente(id).subscribe(
          (response: Cliente) => {
            this.cliente = response;
          }
        );
      }
    });
  }

  create(): void {
    this.clienteServices.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `${response.mensaje}: ${response.cliente.nombre}`, 'success');
      }
    );
  }

  update(): void {
    this.clienteServices.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success');
      }
    );
  }
}
