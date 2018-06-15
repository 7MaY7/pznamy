import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../tour';
import { TourService } from '../tour.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  tours: Observable<Tour[]>

  constructor(private tourService: TourService,
              private auth: AuthService
            ) { }

  ngOnInit() {
    this.tours = this.tourService.getTours();
  }

}
