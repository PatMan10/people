interface Context {
  [key: string]: any;
  key?: string;
  label?: string;
  value?: any;
}

export interface ValidationErrorItem {
  message: string;
  path: Array<string | number>;
  type: string;
  context?: Context;
}
