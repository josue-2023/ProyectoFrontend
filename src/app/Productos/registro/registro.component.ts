
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,
    MatButtonModule, 
    ReactiveFormsModule,RouterOutlet, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatSelectModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form!:FormGroup;
  edit!:number;
  boton:string="agregar";
  dataSource:any;
  touched = false;
  productoDisabled=false;
  displayedColumns: string[] = [ 'id','nombre','categoria','marca','precio','cantidad','proveedor','estado', 'acciones'];
  lstProducto:Producto[]=[];
  lstCategoria:Categoria[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  proveedor: any[] = [
    {id: 1, nombre: 'ANDRADE'},
    {id: 2, nombre: 'MOREIRA'},
    {id: 3, nombre: 'CHAVEZ'},
  ];

  estado:any []=[
    {id:0,estado:"Inactivo"},
    {id:1,estado:"Activo"},
  ];

  selectedpro = this.proveedor[2].value;

  

  


  constructor(private _productoService:ProductoService,
    private _categoriaService:CategoriaService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder){
    this.dataSource = new MatTableDataSource<Producto>(this.lstProducto);
    this.form= this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)]],
      marca: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      proveedor: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required],
    
      
  })
  
  this.dataSource.filterPredicate = (data: Producto, filter: string) => {
    const dataStr = `${data.nombre} ${data.categoria?.nombre} ${data.precio} ${data.marca}  ${data.cantidad} ${data.estado}`.toLowerCase();
    return dataStr.includes(filter);
  };

  }

  filtros(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.obtenerProductos();
    this.obtenerCategorias();
    
  }

  limpiar(){
    /*
    this.form.patchValue({
      categoria:'',
      producto:'',
      cantidad:'',
      nombre:'',
      precio:'',
      marca:'',
      proveedor:'',
      estado:''

    });*/
    this.form.reset();
    this.boton="Agregar";
    this.edit=0;
  }

  onInputChange() {
    this.touched = true; // Marca el formulario como tocado cuando se introduce algo
}
  

    obtenerProductos(){
      this._productoService.getProducto().subscribe({
        next:data=>{
          console.log(data);
            this.lstProducto=data
            this.dataSource.data=data;
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se obtuvo los productos con exito');
      
        }
      });
    }

    obtenerCategorias(){
      this._categoriaService.getCategoria().subscribe({
        next:data=>{
          console.log(data);
            this.lstCategoria=data;
         
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se obtuvo las categorias con exito');
      
        }
      });
    }

    editar(id:number):void{
      this.edit=id;
      if (id === undefined ) {
        alert('El ID del pedido es indefinido');
        return ;

      }
      this._productoService.getId(id).subscribe({
        next:data=>{
          console.log(data);
          this.form.patchValue({
            nombre:data.nombre,
            marca:data.marca,
            cantidad:data.cantidad,
            categoria:data.categoriaId,
            precio:data.precio,
            proveedor:data.proveedor,
            estado:data.estado
          });
        }
        ,
        error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('obtener pedidos por id');
        this.boton="Actualizar";
      }
      });
        
    }

    modificar():void{
      const producto:Producto={
        id:this.edit,
        nombre:this.form.value.nombre,
        marca:this.form.value.marca,
        precio:this.form.value.precio,
        cantidad:this.form.value.cantidad,
        proveedor:this.form.value.proveedor,
        categoriaId:this.form.value.categoria,
        estado:this.form.value.estado
    }
    console.log('este es el producto',producto);

      this._productoService.putPedido(producto).subscribe({
        next:data=>{
          console.log('asi se esta enviando',data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se modifico el producto con exito');
          this.obtenerProductos();
          this.snackBar.open('Producto  Modificado', 'Cerrar', {
            duration: 3000, // Duración del snackbar en milisegundos (opcional)
             verticalPosition: 'top'
          });
        }
      });
    }

    agregarProductos():void{
      const producto:Producto={
          nombre:this.form.value.nombre,
          marca:this.form.value.marca,
          precio:this.form.value.precio,
          cantidad:this.form.value.cantidad,
          proveedor:this.form.value.proveedor,
          categoriaId:this.form.value.categoria,
          estado:this.form.value.estado,
      }

      this._productoService.addProducto(producto).subscribe({
        next:data=>{
          console.log(data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se agrego el producto con exito');
          this.obtenerProductos();
        }
      });
    }

    elimiarProducto(id:number):void{
      this._productoService.eliminarProducto(id).subscribe({
      next:data=>{
        console.log(data);
        
        
      },
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
      this.snackBar.open('Producto  Inactivo', 'Cerrar', {
        duration: 3000, // Duración del snackbar en milisegundos (opcional)
        verticalPosition: 'top'
      });
      this.obtenerProductos();
    }
    });

 
    //this.limpiar();
  }

    
  existeProducto(nombre:string):boolean{
    return this.lstProducto.some(producto => producto.nombre==nombre);
  }

  Guardar(){
    if (this.edit > 0) {
      // Guardamos el producto original para comparar el nombre
      const productoOriginal = this.lstProducto.find(producto => producto.id === this.edit);
      
      // Si el nombre ha cambiado y existe en la lista, mostramos el mensaje de error
      if (productoOriginal && productoOriginal.nombre !== this.form.value.nombre &&
          this.existeProducto(this.form.value.nombre)) {
          this.snackBar.open('Este producto ya fue añadido', 'Cerrar', {
              duration: 3000, // Duración del snackbar en milisegundos (opcional)
              verticalPosition: 'top'
          });
      } else {
          // Si los nombres son iguales o el nombre no existe, se modifica el producto
          this.modificar();
      }
  } else {
      // Modo agregar nuevo producto
      if (this.existeProducto(this.form.value.nombre)) {
          this.snackBar.open('Este producto ya fue añadido', 'Cerrar', {
              duration: 3000, // Duración del snackbar en milisegundos (opcional)
              verticalPosition: 'top'
          });
      } else {
          this.boton = "Agregar";
          this.agregarProductos();
          this.limpiar();
      }
  }
}




}
