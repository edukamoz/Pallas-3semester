import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  emailRecuperacao: string = 'seuemail@exemplo.com';
  countdown: string = '5:00';
  timerVisible: boolean = false;

  startTimer() {
    this.timerVisible = true;
    let minutes = 4;
    let seconds = 59;

    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      this.countdown = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
  }

  clickMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('open');
    }
  }
}
