import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  perfilForm: FormGroup;
  emailForm: FormGroup;
  senhaForm: FormGroup;
  selectedFileName: string | null = null;
  abaAtiva: string = 'perfil'; // Aba padrão

  constructor(private fb: FormBuilder) {
    // Formulário para dados de perfil
    this.perfilForm = this.fb.group({
      username: ['', [Validators.required]]
    });

    // Formulário para email
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulário para senha
    this.senhaForm = this.fb.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Aqui você pode carregar os dados do usuário de um serviço
    // Por exemplo:
    // this.perfilForm.patchValue({ username: 'Nome do Usuário' });
    // this.emailForm.patchValue({ email: 'usuario@email.com' });
  }

  trocarAba(aba: string): void {
    this.abaAtiva = aba;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.type;
      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.selectedFileName = file.name;
      } else {
        this.selectedFileName = null;
      }
    }
  }

  salvarPerfil(): void {
    if (this.perfilForm.valid) {
      console.log('Perfil atualizado:', this.perfilForm.value);
      // Aqui você implementaria a lógica para salvar o nome do usuário
    } else {
      this.markFormGroupTouched(this.perfilForm);
    }
  }

  salvarEmail(): void {
    if (this.emailForm.valid) {
      console.log('Email atualizado:', this.emailForm.value);
      // Aqui você implementaria a lógica para salvar o email
    } else {
      this.markFormGroupTouched(this.emailForm);
    }
  }

  salvarSenha(): void {
    if (this.senhaForm.valid) {
      console.log('Senha atualizada:', this.senhaForm.value);
      // Aqui você implementaria a lógica para salvar a senha
    } else {
      this.markFormGroupTouched(this.senhaForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(formGroup: FormGroup, controlName: string): string {
    const control = formGroup.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo é obrigatório';
      }
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['minlength']) {
        return 'A senha deve ter no mínimo 6 caracteres';
      }
    }
    if (formGroup === this.senhaForm && 
        formGroup.errors?.['passwordMismatch'] &&
        controlName === 'confirmarSenha' &&
        !control?.errors?.['required']) {
      return 'As senhas não coincidem';
    }
    return '';
  }

  // Função para leitura do título
  lerTitulo(): void {
    const titulo = 'Perfil do Usuário';
    const speech = new SpeechSynthesisUtterance(titulo);
    speech.lang = 'pt-BR';
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }

  // Função para falar mensagem ao passar mouse ou focar
  falar(mensagem: string): void {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // interrompe fala anterior para não sobrepor
    }
    const speech = new SpeechSynthesisUtterance(mensagem);
    speech.lang = 'pt-BR';
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }
}