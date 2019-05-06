import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  user_details = null;
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
}
