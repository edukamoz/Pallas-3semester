import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HomeMainComponent } from '../home-main/home-main.component';
import { DesafiosComponent } from '../desafios/desafios.component';
import { JogosComponent } from '../jogos/jogos.component';
import { RecursosComponent } from '../recursos/recursos.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
