import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { CrearPedidoComponent } from '../crear-pedido/crear-pedido.component';

import { RouterOutlet,RouterLink, Data } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Categoria } from '../../models/Categoria';
import { Title } from '@angular/platform-browser';
import { DetallePedidosService } from '../../services/detalle-pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
  MatDialogModule,
  RouterOutlet,
  RouterLink,
  MatButtonModule,
  MatFormFieldModule, 
  MatDatepickerModule, 
  MatIconModule, 
  MatInputModule, 
  MatTableModule, 
  MatSortModule, 
  MatPaginatorModule,
  DatePipe,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  CommonModule
 
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  orderName!:string;
  description!:string;
  estado:string='5';
  dataSource:any;
  lstOrden:Pedido[]=[];
  //lstCategoria:Categoria[]=[];

  constructor(private dialog:MatDialog, 
    private _detallePedidoP:DetallePedidosService,
    private _OrdenService:PedidoService){
    this.dataSource = new MatTableDataSource<Pedido>(this.lstOrden);
      

    
    this.dataSource.filterPredicate = (data: Pedido, filter: string) => {
      const dataStr = `${data.cliente?.nombre} ${data.fecha}  ${data.cantidad} ${data.estado}`.toLowerCase();
      return dataStr.includes(filter);
    };
  }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


obtenerPedidos():void{
    this._OrdenService.getOrden().subscribe({
      next: data => {
        console.log(data);
        this.lstOrden = data;
        this.dataSource.data = this.lstOrden;
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de Pedidos Completa');
      }
    });
  }

  displayedColumns: string[] = [ 'id','cliente','fecha','cantidad','total', 'estado', 'acciones'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  filtros(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }




eliminarPedido(id:number){

  this._OrdenService.eliminarPedido(id).subscribe({
    next:data=>{
      console.log('Pedido Eliminado',data)
      this.obtenerPedidos();
    }
    ,
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Eliminacion de Pedido completa');
        
      }
  });

  
}

obtenerId(row:number){

  this.editar(row);
}

editar(row:number){
    
   
      this.onCreate(row,'Editar Pedido');

}

crearPedido(){
      this.onCreate(0,'Crear Pedido');
}


onCreate(code:number, title:any){
      const dialogRef = this.dialog.open(CrearPedidoComponent, {
        data:{
          title:title,
          id:code
        }

      });

      dialogRef.afterClosed().subscribe(item=>{
        console.log(item);
        if(item>0){
        this.eliminarPedido(item);
        
          
        }
        this.obtenerPedidos();
      });
      
}

}
