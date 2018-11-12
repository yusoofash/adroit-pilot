import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-templete',
  templateUrl: './login-templete.component.html',
  styleUrls: ['./login-templete.component.css']
})

export class LoginTempleteComponent implements OnInit {

  responseMsg: string;

  @Input()
  set response(value: string) {
    this.responseMsg = value;
  }

  get response() {
    return this.responseMsg;
  }

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required
      ]
    ],
    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  @Input() title;
  @Output() loginDetails = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  sigin() {
    this.responseMsg = null;
    this.loginDetails.emit(this.loginForm.value);
  }

}
