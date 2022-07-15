import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditPlayerPageRoutingModule } from './editplayer-routing.module';

import { EditPlayerPage } from './editplayer.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlayerPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EditPlayerPage]
})
export class EditPlayerPageModule {}
