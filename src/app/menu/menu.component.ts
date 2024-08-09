import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { AutentificacionService } from '../service/autentificacion.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule,MatButton,MatIcon,CommonModule,RouterModule,MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
logins!:boolean;

  
  constructor(private loginService:AutentificacionService,private aRoute:ActivatedRoute) { 
    

  }

  
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    this.loginService.logout();
  }
  
}
