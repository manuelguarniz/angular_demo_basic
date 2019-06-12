import { Component, OnInit } from '@angular/core';
import { CLIENTES } from 'src/app/shared/cliente/clientes.json';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/Operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[];
  valorboolean: boolean = true;

  constructor(
    private _clienteServices: ClienteService
  ) { }

  ngOnInit() {
    this._clienteServices.getClientes().pipe(
      // trabajar con lso datos sin cambiarlos
        tap( clientes => {
          console.log('CleinteService: tab 3');
          clientes.forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Esta seguro?',
      text: `Una vez eliminado el cliente ${cliente.nombre} ${cliente.apellido} no se podra recuperar`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this._clienteServices.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(x => x !== cliente);
            swal(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }
}
