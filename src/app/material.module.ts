import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { ContactFormDialogComponent } from './shared/contact-form-dialog/contact-form-dialog.component';

import { MatNativeDateModule } from '@angular/material';


@NgModule({
  imports: [MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MDBBootstrapModule.forRoot()],

  exports: [MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MDBBootstrapModule],

  schemas: [NO_ERRORS_SCHEMA],

  entryComponents: [AlertDialogComponent, ContactFormDialogComponent]
})
export class MaterialModule { }
