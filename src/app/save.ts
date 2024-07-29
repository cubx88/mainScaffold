import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Validation from './utils/validation';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetService } from './services/auth_service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    @ViewChild('pw') pwInput!: ElementRef;
    form: FormGroup = new FormGroup({
        //fullname: new FormControl(''),
        //username: new FormControl(''),
        //email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        //acceptTerms: new FormControl(false),
    });
    submitted = false;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    token: any;

    constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private authService: PasswordResetService) {

    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap.subscribe((queriedParams) => {
            console.log(queriedParams);
            this.token = queriedParams;
        })

        this.form = this.formBuilder.group(
            {
                // fullname: ['', Validators.required],
                // username: [
                //   '',
                //   [
                //     Validators.required,
                //     Validators.minLength(6),
                //     Validators.maxLength(20)
                //   ]
                // ],
                // email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
                confirmPassword: ['', Validators.required],
                //acceptTerms: [false, Validators.requiredTrue]
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
        this.authService.completeResetPassword(passwordValue, tkn, tokenId).subscribe(res => {
        }, error => {
            console.log(error.error);
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form.invalid) {
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
