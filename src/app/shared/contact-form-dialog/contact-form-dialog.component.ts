import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../../tours/tour.service';

@Component({
  selector: 'app-contact-form-dialog',
  templateUrl: './contact-form-dialog.component.html',
  styleUrls: ['./contact-form-dialog.component.scss']
})
export class ContactFormDialogComponent implements OnInit {

  contactForm: FormGroup;
  sended: boolean = false;

  constructor(
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

    this.contactForm.reset();
  }
}
