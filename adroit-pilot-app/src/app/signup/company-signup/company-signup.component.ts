import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { SignupService, AuthenticationService, LoaderService } from '../../services';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.css', '../signup.css']
})
export class CompanySignupComponent implements OnInit {


  response;
  companyForm: FormGroup;
  constructor(private signupService: SignupService,
    private authService: AuthenticationService,
    private router: Router,
    private loaderService: LoaderService,
    private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      company_name: ['', Validators.required],
      hr: ['', Validators.required],
      pwd: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      }, { validator: this.passwordMatch }),
      email: ['', [Validators.required, Validators.email]],
      company_location: ['', Validators.required],
      keywords: [[], Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get f() { return this.companyForm.controls; }

  passwordMatch(c: FormGroup): ValidationErrors | null {
    return c.get('password').value === c.get('confirmPassword').value ? null : { mismatch: true };
  }

  outputKeywords(keywords) {
    this.f.keywords.setValue(keywords);
  }

  signup() {
    this.response = null;
    const {pwd, ...company} = this.companyForm.value;
    const password = this.companyForm.controls.pwd.get('password').value;
    Object.assign(company, { password: password });

    this.loaderService.startLoader();
    this.signupService.registerCompany(company)
    .subscribe(res => {
      this.loaderService.stopLoader();
      this.response = res;
      if (res['access_token']) {
        this.authService.setLocalStorage(res);
        this.router.navigate(['/company-home']);
      }
    });
  }

}

