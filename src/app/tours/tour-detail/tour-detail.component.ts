import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TourService } from '../tour.service';
import { Tour } from '../tour';
import { AuthService } from '../../core/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { AngularFirestore } from 'angularfire2/firestore';

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

  deleteTour() {
    const tourImg = this.tour.imageName;
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.delete(id, tourImg);
    this.router.navigate(["/tours"]);
  }

  // openAlertDialog() {
  //   let dialogRef = this.dialog.open(AlertDialogComponent, {
  //     width: '350px',
  //     data: {messege: 'Ви впевнені що хочете видалити цей тур?'}
  //   });
  // }
}
