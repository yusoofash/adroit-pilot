import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService, LoaderService, AuthenticationService } from '../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css', '../signup.css']
})
export class UserSignupComponent implements OnInit {

  response;
  userForm: FormGroup;
  constructor(private signupService: SignupService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private loaderService: LoaderService) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      pwd: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      }, { validator: this.passwordMatch }),
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  get f() { return this.userForm.controls; }

  passwordMatch(c: FormGroup) {
    return c.get('password').value === c.get('confirmPassword').value ? null : { mismatch: true };
  }

  signup() {
    this.response = null;
    const { pwd, ...user } = this.userForm.value;
    const password = this.userForm.controls.pwd.get('password').value;
    Object.assign(user, { password: password });

    this.loaderService.startLoader();
    this.signupService.registerStudent(user)
      .subscribe(res => {
        this.loaderService.stopLoader();
        this.response = res;
        if (res['access_token']) {
          this.authService.setLocalStorage(res);
          this.router.navigate(['/user-home']);
        }
      });
  }

}
