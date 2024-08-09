import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/Cliente/';

  constructor(private http: HttpClient) { }

  getCliente():Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getEstado():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}estado`);
    }

  putCliente(cliente:Cliente):Observable<number>{
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}${cliente.id}`,cliente);
  }

  eliminarCliente(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getId(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.myAppUrl}${this.myApiUrl}editar${id}`);
  }

  addCliente(cliente:Cliente):Observable<number>{
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`,cliente);
  }
  
}
