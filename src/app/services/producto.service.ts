import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/Producto/'

  constructor(private http:HttpClient) { }

  getProducto():Observable<Producto[]>{
    return this.http.get<Producto[]>((`${this.myAppUrl}${this.myApiUrl}`));
  }

  getProductosCategoria(id:number):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addProducto(producto:Producto):Observable<number>{
    return this.http.post<number>(`${this.myAppUrl}${this.myApiUrl}`,producto);
  }

  getId(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.myAppUrl}${this.myApiUrl}editar${id}`);
  }

  putPedido(producto:Producto):Observable<number>{
    return this.http.put<number>(`${this.myAppUrl}${this.myApiUrl}${producto.id}`,producto);
  }

  eliminarProducto(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

}
