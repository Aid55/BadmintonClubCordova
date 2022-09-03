import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditMatchPageRoutingModule } from './editmatch-routing.module';

import { EditMatchPage } from './editmatch.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMatchPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EditMatchPage]
})
export class EditMatchPageModule {}
