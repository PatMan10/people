import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  ValidationErrorsExistPipe,
  GetValidationErrorsPipe,
  GetFormArrayPipe,
  EnumToArrayPipe,
} from './pipes/form.pipes';
import { InfoModal, GetBootstrapColorPipe } from './modals/info/info.modal';

@NgModule({
  declarations: [
    InfoModal,
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    GetBootstrapColorPipe,
    EnumToArrayPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgbModule],
  exports: [
    // modules
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    // modals
    InfoModal,
    // pipes
    ValidationErrorsExistPipe,
    GetValidationErrorsPipe,
    GetFormArrayPipe,
    GetBootstrapColorPipe,
    EnumToArrayPipe,
  ],
})
export class SharedModule {}
