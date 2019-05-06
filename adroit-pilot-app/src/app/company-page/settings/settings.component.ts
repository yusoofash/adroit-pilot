import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService, ImageService } from '../../services';
import { Company } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  company_details: Company;
  companyForm: FormGroup;
  imageFile = null;
  showZoom = false;

  constructor(private loaderService: LoaderService,
    private imageService: ImageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService) {
  }

  fetchCompanyDetails(updatemsg?) {
    this.userService.getDetails().
      subscribe(res => {
        console.log(res);
        this.loaderService.stopLoader();
        this.company_details = new Company(res);
        this.patchValue();
        if (updatemsg) {
          updatemsg();
        }
      });
  }

  ngOnInit() {
    this.companyForm = this.fb.group({
      keywords: ['', Validators.required],
      description: ['', Validators.required],
      company_location: ['', Validators.required],
      company_salary: ['', Validators.required],
      company_experience: ['', Validators.required],
      company_thumbnail: ['']
    });
    this.loaderService.startLoader();
    this.fetchCompanyDetails();
  }

  patchValue() {
    const { keywords, description, company_location, company_thumbnail, company_salary, company_experience } =
    JSON.parse(JSON.stringify(this.company_details));
    this.companyForm.patchValue({ keywords, description, company_location, company_thumbnail, company_salary, company_experience });
  }

  get f() { return this.companyForm.controls; }

  outputkeywords(words) {
    this.f.keywords.setValue(words);
    this.f.keywords.markAsDirty();
    this.f.keywords.markAsTouched();
  }

  submit() {
    const uploadUpdatedDetails = (imageURL?) => {
      const { company_location, description, keywords, company_thumbnail, ...rest } = this.company_details;
      if (imageURL) {
        this.f.company_thumbnail.setValue(imageURL);
      }
      const updateDetails = this.companyForm.value;
      Object.assign(updateDetails, rest);
      this.userService.updateDetails(updateDetails)
        .subscribe(res => {
          const updateMessage = () => this.toastr.success('Updated Successfully!', 'Success');
          this.fetchCompanyDetails(updateMessage.bind(this));
        });
    };

    this.loaderService.startLoader();
    if (this.imageFile) {
      this.imageService.uploadImage(this.imageFile)
        .subscribe(res => {
          if (res['secure_url']) {
            uploadUpdatedDetails(res['secure_url']);
          } else {
            this.loaderService.startLoader();
            this.toastr.error('Error uploading image', 'Error');
          }
        });
    } else {
      uploadUpdatedDetails();
    }
  }

  reset() {
    this.companyForm.markAsPristine();
    this.companyForm.reset();
    this.imageFile = null;
    this.patchValue();
  }

  uploadImage(e) {
    const file = this.imageFile = e.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = (a: any) => {
        this.f.company_thumbnail.setValue(a.target.result);
        this.f.keywords.markAsDirty();
        this.f.keywords.markAsTouched();
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('Invalid file type', 'Error');
    }

  }

}
