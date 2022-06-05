import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// material ui
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  ValidationErrorsExistPipe,
  GetValidationErrorsPipe,
  GetFormArrayPipe,
  EnumToArrayPipe,
} from './pipes/form.pipes';
import { HandleInputComponent } from './components/inputs/handle-input/handle-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
// import { InfoModal, GetBootstrapColorPipe } from './modals/info/info.modal';

@NgModule({
  declarations: [
    // modals
    // InfoModal,
    // pipes
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    // GetBootstrapColorPipe,
    EnumToArrayPipe,
    // inputs
    HandleInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule /*NgbModule*/,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    // modules
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // material ui,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    // modals
    // InfoModal,
    // pipes
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    // GetBootstrapColorPipe,
    EnumToArrayPipe,
    // inputs
    HandleInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
})
export class SharedModule {}
