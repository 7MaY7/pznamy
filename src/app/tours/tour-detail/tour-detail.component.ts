import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from 'angularfire2/firestore';

import { Tour } from '../tour';
import { TourService } from '../tour.service';
import { AuthService } from '../../core/auth.service';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  tour: Tour;

  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private tourService: TourService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTour();
  }

  getTour() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.tourService.getTourData(id).subscribe(data => this.tour = data);
  }

  updateTour() {
    const formData = {
      country: this.tour.country,
      city: this.tour.city,
      dateFrom: this.tour.dateFrom,
      infoShort: this.tour. infoShort
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.update(id, formData);
    this.editing = false;
  }

  openAlertDialog() {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: {messege: 'Ви впевнені що хочете видалити цей тур?',
             tourId: this.route.snapshot.paramMap.get('id'),
             tourImg: this.tour.imageName}
    });
  }
}
