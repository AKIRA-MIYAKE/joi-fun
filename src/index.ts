import * as joi from 'joi';

export interface IJoi {
  any: () => joi.Schema;
  array: () => joi.ArraySchema;
  bool: () => joi.BooleanSchema;
  boolean: () => joi.BooleanSchema;
  binary: () => joi.BinarySchema;
  date: () => joi.DateSchema;
  func: () => joi.FunctionSchema;
  number: () => joi.NumberSchema;
  object: (schema?: joi.SchemaMap) => joi.ObjectSchema;
  string: () => joi.StringSchema;
  alternatives: () => joi.AlternativesSchema;
  compile: (schema: Object) => joi.Schema;
}

export interface IValidator<T> {
  (value: T): joi.ValidationResult<T>;
}

export interface ICreateSchema {
  (joi: IJoi): joi.Schema;
}

export const createValidator = <T>(createSchema: ICreateSchema | Object, options: joi.ValidationOptions = { abortEarly: false }): IValidator<T> => {
  let schema: joi.Schema;

  if (typeof createSchema === 'function') {
    schema = createSchema(joi);
  } else {
    schema = joi.compile(createSchema);
  }

  return (value: T) => joi.validate<T>(value, schema, options);
}
