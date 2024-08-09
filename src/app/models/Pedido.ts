import { Cliente } from "./Cliente";
import { Producto } from "./Producto";

export interface Pedido{
    id?:number;
    clienteId:number;
    cliente?:Cliente;
    fecha:Date;
    //productoId:number;
    //producto?:Producto;
    cantidad:number;
    total:number;
    estado:number;
    
}