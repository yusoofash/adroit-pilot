import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-templete',
  templateUrl: './login-templete.component.html',
  styleUrls: ['./login-templete.component.css']
})

export class LoginTempleteComponent implements OnInit {

  @Input() entity;
  @Output() login_details = new EventEmitter();

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ],
    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  login(details) {
    this.login_details.emit(details);
  }

}
