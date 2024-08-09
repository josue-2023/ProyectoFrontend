import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-formulario',
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
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  form: FormGroup;
  dataSource:any;
  registros: any[] = [];
  displayedColumns: string[] = [
    'codigo', 
    'direccionCalles', 
    'ciudad', 
    'parroquia', 
    'referencia', 
    'codigopostal', 
    'telefono', 
    'actions'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      direccionCalles: ['', Validators.required],
      ciudad: ['', Validators.required],
      parroquia: ['', Validators.required],
      referencia: [''],
      codigopostal: [''],
      telefono: ['']
    });
  }

  guardar(): void {
    if (this.form.valid) {
      this.registros.push(this.form.value);
      this.form.reset();
    }
  }

  eliminar(codigo: string): void {
    this.registros = this.registros.filter(registro => registro.codigo !== codigo);
  }
}