import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  );

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    this.authService.login(formValue.email, formValue.password).then(value => {
      console.log(value);
      this.router.navigate(['dashboard']);
    }).catch(reason => {
      console.log(reason);
    });
  }

  onCancel() {
    this.router.navigate(['home']);
  }

}
