import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { NavDrawerComponent } from './components/nav-drawer/nav-drawer.component';

// common
import {
  ValidationErrorsExistPipe,
  GetValidationErrorsPipe,
} from '../common/pipes/validation-error.pipes';

// auth
import { RegisterComponent } from '../auth/pages/register/register.component';
import { LoginComponent } from '../auth/pages/login/login.component';

// user
import { UserDetailComponent } from '../user/pages/user-detail/user-detail.component';
import { UserFormComponent } from '../user/pages/user-form/user-form.component';

// person
import { PersonFormComponent } from '../person/pages/person-form/person-form.component';
import { PersonDetailComponent } from '../person/pages/person-detail/person-detail.component';
import { PersonListComponent } from '../person/pages/person-list/person-list.component';

@NgModule({
  declarations: [
    // app
    AppComponent,
    ToolbarComponent,
    BackdropComponent,
    NavDrawerComponent,

    // common
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,

    // auth
    RegisterComponent,
    LoginComponent,

    // user
    UserDetailComponent,
    UserFormComponent,

    // person
    PersonFormComponent,
    PersonDetailComponent,
    PersonListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
