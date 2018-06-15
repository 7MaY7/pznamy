import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TourService } from '../tour.service';
import { Tour } from '../tour';
import { AuthService } from '../../core/auth.service';

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
    private tourService: TourService
  ) { }

  ngOnInit() {
    this.getTour();
    console.log(this);
  }

  getTour() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.tourService.getPostData(id).subscribe(data => this.tour = data);
  }

  updateTour() {
    const formData = {
      country: this.tour.country,
      infoShort: this.tour. infoShort
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.update(id, formData);
    this.editing = false;
  }

  deleteTour() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.delete(id);
    this.router.navigate(["/tours"]);
  }

}
