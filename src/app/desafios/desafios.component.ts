import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-desafios',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './desafios.component.html',
  styleUrl: './desafios.component.css'
})
export class DesafiosComponent {
  falar(texto: string): void {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel(); // interrompe leitura anterior
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; // idioma
    synth.speak(utterance);
  }
}
