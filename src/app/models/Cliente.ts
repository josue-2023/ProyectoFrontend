import { Pedido } from "./Pedido";

export interface Cliente{
    id?:number;
    cedula:string;
    nombre:string;
    apellido:string;
    correo:string;
    estado:number;
    Pedido?:Pedido[];
}