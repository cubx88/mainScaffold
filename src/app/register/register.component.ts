import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetService } from '../services/auth_service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  token: any;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private authService: PasswordResetService) {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queriedParams) => {
      this.token = queriedParams;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
