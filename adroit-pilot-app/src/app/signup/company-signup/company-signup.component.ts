import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { FormBuilder } from '@angular/forms';
import { SignupService } from '../signup.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../../common/popup/popup.component';

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.css']
})
export class CompanySignupComponent implements OnInit {

  companyDetails: Company = {
    company_name: '',
    HR: '',
    company_location: '',
    email: '',
    contact_no: null,
    keywords: '',
    description: '',
    password: ''
  };
  confirm_password: string;
  response: string;
  companyForm: FormBuilder;

  constructor(private signupService: SignupService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  submit(companyform) {
    this.signupService.registerCompany(this.companyDetails)
      .subscribe(res => {
        this.response = res.toString();
        if (this.response === 'success') {
          this.dialog.open(PopupComponent, {
            data: { message: 'Registered Successfully' }
          });
          companyform.resetForm();
        }
      });
  }



}

