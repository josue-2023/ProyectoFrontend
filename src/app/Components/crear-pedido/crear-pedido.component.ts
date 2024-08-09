import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { Pedido } from '../../models/Pedido';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { Data, RouterOutlet } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { PedidoService } from '../../services/pedido.service';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import { detallePedido } from '../../models/detallePedido';
import { DetallePedidosService } from '../../services/detalle-pedidos.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatIconModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    DatePipe,
    MatGridListModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  
  
  templateUrl: './crear-pedido.component.html',
  styleUrl: './crear-pedido.component.css'
})
  export class CrearPedidoComponent implements OnInit {
    form: FormGroup ;
    touched = false;
    isSelectDisabled = false;
    isGuardarDisabled = true;
    opcionSeleccionada!:number;
    p:any;
    idtotal!:number;
    idPedido!:number;
    iddetallePedido!:number;
    dataSource:any;
    lstPedidos:any | null []=[];
    lstClientes:Cliente[]=[];
    lstProducto:Producto[]=[];
    lstCategoria:Categoria[]=[];
    lstDetallePedido:detallePedido[]=[];
    lstProductoCategoria:Producto[]=[];

    

    displayedColumns: string[] = [ 'producto','cantidad','subtotal','acciones'];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    

    
    constructor(@Inject(MAT_DIALOG_DATA)public data:number,private fb: FormBuilder
      ,private _pedidoService:PedidoService
      ,private _clienteService:ClienteService
      ,private _productoService:ProductoService
      ,private _categoriaService:CategoriaService
      ,private _detallePedido:DetallePedidosService
      ,private snackBar: MatSnackBar
      ,public dialogRef: MatDialogRef<CrearPedidoComponent>,
    ){
      this.dataSource = new MatTableDataSource<detallePedido>(this.lstDetallePedido);
      this.p=data;
      this.form= this.fb.group({
        cliente: ['', Validators.required],
        producto: ['', Validators.required],
        cantidad: ['',Validators.required],
        categoria: ['', Validators.required],
        //cantidad: ['', Validators.required],
        //direccion: ['', Validators.required],
        //metodo: ['', [Validators.required,]],
        
    })

    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    ngOnInit():void{
      this.obtenerClientes();
      this.obtenerCategoria();
      //this.obtenerProductos();
      if(this.p.id>0){
        this.getPedidosId();
      }


     //console.log(this.p.id);

    }

    Guardar(){
      if(this.p.id>0){
        this.editarPedido();
      }else{
        //this.agregarPedido();
        this.modificiarPedido();
        this.dialogRef.close(0);
        
      }
      
      this.snackBar.open('Pedido Añadido', 'Cerrar', {
        duration: 3000, // Duración del snackbar en milisegundos (opcional)
        verticalPosition: 'top'
      });

    }
    
    agregarProducto(){


      if (this.idPedido !== undefined) {
        // Verificar si el producto ya existe en el detalle del pedido
        if (this.existeProducto(this.form.value.producto)) {
            this.snackBar.open('Este producto ya fue añadido', 'Cerrar', {
                duration: 3000, 
                verticalPosition: 'top'
            });
        } else {
            // Si no existe, se agrega al detalle del pedido
            this.agregarDetallePedido(this.idPedido);
           
        }
    } else {
        // Si no hay idPedido, se agrega un nuevo pedido
        this.agregarPedido();
    }

    // Desactivar/activar botones según sea necesario
    this.isSelectDisabled = true;
    this.isGuardarDisabled = false;
    
    }


    existeProducto(id:number):boolean{
      return this.lstDetallePedido.some(producto=> producto.productoId==id);
    }
    

    agregarPedido(){
      const pedido:Pedido={
        clienteId:this.form.value.cliente,
        fecha:this.form.value.fecha,
        //productoId:this.form.value.producto,
        cantidad:0,
        total:10,
        estado:1
        
      }

      this._pedidoService.addPedido(pedido).subscribe({
        next:(data)=>{
          this.idPedido=data;
          console.log(data);
          this.agregarDetallePedido(data);
          //this.modificiarPedido(data);
          this.idtotal=data;
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se agrego el pedido con exito');
          
        }
      });

      
      
    }


    modificiarPedido(){
      console.log('idPedido',this.p.id)
      const pedido:Pedido={
        id:this.idtotal,
        clienteId:this.form.value.cliente,
        fecha:new Date(0,0,0),
        //productoId:this.form.value.producto,
        cantidad:this.form.value.cantidad, 
        total:10,
        estado:1
      }

      console.log('idPedido',pedido.id)
      
      this._pedidoService.putPedido(pedido).subscribe({
        next:data=>{
          console.log(data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('Obtencion de modificaciones');
        }
      });
    }

    agregarDetallePedido(id:number){
      const detallePedido:detallePedido={
        ordenId:id,
        productoId:this.form.value.producto,
        //productoId:this.form.value.producto,
        cantidad:this.form.value.cantidad,
        total:0,
        subtotal:0,
        estado:'1'
        
      }
      this.iddetallePedido=id;
      

      this._detallePedido.addDetallePedido(detallePedido).subscribe({
        next:(data)=>{
          console.log(data);
          this.tablaPedido(this.idPedido);
          
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se agrego el producto con exito');
          this.snackBar.open('producto añadido  a la lista', 'Cerrar', {
            duration: 3000, // Duración del snackbar en milisegundos (opcional)
            verticalPosition: 'top'
          });
        }
      });
    }
    

    obtenerClientes():void{
      this._clienteService.getEstado().subscribe({
        next:data=>{
          console.log(data);
          this.lstClientes=data;
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('Obtencion de Clientes');
        }

      });
    }

    getPedidosId(){
      if (this.p.id === undefined ) {
        alert('El ID del pedido es indefinido');
        return ;

      }
      this._pedidoService.getPedidosId(this.p.id).subscribe({
        next:data=>{
          console.log(data);
          //this.opcionSeleccionada=data.producto?.categoriaId ?? 0;
          this.productoCategoria();
          this.form.patchValue({
            cliente:data.clienteId,
            
            //categoria:data.producto?.categoriaId,
            //producto:data.productoId,
            cantidad:data.cantidad
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


   



    editarPedido(){
      const pedido:Pedido={
        id:this.p.id,
        clienteId:this.form.value.cliente,
        fecha:new Date(0,0,0),
        //productoId:this.form.value.producto,
        cantidad:this.form.value.cantidad, 
        total:10,
        estado:1
      }

      
      this._pedidoService.putPedido(pedido).subscribe({
        next:data=>{
          console.log(data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('Obtencion de modificaciones');
        }
      });

      
      this.close();

    }

    obtenerProductos():void{

      this._productoService.getProducto().subscribe({
        next:data=>{
          console.log(data);
          this.lstProductoCategoria=data;
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('Obtencion de  productos');
        }

      });
    }

    close(){
      this.dialogRef.close(this.idPedido)
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


    tablaPedido(id:number){
      if (id=== undefined ) {
        alert('El ID del pedido es indefinido');
        return ;

      }

      this._detallePedido.getDetallesId(id).subscribe({
        next:data=>{
          console.log(data);
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

    eliminarDetalleP(id:number){
      this._detallePedido.eliminarDetalleP(id).subscribe({
        next:data=>{
          console.log('detalle Pedido Eliminado',data)
          
          this.tablaPedido(this.idPedido);
        }
        ,
          error: error => {
            alert("Ocurrió un error");
          },
          complete: () => {
            console.info('Eliminacion de Pedido completa');
            this.modificiarPedido();
            
          }
      });
    }
  
    onInputChange() {
      this.touched = true; // Marca el formulario como tocado cuando se introduce algo
  }
  }
