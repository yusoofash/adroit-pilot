import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';

@Component({
  selector: 'app-company-predict',
  templateUrl: './company-predict.component.html',
  styleUrls: ['./company-predict.component.css']
})
export class CompanyPredictComponent implements OnInit {

  user_details = null;
  selected_resume = null;
  new_resume = null;
  companies = null;
  resume_index = null;
  upload_new = false;

  constructor(private userDetails: UserService,
    private loaderService: LoaderService) {
    this.getUserDetails();
  }

  ngOnInit() {
  }

  getUserDetails() {
    this.loaderService.startLoader();
    this.userDetails.getDetails().subscribe(res => {
      this.loaderService.stopLoader();
      this.user_details = res;
    });
  }

  onChange(e) {
    this.selected_resume = null;
    this.new_resume = e.target.files[0];
  }

  predict() {
    if (this.new_resume || this.selected_resume) {
      this.loaderService.startLoader();
      if (this.new_resume) {
        this.userDetails.uploadResume(this.new_resume).subscribe(res => {
          this.loaderService.stopLoader();
          this.companies = res;
          this.getUserDetails();
        });
      } else if (this.selected_resume) {
        this.userDetails.getPredictions(this.selected_resume).subscribe(res => {
          this.loaderService.stopLoader();
          this.companies = res;
        });
      }
    }
  }


}
