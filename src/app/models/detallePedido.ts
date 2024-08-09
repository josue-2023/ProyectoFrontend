import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

export interface detallePedido{
    id?:number;
    ordenId:number,
    orden?:Pedido,
    productoId:number,
    producto?:Producto,
    cantidad:number,
    total:number
    subtotal:number,
    estado:string
}