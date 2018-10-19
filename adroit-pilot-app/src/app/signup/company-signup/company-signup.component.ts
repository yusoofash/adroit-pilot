import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
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
  constructor() { }

  ngOnInit() {
  }
  password_check(e: any) {
    const user_password = e.target.value;
    if (user_password.length < 8) {
      this.response = 'Password lesser than 8 characters';
    } else {
      this.response = '';
    }


  }





}

