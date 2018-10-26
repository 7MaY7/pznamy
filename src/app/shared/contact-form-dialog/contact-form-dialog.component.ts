import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { TourService } from '../../tours/tour.service';

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contact-form-dialog.component.html',
  styleUrls: ['./contact-form-dialog.component.scss']
})
export class ContactFormDialogComponent implements OnInit {

  contactForm: FormGroup;
  sended: boolean = false;

  //animations
  fadedIn: boolean = false;
  aiplaneOut: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ContactFormDialogComponent>,
    private tourService: TourService,
    private fb: FormBuilder
    ) {
    this.contactForm = fb.group({
      'name' : ['', Validators.required],
      'phone' : ['', Validators.required],
      'email' : ['', Validators.compose([Validators.required, Validators.email])],
      'comment' : ['']
    });
  }

  ngOnInit() {
  }

  sendRequest() {
    const data = this.contactForm.value;
    data.requested = new Date();

    this.tourService.addRequest(data);
    this.sended = true;
    this.succcessAnimation();

    setTimeout(() => { this.dialogRef.close() }, 5000);
  }

  succcessAnimation() {
    if (this.sended) {
      setTimeout(() => { this.fadedIn = true; }, 1000);
      setTimeout(() => { this.aiplaneOut = true; }, 1600);
    }
  }
}
