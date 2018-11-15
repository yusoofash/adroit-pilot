import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';
import { Company } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  company_details: Company;
  companyForm: FormGroup;

  constructor(private loaderService: LoaderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService) {
    this.loaderService.startLoader();
    this.fetchCompanyDetails();
  }

  fetchCompanyDetails() {
    this.userService.getDetails().
      subscribe(res => {
        console.log(res);
        this.loaderService.stopLoader();
        this.company_details = res;
        this.patchValue();
      });
  }

  ngOnInit() {
    this.companyForm = this.fb.group({
      keywords: ['', Validators.required],
      description: ['', Validators.required],
      company_location: ['', Validators.required]
    });
  }

  patchValue() {
    const {keywords, description, company_location} = JSON.parse(JSON.stringify(this.company_details));
    this.companyForm.patchValue({keywords, description, company_location});
  }

  get f() { return this.companyForm.controls; }

  outputkeywords(words) {
    this.f.keywords.setValue(words);
    this.f.keywords.markAsDirty();
    this.f.keywords.markAsTouched();
  }

  submit() {
    const {company_location, description, keywords, ...rest} = this.company_details;
    const updateDetails = this.companyForm.value;
    Object.assign(updateDetails, rest);
    this.loaderService.startLoader();
    this.userService.updateDetails(updateDetails)
    .subscribe(res => {
      this.toastr.success('Updated Successfully!', 'Success');
      this.loaderService.stopLoader();
    });
  }

  reset() {
    this.companyForm.markAsPristine();
    this.companyForm.reset();
    this.patchValue();
  }

}
