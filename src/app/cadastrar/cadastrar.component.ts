import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit {
  cadastroForm: FormGroup;
  selectedFileName: string | null = null;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },);
  }

  ngOnInit(): void { }

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

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Form submitted:', this.cadastroForm.value);
    } else {
      this.markFormGroupTouched(this.cadastroForm);
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

  getErrorMessage(controlName: string): string {
    const control = this.cadastroForm.get(controlName);
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
    if (this.cadastroForm.errors?.['passwordMismatch'] &&
      controlName === 'confirmPassword' &&
      !control?.errors?.['required']) {
      return 'As senhas não coincidem';
    }
    return '';
  }
}

