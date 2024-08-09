import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/Orden/';

  constructor(private http: HttpClient) { }

  getOrden():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  addPedido(pedido:Pedido):Observable<number>{
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`,pedido);
  }

  eliminarPedido(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getPedidosId(id:number):Observable<Pedido>{
    return this.http.get<Pedido>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  putPedido(pedido:Pedido):Observable<number>{
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}${pedido.id}`,pedido);
  }

  
}
