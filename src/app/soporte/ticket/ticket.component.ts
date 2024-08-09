
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
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

import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { DatePipe } from '@angular/common';
import { Genero } from '../../models/Genero';
import { Persona } from '../../models/Persona';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterLink,RouterModule,
    RouterOutlet,
    ReactiveFormsModule, 
    MatSlideToggleModule, MatCardModule, MatGridListModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,  MatSelectModule, MatDatepickerModule, MatTableModule,
    DatePipe, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  @ViewChild(MatSort) sort!: MatSort;
  title = 'taller-mat';
  minDate: Date;
  maxDate: Date;
  form: FormGroup ;

  genero: Genero[] = [
    {id: 1, valor: 'Si'},
    {id: 2, valor: 'No'},
  ];

  listaPersona: Persona[]=[];

  displayedColumns: string[] = ['id', 'cedula', 'nombre', 'apellido','fechaNacimiento','genero','correo','direccion','acciones'];
  dataSource: MatTableDataSource<Persona>;



  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar) {

    
    this.dataSource = new MatTableDataSource(this.listaPersona);

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.form = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],

    })

  }


  
  agregarPersona(){
    const persona: Persona = {
      cedula: this.form.value.cedula,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fechaNacimiento: this.form.value.fechaNacimiento,
      genero: this.form.value.genero,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
    }
    
    persona.id= this.listaPersona.length + 1,
    persona.estado=true;

    this.listaPersona.push(persona);
    this.dataSource.data=this.listaPersona;
    console.log(this.listaPersona)

    //this.dataSource = new MatTableDataSource(this.listaPersona);
    this.mensaje("registrado");
    //this.form.reset();


  }

  mensaje(texto: string) {
    this._snackBar.open(`El ticket fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

  limpiar(){
    this.form.reset;
  }
  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
