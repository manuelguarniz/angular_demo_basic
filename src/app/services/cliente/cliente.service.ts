import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { CLIENTES } from 'src/app/shared/cliente/clientes.json';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';

@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(map( (response: Cliente[]) => {
      return response as Cliente[];
    }));
  }
}
