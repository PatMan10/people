import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { iValidationError } from '../../models/http.model';

@Component({
  selector: 'app-input-validation-errors',
  templateUrl: './input-validation-errors.component.html',
  styleUrls: ['./input-validation-errors.component.scss'],
})
export class InputValidationErrorsComponent implements OnChanges, OnInit {
  @Input() property = '';
  @Input() errors: iValidationError[] | undefined;
  errorMessages: string[] | undefined;

  constructor() {
    const { property, errors } = this;
    console.warn('CONST', {
      property,
      errors,
    });
  }

  ngOnInit(): void {
    const { property, errors } = this;
    console.warn('INIT', {
      property,
      errors,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { property, errors } = this;
    console.warn('CHANGE', {
      property,
      errors,
    });

    if (this.errors) this.errorMessages = this.extractErrors(this.errors);
    console.warn(this.errorMessages);
  }

  private extractErrors(e: iValidationError[]): string[] | undefined {
    for (let i = 0; i < e.length; i++) {
      const { property, constraints, children } = e[i];
      if (this.property === property && constraints)
        return Object.values(constraints);

      if (children && children.length > 0) return this.extractErrors(children);
    }

    return undefined;
  }
}
