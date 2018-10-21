import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';

import { TourService } from '../../tours/tour.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,

    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  deleteTour(id, tourImg) {
    this.tourService.delete(id, tourImg);
    this.dialogRef.close();
    this.router.navigate(["/tours"]);
  }

}
