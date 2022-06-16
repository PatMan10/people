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
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';

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
import { InfoDialog } from './dialogs/info/info.dialog';
import { ConfirmDialog } from './dialogs/confirm/confirm.dialog';

@NgModule({
  declarations: [
    // dialogs
    InfoDialog,
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
    ConfirmDialog,
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
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
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
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
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
