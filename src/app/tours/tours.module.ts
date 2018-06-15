import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourDashboardComponent } from './tour-dashboard/tour-dashboard.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { TourService } from './tour.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'tours', component: TourListComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  { path: 'dashboard', component: TourDashboardComponent }
];

@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  declarations: [TourDashboardComponent, TourListComponent, TourDetailComponent],
  providers: [TourService]
})
export class ToursModule { }
