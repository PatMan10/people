import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// material ui
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import {
  ValidationErrorsExistPipe,
  GetValidationErrorsPipe,
  GetFormArrayPipe,
  EnumToArrayPipe,
} from './pipes/form.pipes';
import { HandleInputComponent } from './components/inputs/handle-input/handle-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';

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
    InfoDialogComponent,
  ],
  imports: [
    // modules
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material ui,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
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
    MatDialogModule,
    MatTableModule,
    // pipes
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    EnumToArrayPipe,
    // inputs
    HandleInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
  ],
})
export class SharedModule {}
