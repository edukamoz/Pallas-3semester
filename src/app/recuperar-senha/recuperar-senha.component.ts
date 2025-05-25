import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  recuperarForm: FormGroup;
  submitted = false;
  emailEnviado = '';
  tempoRestante = 300; // 5 minutos em segundos
  timer: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recuperarForm.valid) {
      this.emailEnviado = this.recuperarForm.value.email;
      this.submitted = true;
      this.iniciarContador();
    } else {
      this.markFormGroupTouched(this.recuperarForm);
    }
  }

  iniciarContador(): void {
    this.tempoRestante = 300;
    this.timer = setInterval(() => {
      if (this.tempoRestante > 0) {
        this.tempoRestante--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  get minutos(): number {
    return Math.floor(this.tempoRestante / 60);
  }

  get segundos(): string {
    return String(this.tempoRestante % 60).padStart(2, '0');
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getErrorMessage(): string {
    const control = this.recuperarForm.get('email');
    if (control?.errors && control.touched) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['email']) return 'Email inválido';
      if (control.errors['maxlength']) return 'Máximo de 100 caracteres';
    }
    return '';
  }

  // Função para ler um texto em voz alta usando SpeechSynthesis API
  lerTexto(texto: string): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // cancela fala anterior
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'pt-BR';
      window.speechSynthesis.speak(fala);
    }
  }

  // Falar o título da página
  falarTitulo(): void {
    this.lerTexto('Recuperar Senha');
  }

  // Navegar para a página de login
  voltarLogin(): void {
    this.router.navigate(['/login']);
  }
}
