
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetService } from '../services/auth_service';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router'; // This is significant to show the new pages
import { RouterModule } from '@angular/router'; // This is significant to show the new pages
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {
  @ViewChild('pw') pwInput!: ElementRef;
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  token: any;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private authService: PasswordResetService, private toast: ToastrService, private routeService: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((queriedParams) => {
      console.log(queriedParams);
      this.token = queriedParams;
    })

    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  extractTokenFromUrl(): void {
    const tkn = this.token.params.token;
    const tokenId = this.token.params.tokenId;
    const passwordValue = this.pwInput.nativeElement.value;
    this.authService.completeResetPassword(passwordValue, tkn, tokenId)
      .subscribe({
        next: (res: any) => {
          this.toast.success(res.message);
          console.log("password update success");
          this.onReset();
          this.routeService.navigate(['/passwordResetSuccess']);
        },
        error: (error) => {
          this.toast.error(error.error);
          console.error(error);
        }
      });
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log("validation error, check your input!");
      return;
    }
    this.extractTokenFromUrl();
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
