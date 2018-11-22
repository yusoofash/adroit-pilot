import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class UserHomeComponent implements OnInit {

  user_details = null;
  selected_resume = null;
  new_resume = null;
  companies = null;
  resume_index = null;
  upload_new = false;

  constructor(private userDetails: UserService,
    private loaderService: LoaderService,
    private userService: UserService) {
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
        this.userService.uploadResume(this.new_resume).subscribe(res => {
          this.loaderService.stopLoader();
          this.companies = res;
          this.getUserDetails();
        });
      } else if (this.selected_resume) {
        this.userService.getPredictions(this.selected_resume).subscribe(res => {
          this.loaderService.stopLoader();
          this.companies = res;
        });
      }
    }
  }

}
