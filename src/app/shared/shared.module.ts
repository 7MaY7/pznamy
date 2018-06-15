import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  exports: [CommonModule, FormsModule, MaterialModule, NavbarComponent, RouterModule],
  declarations: [NavbarComponent]
})
export class SharedModule { }
