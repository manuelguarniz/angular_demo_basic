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
  private errores: string[];

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
      cliente => {
        this.router.navigate(['/clientes']);
        swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend:' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.clienteServices.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend:' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
