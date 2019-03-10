import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth-service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const formObj = this.signUpForm.value;
    this.authService.signUp(formObj.email, formObj.password).then(value => {
      console.log(value);
      this.signUpForm.reset();
      this.router.navigate(['dashboard']);
    }).catch(reason => {
      console.log(reason);
    });
  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
