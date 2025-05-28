import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  lerTexto(texto: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      window.speechSynthesis.cancel(); // Cancela fala anterior
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Desculpe, seu navegador não suporta leitura por voz.');
    }
  }

  // Pode chamar lerTexto ao passar o mouse em cima
}
