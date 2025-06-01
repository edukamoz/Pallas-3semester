import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent {

  // Função para falar um texto usando Web Speech API
  speak(text: string) {
    if ('speechSynthesis' in window) {
      // Para se tiver algo falando, cancelar antes
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR'; // Define português do Brasil
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
    }
  }
}
