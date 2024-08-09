import { Categoria } from "./Categoria";

export interface  Producto{
    id?:number;
    nombre:string;
    marca:string;
    cantidad:number;
    precio:number;
    proveedor:string;
    estado:number;
    categoriaId:number;
    categoria?:Categoria;
}