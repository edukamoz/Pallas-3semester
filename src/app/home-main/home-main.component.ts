import { Component } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { EquipeComponent } from '../equipe/equipe.component';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [RouterModule, EquipeComponent],
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.css'
})
export class HomeMainComponent {

}
