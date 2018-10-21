import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

import { AuthService } from '../../core/auth.service';
import { TourService } from '../tour.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Rqs } from 'src/app/tours/rqs';
import { tourRequest } from '../tourRequest';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.scss']
})
export class TourDashboardComponent implements OnInit {

  country: string;
  city: string;
  dateFrom: Date;
  infoShort: string;
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
  ) { }

  ngOnInit() {
    this.tourRequests = this.afs.collection('tourRequests');
    this.tourRqs = this.tourRequests.valueChanges();
  }

  createTour() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      country: this.country,
      city: this.city,
      dateFrom: this.dateFrom,
      infoShort: this.infoShort,
      image: this.image,
      imageName: this.imageName,
      published: new Date()
    };

    this.tourService.create(data);

    this.country = '';
    this.city = '';
    this.infoShort = '';
    this.image = '';
    this.dateFrom = null;
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
