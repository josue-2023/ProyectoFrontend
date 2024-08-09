import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private myAppUrl:string=environment.endpoint;
  private myApiUrl:string='api/Categoria/';

  constructor(private http: HttpClient) { }

  getCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  
}
