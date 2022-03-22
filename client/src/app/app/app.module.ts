import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from '../common/components/toolbar/toolbar.component';
import { BackdropComponent } from '../common/components/backdrop/backdrop.component';
import { NavDrawerComponent } from '../common/components/nav-drawer/nav-drawer.component';
import { PersonFormComponent } from '../person/pages/person-form/person-form.component';
import { PersonDetailComponent } from '../person/pages/person-detail/person-detail.component';
import { PersonListComponent } from '../person/pages/person-list/person-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BackdropComponent,
    NavDrawerComponent,
    PersonFormComponent,
    PersonDetailComponent,
    PersonListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
