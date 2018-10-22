import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.models';

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
  constructor() { }

  ngOnInit() {
  }

}
