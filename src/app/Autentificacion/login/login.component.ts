///import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { AutentificacionService } from '../../service/autentificacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSnackBarModule,
    RouterOutlet, RouterLink,
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatGridListModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login!:boolean;
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  hide = true;
  form!:FormGroup;
  id!:number;
  //login:boolean=false;

  constructor(
   // private productoService: ProductoService,
    private  _usuarioService:UsuarioService,
    private _loginService:AutentificacionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { 
    


    this.form= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required], 
  })

  }
  /*
  onSubmit() {
  
    // Verificar si el usuario existe antes de intentar iniciar sesión
    if (this.productoService.userExists(this.email)) {
      if (this.productoService.login(this.email, this.password)) {
        if (this.rememberMe) {
          // Lógica para recordar la sesión del usuario
        }*
        // Mostrar mensaje de inicio de sesión exitoso
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
        });

        // Redirigir al usuario al perfil después del inicio de sesión exitoso
        this.router.navigate(['/inicio']);
      } else {
        // Mostrar mensaje de error de inicio de sesión
        this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
        });
      }
    } else {
      // Mostrar mensaje de usuario no registrado
      this.snackBar.open('Usuario no registrado', 'Cerrar', {
        duration: 3000, // Duración del snackbar en milisegundos (opcional)
      });
    }
      
  }*///

  onSubmit(){
    const usuario:Usuario={
        username:this.form.value.username,
        password:this.form.value.password,
    }
    this._usuarioService.Login(usuario).subscribe({
      next:data=>{
        this.id=data.id;
        console.log(data);
        this._loginService.login(data.token);
       this._loginService.setUserId(data.id);
       localStorage.setItem('userId', this.id.toString());
      
        this.router.navigate(['/cliente']);
        
      },
      error:error=>{
     
        
        this.snackBar.open('Credenciales incorrectas', 'Cerrar', {
          duration: 3000, 
          verticalPosition: 'top'
        });
        //alert(error.mensaje);

      
      },
      complete:()=> {
        //console.info('se obtuvo los productos con exito');
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
        //this.router.navigate(['/perfil', this.id]);

      }
    });

  }


/*
  register() {
    // Redirigir a la página de registro
    this.router.navigate(['/usuario']);
  }

  forgotPassword() {
    // Redirigir a la página de recuperación de contraseña
    this.router.navigate(['/forgot-password']); 
  }*/
 
}
