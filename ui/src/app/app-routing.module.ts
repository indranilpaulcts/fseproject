import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdtaskComponent } from './updtask/updtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'addtask'
  },
  {
    path: 'addtask',
    component: AddtaskComponent
  },
  {
    path: 'updtask/:id',
    component: UpdtaskComponent
  },
  {
    path: 'viewtask',
    component: ViewtaskComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
