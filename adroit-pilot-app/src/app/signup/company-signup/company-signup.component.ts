import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignupService, LoaderService } from '../../services';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.css', '../signup.css']
})
export class CompanySignupComponent implements OnInit {


  response;
  companyForm: FormGroup;
  constructor(private signupService: SignupService,
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
      keywords: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  get f() { return this.companyForm.controls; }

  passwordMatch(c: FormGroup) {
    return c.get('password').value === c.get('confirmPassword').value ? null : { mismatch: true };
  }

  signup() {
    this.response = null;
    const {pwd, keywords, ...company} = this.companyForm.value;
    const password = this.companyForm.controls.pwd.get('password').value;
    const keywords_arr = keywords.split(',');
    Object.assign(company, { password: password, keywords: keywords_arr });

    this.loaderService.startLoader();
    this.signupService.registerCompany(company)
    .subscribe(res => {
      this.loaderService.stopLoader();
      this.response = res;
    });
  }

}

