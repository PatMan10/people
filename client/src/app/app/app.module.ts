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
import { InfoModal } from '../common/modal/info/info.modal';

// auth
import { RegisterPage } from '../auth/pages/register/register.page';
import { LoginPage } from '../auth/pages/login/login.page';

// user
import { UserDetailPage } from '../user/pages/user-detail/user-detail.page';
import { UserFormPage } from '../user/pages/user-form/user-form.page';

// person
import { PersonFormPage } from '../person/pages/person-form/person-form.page';
import { PersonDetailPage } from '../person/pages/person-detail/person-detail.page';
import { PersonListPage } from '../person/pages/person-list/person-list.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    InfoModal,

    // auth
    RegisterPage,
    LoginPage,

    // user
    UserDetailPage,
    UserFormPage,

    // person
    PersonFormPage,
    PersonDetailPage,
    PersonListPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
