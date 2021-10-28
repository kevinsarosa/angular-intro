import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginToken } from './model/authInterface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(map((params:any)=>params.action)).subscribe((action)=>{
      if(action === 'logout'){
      sessionStorage.removeItem('token');
      this.route.navigateByUrl('/auth/login')}
      else if(sessionStorage.getItem('token')&& action === 'login'){
        this.route.navigateByUrl('/')
      }
    })
  }

  onSubmit(): void {
    console.log('login value:', this.authForm.value);

    if (this.authForm.valid) {
      this.authService
        .login(this.authForm.value)
        .subscribe((response: LoginToken) => {
          sessionStorage.setItem('token', response.token);
          console.log(response);
          this.route.navigateByUrl('/');
        }, console.error);
    }
  }

  isFieldValid(
    fieldName: string,
    parent?: AbstractControl
  ): { [key: string]: boolean } {
    let control: AbstractControl = this.authForm.get(
      fieldName
    ) as AbstractControl;

    const classes = {
      'is-invalid': false,
      'is-valid': false,
    };
    if (parent) {
      control = parent;
    }

    if (control && control.touched && control.invalid) {
      classes['is-invalid'] = true;
    } else if (control && control.valid) {
      classes['is-valid'] = true;
    }

    return classes;
  }

  displayError(fieldName: string): string {
    const control: AbstractControl = this.authForm.get(
      fieldName
    ) as AbstractControl;
    const messages: any = {
      required: 'Field harus di isi',
      minlength: 'Field minimal harus lebih panjang dari {minlength}',
    };

    if (control && control.errors) {
      const error = Object.values(control.errors).pop();
      const key: string = Object.keys(control.errors).pop() as string;
      let message = messages[key];

      console.log(message);

      if (key === 'minlength') {
        console.log(error);
        message = message.replace('{minlength}', error.requiredLength);
      }
      return message;
    } else {
      return '';
    }
  }

  getControl(name: string): AbstractControl {
    return this.authForm.get(name) as AbstractControl;
  }
}
