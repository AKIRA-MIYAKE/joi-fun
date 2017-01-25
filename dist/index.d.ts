declare module 'joi-fun' {
	import * as joi from 'joi';
	export interface Joi {
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
	export interface Validator<T> {
	    (value: any): joi.ValidationResult<T>;
	}
	export interface CreateSchema {
	    (joi: Joi): joi.Schema;
	}
	export const createValidator: <T>(createSchema: Object | CreateSchema, options?: joi.ValidationOptions) => Validator<T>;

}
