import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const elementos = document.querySelectorAll<HTMLElement>('[data-descricao]');
      elementos.forEach(el => {
        el.setAttribute('tabindex', '0'); // Acessibilidade por teclado
        el.addEventListener('mouseover', () => {
          const texto = el.getAttribute('data-descricao');
          if (texto) {
            this.falarTexto(texto);
          }
        });
      });
    }
  }

  falarTexto(texto: string): void {
    window.speechSynthesis.cancel(); // Para não sobrepor falas
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }
}
