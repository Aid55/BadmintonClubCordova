import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditScorePage } from './editscore.page';

const routes: Routes = [
  {
    path: '',
    component: EditScorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditScorePageRoutingModule {}
