import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { detallePedido } from '../models/detallePedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidosService {
  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/DetallePedido/';

  constructor(private  http:HttpClient) { }

  addDetallePedido(pedido:detallePedido):Observable<number>{
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`,pedido);
  }

  putPedido(pedido:detallePedido):Observable<number>{
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}${pedido.id}`,pedido);
  }

  eliminarDetalleP(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  /*
  getDetallePedido():Observable<detallePedido[]>{
    return this.http.get<detallePedido[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
    */

  getDetallesId(id:number):Observable<detallePedido[]>{
    return this.http.get<detallePedido[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getDetallesId2(id:number):Observable<detallePedido>{
    return this.http.get<detallePedido>(`${this.myAppUrl}${this.myApiUrl}detalle/${id}`);
  }

  getProducto(id:number,productoId:number):Observable<detallePedido>{
    return this.http.get<detallePedido>(`${this.myAppUrl}${this.myApiUrl}producto/${id}/${productoId}`);
  }




}
