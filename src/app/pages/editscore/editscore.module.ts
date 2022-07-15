import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditScorePageRoutingModule } from './editscore-routing.module';

import { EditScorePage } from './editscore.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditScorePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EditScorePage]
})
export class EditScorePageModule {}
