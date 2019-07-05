import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdtaskComponent } from './updtask/updtask.component';

import { AddtaskService } from './addtask/addtask.service';
import { ViewtaskService } from './viewtask/viewtask.service';
import { UpdtaskService } from './updtask/updtask.service';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    UpdtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AddtaskService,
    ViewtaskService,
    UpdtaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
