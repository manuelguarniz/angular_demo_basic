import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { CLIENTES } from 'src/app/shared/cliente/clientes.json';
import { Observable, of } from 'rxjs';

@Injectable()
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
