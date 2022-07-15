import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PlayersPage } from './players.page';

import { PlayersPageRoutingModule } from './players-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [PlayersPage]
})
export class PlayersPageModule {}
