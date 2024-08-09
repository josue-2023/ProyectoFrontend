import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';
import { AutentificacionService } from '../../service/autentificacion.service';
import { Usuario } from '../../models/Usuario';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink,RouterOutlet,MatCardModule, CommonModule, RouterOutlet,RouterModule, ReactiveFormsModule,
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
    MatRadioModule, MatListModule, MatIconModule,MatIcon ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent  implements OnInit {
  currentUser: any = null;
  updateMode: boolean = false;
  updatedUserData: any = {};
  id!: number;

  usuario:Usuario = {
    username:'',
    firstName: '',
    lastName: '',
    email: '',
    role: 0,
    password:'',
    token:'',
  };
 rol!:string;

  constructor(
    private _usuarioService:UsuarioService,
    private router: Router,
    private _loginService:AutentificacionService,
    //private aRoute:ActivatedRoute,
    private user:AutentificacionService,
    private snackBar: MatSnackBar
  ) {

    this.id = Number(localStorage.getItem('userId'));
    if (isNaN(this.id)) {
      console.error('El ID del usuario no se encontró o no es válido');
   
  } else {
    console.log(this.id)
      this.editar(this.id); 
  }
   }

  ngOnInit(): void {

  
   
  }


  toggleUpdateMode(): void {
    this.updateMode =false;

   
  }

  deleteAccount(): void {
  
  }

  logout(): void {
    this._loginService.logout;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
  
   return false;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }


  editar(id:number):void{
    if (id === undefined ) {
      alert('El ID del pedido es indefinido');
      return ;

    }
    this._usuarioService.getId(id).subscribe({
      next:data=>{
        console.log(data);
        this.usuario.firstName=data.firstName + ' ' +data.lastName;
        this.usuario.lastName=data.lastName;
        this.usuario.email=data.email;
        if(data.role==1){
          this.rol='Admin';
        }else{
          this.rol='Usuario'
        }
        
        
      }
      ,
      error: error => {
      alert("Ocurrió un error");
    },
    complete: () => {
      console.info('obtener clientes');
  
    }
    });
      
  }


  }

  




