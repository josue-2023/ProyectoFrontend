import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-registro',
  standalone: true,
  imports: [ RouterModule,
    RouterOutlet, RouterLink, ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatRadioModule, MatListModule, MatIconModule 
  ],
  templateUrl: './usuario-registro.component.html',
  styleUrl: './usuario-registro.component.css'
})
export class UsuarioRegistroComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  phone: string = '';
  dob: Date | null = null;
  city: string = '';
  country: string = '';
  gender: string = '';
  cedula: string = '';
  address: string = '';
  hide = true;

  constructor( private router: Router) { }

  onRegister() {
  if (this.email && this.password && this.name && this.surname && this.phone && this.dob && this.city && this.country && this.gender && this.cedula && this.address) {
    // Assuming dob is expected to be a Date object in the register method
    //this.productoService.register(this.email, this.password, this.name, this.surname, this.phone, this.dob, this.city, this.country, this.gender, this.cedula , this.address);

    // Redirige al usuario después del registro exitoso
    this.router.navigate(['/cuerpo']);
  }
}
}
