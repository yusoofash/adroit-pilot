import { Component, OnInit } from '@angular/core';
import { UserService, LoaderService, AuthenticationService } from '../../services';
import { User } from '../../models';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user_details: User = null;
  account_details = null;

  constructor(private userDetails: UserService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loaderService.startLoader();
    this.userDetails.getDetails().subscribe(res => {
      this.loaderService.stopLoader();
      this.user_details = new User(res);
      console.log(this.user_details);
      this.account_details = this.fb.group({
        firstName: [this.user_details.first_name, Validators.required],
        lastName: [this.user_details.last_name, Validators.required],
        password: ['', [Validators.minLength(6), Validators.required]]
      });
    });
  }

  save() {
    // console.log(this.account_details.value);
    this.loaderService.startLoader();
    this.userService.updateAccount(this.account_details.value).subscribe(res => {
      this.loaderService.stopLoader();
      this.authService.removeLocalStorage();
      this.authService.setLocalStorage(res);
      this.toastr.success('Account Updated Successfully!', 'Success');
    });
  }


}
