import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-cabezera',
  standalone: true,
  imports: [MatToolbarModule,MatButton,MatIcon],
  templateUrl: './cabezera.component.html',
  styleUrl: './cabezera.component.css'
})
export class CabezeraComponent {

}
