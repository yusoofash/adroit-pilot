import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.models';
import { SignupService } from '../signup.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../../common/popup/popup.component';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  userDetails: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };
  confirm_password: string;
  response: string;

  constructor(private signupService: SignupService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  submit(userform) {
    this.signupService.registerStudent(this.userDetails)
    .subscribe(res => {
      this.response = res.toString();
      if (this.response === 'success') {
        this.dialog.open(PopupComponent, {
          data: { message: 'Registered Successfully' }
        });
        userform.resetForm();
      }
    });
  }

}
