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
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-cliente',
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
    MatSelectModule],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})
export class RegistroClienteComponent {
  form!:FormGroup;
  email: string = '';
  edit!:number;
  boton:string="agregar";
  dataSource:any;
  touched = false;
  productoDisabled=false;
  displayedColumns: string[] = [ 'id','cedula','nombre','apellido','correo','estado', 'acciones'];
  lstcliente:Cliente[]=[];
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


  constructor(
    private _clienteServices:ClienteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder){
    this.dataSource = new MatTableDataSource<Cliente>(this.lstcliente);
    this.form= this.fb.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)]],
apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)]],
correo: ['', [Validators.required, Validators.email]],
estado: ['', Validators.required],
    
      
  })
  
  this.dataSource.filterPredicate = (data: Cliente, filter: string) => {
    const dataStr = `${data.cedula} ${data.nombre} ${data.apellido} ${data.correo} ${data.estado}`.toLowerCase();
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
    this.obtenerClientes();
    
  }

  limpiar(){
    /*
    this.form.patchValue({
      cedula:'',
      nombre:'',
      apellido:'',
      correo:'',
      estado:''

    });*/
    this.form.reset(); // Limpia el formulario
    this.touched = false; // Restablece la bandera
    this.boton="Agregar";
    this.edit=0;
  }

  onInputChange() {
    this.touched = true; // Marca el formulario como tocado cuando se introduce algo
}

  

    obtenerClientes(){
      this._clienteServices.getCliente().subscribe({
        next:data=>{
          console.log(data);
            this.lstcliente=data
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


    editar(id:number):void{
      this.edit=id;
      if (id === undefined ) {
        alert('El ID del pedido es indefinido');
        return ;

      }
      this._clienteServices.getId(id).subscribe({
        next:data=>{
          console.log(data);
          this.form.patchValue({
            cedula:data.cedula,
            nombre:data.nombre,
            apellido:data.apellido,
            correo:data.correo,
            estado:data.estado
          });
        }
        ,
        error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('obtener clientes');
        this.boton="Actualizar";
      }
      });
        
    }

    modificar():void{
      const clientes:Cliente={
        id:this.edit,
        cedula:this.form.value.cedula,
        nombre:this.form.value.nombre,
        apellido:this.form.value.apellido,
        correo:this.form.value.correo,
        estado:this.form.value.estado
    }

      this._clienteServices.putCliente(clientes).subscribe({
        next:data=>{
          console.log(data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se modifico el Cliente con exito');
          this.obtenerClientes();
          this.snackBar.open('Cliente Modificado', 'Cerrar', {
            duration: 3000, // Duración del snackbar en milisegundos (opcional)
             verticalPosition: 'top'
          });
        }
      });
    }

    agregarCliente():void{
      const cliente:Cliente={
        cedula:this.form.value.cedula,
        nombre:this.form.value.nombre,
        apellido:this.form.value.apellido,
        correo:this.form.value.correo,
        estado:this.form.value.estado
      }

      this._clienteServices.addCliente(cliente).subscribe({
        next:data=>{
          console.log(data);
        },
        error:error=>{
          alert("Ocurrio un error");
        },
        complete:()=> {
          console.info('se agrego el producto con exito');
          this.obtenerClientes();
          this.snackBar.open('Cliente Añadido', 'Cerrar', {
            duration: 3000, // Duración del snackbar en milisegundos (opcional)
             verticalPosition: 'top'
          });
        }
      });
    }

    elimiarCliente(id:number):void{
      this._clienteServices.eliminarCliente(id).subscribe({
      next:data=>{
        console.log(data);
        
        
      },
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener Orden y Producto');
      this.obtenerClientes();
      this.snackBar.open('Cliente Inactivo', 'Cerrar', {
        duration: 3000, // Duración del snackbar en milisegundos (opcional)
         verticalPosition: 'top'
      });
    }
    });

    //this.limpiar();
  }

  existePersona(cedula:string):boolean{
    return this.lstcliente.some(cliente => cliente.cedula==cedula);
  }


  Guardar(){
    if (this.edit > 0) {
      // Guardamos el cliente original para comparar la cédula
      const clienteOriginal = this.lstcliente.find(cliente => cliente.id === this.edit);
      
      // Si la cédula ha cambiado y existe en la lista, mostramos el mensaje de error
      if (clienteOriginal && clienteOriginal.cedula !== this.form.value.cedula && 
          this.existePersona(this.form.value.cedula)) {
          this.snackBar.open('Este Cliente ya fue añadido', 'Cerrar', {
              duration: 3000, // Duración del snackbar en milisegundos (opcional)
              verticalPosition: 'top'
          });
      } else {
          // Si las cédulas son iguales o la cédula no existe, se modifica el cliente
          this.modificar();
      }
  } else {
      // Modo agregar nuevo cliente
      if (this.existePersona(this.form.value.cedula)) {
          this.snackBar.open('Este Cliente ya fue añadido', 'Cerrar', {
              duration: 3000, // Duración del snackbar en milisegundos (opcional)
              verticalPosition: 'top'
          });
      } else {
          this.boton = "Agregar";
          this.agregarCliente();
          this.limpiar();
      }
  }
   }

}


