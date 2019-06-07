import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatsPage } from './chats.page';


const routes: Routes = [
  {
    path: 'chats',
    component: ChatsPage,
    children: [
      { path: 'friends', loadChildren: '../friends/friends.module#FriendsPageModule' },
      { path: 'status', loadChildren: '../status/status.module#StatusPageModule' },
      { path: 'calls', loadChildren: '../calls/calls.module#CallsPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: 'chats/friends',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
