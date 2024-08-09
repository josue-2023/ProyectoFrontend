import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PedidosComponent } from "./Components/pedidos/pedidos.component";
import { DetallesComponent } from "./Components/detalles/detalles.component";
import { CabezeraComponent } from "./Components/cabezera/cabezera.component";
import { MenuComponent } from "./menu/menu.component";
import { LoginComponent } from './Autentificacion/login/login.component';
import { RegistroComponent } from './Productos/registro/registro.component';
import { FormularioComponent } from './Envios/formulario/formulario.component';
import { UsuarioRegistroComponent } from './Autentificacion/usuario-registro/usuario-registro.component';
import { TicketComponent } from './soporte/ticket/ticket.component';
import { PerfilComponent } from './Autentificacion/perfil/perfil.component';
import { RegistroClienteComponent } from './Cliente/registro-cliente/registro-cliente.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,RouterLink, 
      PedidosComponent, DetallesComponent, 
      CabezeraComponent, MenuComponent,
      LoginComponent,
      RegistroComponent,
      FormularioComponent,
      UsuarioRegistroComponent,
      TicketComponent,
      PerfilComponent,
      RegistroClienteComponent
    ]
})
export class AppComponent {
  title = 'Proyecto';
}
