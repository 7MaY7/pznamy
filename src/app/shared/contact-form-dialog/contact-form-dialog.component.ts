import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contact-form-dialog.component.html',
  styleUrls: ['./contact-form-dialog.component.scss']
})
export class ContactFormDialogComponent implements OnInit {

  contactForm: FormGroup;
  post:any;                     // A property for our submitted form
  
  name:string = '';
  phone:string = '';
  email:string = '';
  comment:string = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = fb.group({
      'name' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'comment' : [null],
      'validate' : ''
    });
  }

  ngOnInit() {
  }

  sendRequest() {
    console.warn(this.contactForm.value);
  }

}
