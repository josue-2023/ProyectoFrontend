import { AfterViewInit,Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule, MatHint} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';


import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { CommonModule, DatePipe } from '@angular/common';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../services/pedido.service';
import { DetallePedidosService } from '../../services/detalle-pedidos.service';
import { detallePedido } from '../../models/detallePedido';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [
    RouterOutlet, ReactiveFormsModule,CommonModule,
    MatSlideToggleModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,  MatSelectModule, MatDatepickerModule, MatTableModule,
    DatePipe, MatIconModule,MatFormFieldModule, MatInputModule , MatTableModule, MatSortModule, MatPaginatorModule,
  ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  indice!:number;
  total!:number;
  productoRegistrado!:number;
  isSelectDisabled = false;
  productoDisabled = false;
  productoExiste= false;
  actualizar:string="Guardar"
  idPedido!:number;
  idDetalle!:number;
  idProducto!:number;
  touched = false;
  opcionSeleccionada!:number;
  lstDetallePedido:detallePedido[]=[];
  lstCategoria:Categoria[]=[];
  lstProductoCategoria:Producto[]=[];
  lstCliente:Cliente[]=[];
  actualizarId!:number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [ 'producto', 'cantidad','subtotal','acciones'];
  dataSource:any;

  form:FormGroup;


  constructor(private fb:FormBuilder,
    private aRoute:ActivatedRoute,
    private _Pedido:PedidoService,
    private _productoService:ProductoService,
    private  _detallePedido:DetallePedidosService,
    private _categoriaService:CategoriaService,
    private _clienteService:ClienteService,
    private _pedidoService:PedidoService,
    private snackBar: MatSnackBar,
  ){
   
    this.dataSource = new MatTableDataSource<detallePedido>(this.lstDetallePedido);
    this.idPedido=Number(this.aRoute.snapshot.paramMap.get('id'))
    this.actualizarId=this.idPedido;
    this.form=this.fb.group({
      cliente: ['', Validators.required],
      categoria: ['', Validators.required],
      producto: ['', Validators.required],
      cantidad: ['', Validators.required],
   
      
    })
    this.dataSource.filterPredicate = (data: detallePedido, filter: string) => {
      const dataStr = `${data.producto?.nombre}  ${data.cantidad} ${data.estado}`.toLowerCase();
      return dataStr.includes(filter);
    };

    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onInputChange() {
    this.touched = true; // Marca el formulario como tocado cuando se introduce algo
}


    
  ngOnInit():void{
    this.getPedidosId();
    this.obtenerClientes();
    this.obtenerCategoria();
    this.tablaPedido();
    this.isSelectDisabled=true;
    }



  filtros(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

  
  }

  errorProducto(){
    this._detallePedido.getProducto(this.idPedido,this.form.value.producto).subscribe({
      next:data=>{
        console.log(data);
        if(data==null ){
          this.productoRegistrado=0
        }else{
          this.productoRegistrado=1;
        }
        
      } ,
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
      
      this.finalizarGuardado();
      this.limpiar();
    }
    });
    
  }

  finalizarGuardado(){
    if (this.productoRegistrado == 0 || this.idDetalle>0) {
      if(this.idDetalle>0){
        console.log('este es el id de detalle',this.idPedido);
        this.actualizarProductos();
       
      }else{
        this.agregarProducto();
       
      }
    
    } else if(this.productoRegistrado == 1) {
      // Lógica para cuando el producto no existe
      this.snackBar.open('Este Producto ya fue añadido', 'Cerrar', {
        duration: 3000, // Duración del snackbar en milisegundos (opcional)
        verticalPosition: 'top'
      });
      
      this.productoExiste=false;
      console.log('true2', this.productoExiste);

    }else if(this.idDetalle>0){
      console.log('este es el id de detalle',this.idPedido);
      this.actualizarProductos();
    }
  }

  
  Guardar(){
    this.errorProducto();
    
  }



  editar(id:number){
    this.productoDisabled=true;
    this.idDetalle=id;
    this.obtenerCategoria();
    this.actualizar="Actualizar"

    if (id === undefined ) {
      alert('El ID del pedido es indefinido');
      return ;

    }
    console.log('este es el idddd',id);
    this._detallePedido.getDetallesId2(id).subscribe({
      next:data=>{
        this.opcionSeleccionada=data.producto?.categoriaId ?? 0;
        this.productoCategoria();
        this.form.patchValue({
          categoria:data.producto?.categoria?.id,
          //categoria:data.producto?.categoriaId,
          producto:data.productoId,
          cantidad:data.cantidad
        });
      }
      ,
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
     
    }
    });
        

  }

  actualizarProductos(){
    const detallePedido:detallePedido={
          id:this.idDetalle,
          ordenId:this.idPedido,
          productoId:this.form.value.producto,
          cantidad:this.form.value.cantidad,
          total:0,
          subtotal:0,
          estado:"1"
    }

    console.log('id detalle ',this.actualizarId)

    this._detallePedido.putPedido(detallePedido).subscribe({
      next:data=>{
        console.log(data);
        this.tablaPedido();
      },
      error:error=>{
        alert("Ocurrio un error");
      },
      complete:()=> {
        this.modificiarPedido();
        console.info('Obtencion de modificaciones masmodificiacion');
        this.snackBar.open('Producto Actualizado', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
      }
    });
  }

  obtenerClientes(){
    this._clienteService.getCliente().subscribe({
      next:data=>{
        console.log(data);
        this.lstCliente=data;
      },
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
    }
    });
  }
  
  obtenerCategoria(){
    this._categoriaService.getCategoria().subscribe({
      next:data=>{
        console.log(data);
        this.lstCategoria=data;
      },
      error:error=>{
        alert("Ocurrio un error");
      },
      complete:()=> {
        console.info('Obtencion de categorias');
      }
    });
   
  }

  agregarPersona(){
      
  }

  modificiarPedido(){
    console.log('si ingreso el pedido');
    const pedido:Pedido={
      id:this.idPedido,
      clienteId:this.form.value.cliente,
      fecha:new Date(0,0,0),
      //productoId:this.form.value.producto,
      cantidad:this.form.value.cantidad, 
      total:0,
      estado:1
    }

    console.log('idPedido',pedido.id)
    
    this._pedidoService.putPedido(pedido).subscribe({
      next:data=>{
        console.log('modificaciones',data);
        
      },
      error:error=>{
        alert("Ocurrio un error");
      },
      complete:()=> {
        console.info('Obtencion de modificaciones');
      }
    });
  }

  limpiar(){
    
    this.form.patchValue({
      categoria:'',
      producto:'',
      cantidad:'',
      descuento:'',

    });
    this.actualizar="agregar";
    this.productoDisabled=false;
    this.idDetalle=0;
   

  }

  getPedidosId(){
    if (this.idPedido === undefined ) {
      alert('El ID del pedido es indefinido');
      return ;

    }
    this._Pedido.getPedidosId(this.idPedido).subscribe({
      next:data=>{
        
        console.log(data);
        this.form.patchValue({
          cliente:data.clienteId,
          //categoria:data.producto?.categoriaId,
          //producto:data.productoId,
          //cantidad:data.cantidad
        });
      }
      ,
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener pedidos por id');
    }
    });
      
    
  }

  tablaPedido(){
    if (this.idPedido=== undefined ) {
      alert('El ID del pedido es indefinido');
      return ;

    }

    this._detallePedido.getDetallesId(this.idPedido).subscribe({
      next:data=>{
        
        console.log(data);
        this.total = data.reduce((acc, item) => item.total, 0);
        console.log('este es el total',this.total);
        this.lstDetallePedido=data;
        this.dataSource.data = this.lstDetallePedido;
      },
      error:error=>{
        alert("Ocurrio un error");
      },
      complete:()=> {
        console.info('Obtencion de detallesPedido');
      }
    });
  }

  productoCategoria(){

    if (this.opcionSeleccionada === undefined) {
      alert('El ID de  la categoria es definida');
      return ;
    }
    this._productoService.getProductosCategoria(this.opcionSeleccionada).subscribe({
      next:data=>{
        console.log(data);
        this.lstProductoCategoria=data;
      }
      ,
      error:error=>{
        alert("Ocurrio un error");

      },
      complete:()=> {
        console.info('Obtencion de productos por categoria');
      }
    });
    

  }

  opcionSeleccion(){
    this.productoCategoria();
  }


    


  agregarProducto(){
      console.log('id para agregar',this.idPedido);
      const detallePedido:detallePedido={
          ordenId:this.idPedido,
          productoId:this.form.value.producto,
          cantidad:this.form.value.cantidad,
          total:0,
         subtotal:0,
          estado:'1'
      }

    this._detallePedido.addDetallePedido(detallePedido).subscribe({
      next:data=>{
        console.log(data);
        this.tablaPedido();
      },
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      this.modificiarPedido();
      console.info('obtener Orden y Producto');

    }
    });

   
  }

  eliminarProducto(id:number){
    this._detallePedido.eliminarDetalleP(id).subscribe({
      next:data=>{
        console.log(data);
        
        
      },
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
      this.modificiarPedido();
      this.tablaPedido();
    }
    });

 
    this.limpiar();
  }


}
