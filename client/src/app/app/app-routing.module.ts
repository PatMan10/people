import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '../auth/pages/register/register.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { UserDetailComponent } from '../user/pages/user-detail/user-detail.component';
import { UserFormComponent } from '../user/pages/user-form/user-form.component';
import { PersonDetailComponent } from '../person/pages/person-detail/person-detail.component';
import { PersonFormComponent } from '../person/pages/person-form/person-form.component';
import { PersonListComponent } from '../person/pages/person-list/person-list.component';
import { UiUrls } from '../common/utils/urls';

const routes: Routes = [
  // index
  { path: '', redirectTo: UiUrls.person.VIEW_ALL, pathMatch: 'full' },

  // auth
  { path: UiUrls.auth.REGISTER, component: RegisterComponent },
  { path: UiUrls.auth.LOGIN, component: LoginComponent },

  // users
  { path: UiUrls.user.GET_BY_ID, component: UserDetailComponent },
  { path: UiUrls.user.UPDATE, component: UserFormComponent },

  // person
  { path: UiUrls.person.VIEW_ALL, component: PersonListComponent },
  { path: UiUrls.person.VIEW_BY_ID, component: PersonDetailComponent },
  { path: UiUrls.person.ADD, component: PersonFormComponent },
  { path: UiUrls.person.EDIT, component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
