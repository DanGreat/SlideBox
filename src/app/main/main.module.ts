import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PopoverComponent } from '../../components/popover/popover.component';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  entryComponents: [PopoverComponent],
  declarations: [MainPage, PopoverComponent]
})
export class MainPageModule {}
