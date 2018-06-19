import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  exports: [CommonModule, FooterComponent, FormsModule, MaterialModule, NavbarComponent, RouterModule],
  declarations: [NavbarComponent, AlertDialogComponent, FooterComponent]
})
export class SharedModule { }
