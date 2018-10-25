import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { PopupComponent } from '../../common/popup/popup.component';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
    keywords: [],
    description: '',
    password: ''
  };
  confirm_password: string;
  response: string;
  companyForm;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywordsFormControl: FormControl;
  keywords_pristine = true;

  constructor(private signupService: SignupService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addKeywordErrorState(a) {
    a.errorState = true;
    return 'Keywords is required';
  }

  removeKeywordErrorState(a) {
    a.errorState = false;
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.companyDetails.keywords.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(keyword, chipList): void {
    const index = this.companyDetails.keywords.indexOf(keyword);

    if (index >= 0) {
      this.companyDetails.keywords.splice(index, 1);
    }

    if (this.companyDetails.keywords.length === 0) {
      chipList.errorState = true;
      this.keywords_pristine = !this.keywords_pristine;
    }
  }

}

