import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string = "";

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      login: ['', [
        Validators.required
      ]
    ],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    });
  }

  isControlInvalid(controlName: string, form: FormGroup): boolean {
    const control = form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe( (response: any) =>{
      if(response.jwt){
        this.authService.setJWT(response.jwt);
        console.log(this.authService.getJWT());

        this.loginErrorMessage = "";
      } else {
        this.loginErrorMessage = response;
      }

    });
  }


}
