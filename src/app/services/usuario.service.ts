import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/Usuario/'
  
  constructor(private http:HttpClient) { }


  sign(usuario:Usuario):Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}registrar`,usuario);
  }

  Login(usuario:Usuario):Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}autentificacion`,usuario);
  }

  getId(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }



}
  