import { Routes } from '@angular/router';
import { CrearPedidoComponent } from './Components/crear-pedido/crear-pedido.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
import { PedidosComponent } from './Components/pedidos/pedidos.component';
import { LoginComponent } from './Autentificacion/login/login.component';
import { RegistroComponent } from './Productos/registro/registro.component';
import { FormularioComponent } from './Envios/formulario/formulario.component';
import { UsuarioRegistroComponent } from './Autentificacion/usuario-registro/usuario-registro.component';
import { TicketComponent } from './soporte/ticket/ticket.component';
import { PerfilComponent } from './Autentificacion/perfil/perfil.component';
import { RegistroClienteComponent } from './Cliente/registro-cliente/registro-cliente.component';
//import { RegistroComponent } from './Autentificacion/registro/registro.component';

//import { DetallePedidosComponent } from './Components/detalle-pedidos/detalle-pedidos.component';

export const routes: Routes = [
   // { path:'enviar/:cantidad',component:CrearPedidoComponent,}
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent},
   { path: 'perfil/:id', component: PerfilComponent},   
   { path: 'perfil', component: PerfilComponent},
   { path: 'usuario', component: UsuarioRegistroComponent},
   { path: 'registro', component: RegistroComponent},
   { path: 'cliente', component: RegistroClienteComponent},
   { path: 'productos', component: RegistroComponent },  
    { path:'detalle',component:DetallesComponent,},
    { path: 'editar/:id', component: DetallesComponent},    
    { path: 'gestion', component: PedidosComponent},      
    { path: 'envios', component: FormularioComponent},  
    { path: 'soporte', component: TicketComponent},
    //{ path:'gestion',component:PedidosComponent}

    
];


