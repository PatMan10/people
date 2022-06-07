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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import {
  ValidationErrorsExistPipe,
  GetValidationErrorsPipe,
  GetFormArrayPipe,
  EnumToArrayPipe,
} from './pipes/form.pipes';
import { HandleInputComponent } from './components/inputs/handle-input/handle-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
// import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';

@NgModule({
  declarations: [
    // dialogs
    InfoDialogComponent,
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
    // TextInputComponent,
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  exports: [
    // angular modules
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    // material ui modules
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    // pipes
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    EnumToArrayPipe,
    // inputs
    HandleInputComponent,
    EmailInputComponent,
    PasswordInputComponent,
    // TextInputComponent,
  ],
})
export class SharedModule {}
