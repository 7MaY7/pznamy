import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { AuthService } from '../../core/auth.service';
import { TourService } from '../tour.service';
import { tourRequest } from '../tourRequest';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.scss']
})
export class TourDashboardComponent implements OnInit {

  addNewTourForm: FormGroup;

  image: string = null;
  imageName: string;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  tourRequests: AngularFirestoreCollection<tourRequest>;
  tourRqs: Observable<tourRequest[]>;

  constructor(
    private auth: AuthService,
    private tourService: TourService,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fb: FormBuilder
  ) {
    this.addNewTourForm = fb.group({
      'image' : [''],
      'country' : ['', Validators.required],
      'city' : ['', Validators.required],
      'dateFrom' : ['', Validators.required],
      'days' : ['', Validators.required],
      'foodType' : [''],
      'persons' : ['', Validators.required],
      'children' : [0],
      'price' : [''],
      'info' : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tourRequests = this.afs.collection('tourRequests');
    this.tourRqs = this.tourRequests.valueChanges();
  }

  createTour() {
    console.log(this.addNewTourForm.value);
    const data = this.addNewTourForm.value;
    data.author = this.auth.authState.displayName || this.auth.authState.email;
    data.authorId = this.auth.currentUserId;
    data.published = new Date();
    data.image = this.image;
    data.imageName = this.imageName;

    this.tourService.create(data);

    this.addNewTourForm.reset();
    this.image ='';
    this.imageName ='';
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `tours/${file.name}`;
    const fileRef = this.storage.ref(path);

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files can be added');
    } else {
      const task = this.storage.upload(path, file);
      this.imageName = `${file.name}`;

      this.uploadPercent = task.percentageChanges();

      setTimeout(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => (this.image = url));
        console.log('Image Uploaded!');
      }, 6000);
    }
  }
}
