import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

import { AuthService } from '../../core/auth.service';
import { TourService } from '../tour.service';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tour-dashboard',
  templateUrl: './tour-dashboard.component.html',
  styleUrls: ['./tour-dashboard.component.scss']
})
export class TourDashboardComponent implements OnInit {

  country: string;
  infoShort: string;
  image: string = null;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private auth: AuthService,
    private tourService: TourService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  createTour() {
    const data = {
      country: this.country,
      infoShort: this.infoShort,
      image: this.image,
      published: new Date()
    };

    this.tourService.create(data);
    this.country = '';
    this.infoShort = '';
    this.image = '';
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `tours/${file.name}`;
    const fileRef = this.storage.ref(path);

    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files can be added');
    } else {
      const task = this.storage.upload(path, file);

      this.downloadURL = fileRef.getDownloadURL();
      this.uploadPercent = task.percentageChanges();

      console.log('Image Uploaded!');

      this.downloadURL.subscribe(url => (this.image = url));
    }
  }
}
