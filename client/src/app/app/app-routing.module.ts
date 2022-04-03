import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPage } from '../auth/pages/register/register.page';
import { LoginPage } from '../auth/pages/login/login.page';
import { UserDetailPage } from '../user/pages/user-detail/user-detail.page';
import { UserFormPage } from '../user/pages/user-form/user-form.page';
import { PersonDetailPage } from '../person/pages/person-detail/person-detail.page';
import { PersonFormPage } from '../person/pages/person-form/person-form.page';
import { PersonListPage } from '../person/pages/person-list/person-list.page';
import { UiUrls } from '../common/utils/urls';

const routes: Routes = [
  // index
  { path: '', redirectTo: UiUrls.person.VIEW_ALL, pathMatch: 'full' },

  // auth
  { path: UiUrls.auth.REGISTER, component: RegisterPage },
  { path: UiUrls.auth.LOGIN, component: LoginPage },

  // users
  { path: UiUrls.user.GET_BY_ID, component: UserDetailPage },
  { path: UiUrls.user.UPDATE, component: UserFormPage },

  // person
  { path: UiUrls.person.VIEW_ALL, component: PersonListPage },
  { path: UiUrls.person.VIEW_BY_ID, component: PersonDetailPage },
  { path: UiUrls.person.ADD, component: PersonFormPage },
  { path: UiUrls.person.EDIT, component: PersonFormPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
