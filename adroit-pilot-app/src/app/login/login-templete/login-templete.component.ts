import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-templete',
  templateUrl: './login-templete.component.html',
  styleUrls: ['./login-templete.component.css']
})

export class LoginTempleteComponent implements OnInit {

  @Input() response;

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
    this.loginDetails.emit(this.loginForm.value);
  }

}
