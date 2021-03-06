import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/Operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';
// import {  DatePipe } from '@angular/common';

@Injectable()
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap( (response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response: any) => {
        const clientes = response.content as Cliente[];
        return clientes.map(cliente => {
          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        return response.cliente as Cliente;
      }),
      catchError( e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        if (e.status === 400) {
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );;
  }
}
