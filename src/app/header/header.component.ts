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
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1;

      window.speechSynthesis.speak(utterance);
    }
  }

  onMouseEnter(text: string) {
    this.speak(text);
  }

  onClickLink(text: string) {
    this.speak(text);
    // Navegação pelo routerLink segue normalmente
  }
}
