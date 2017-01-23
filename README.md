# joi-fun
Validate function that lapping [hapijs/joi](https://github.com/hapijs/joi) creator.

## Setup

```
$ npm install joi-fun
```

### Usage

Call `createValidator()` with function that return joi schema object.
Validate function returns joi's ValidationResult object.

If you want to know you more schema definition, see joi's [API Reference](https://github.com/hapijs/joi/blob/v10.2.0/API.md).

```
const validator = createValidator<ValueType>(
  (joi) => joi.object().keys({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: joi.alternatives().try(joi.number(), joi.string()),
    birthyear: joi.number().integer().min(1900).max(2013),
    email: joi.string().email()
  })
  .with('username', 'birthyear')
  .without('password', 'access_token')
);

const result = validator({ username: 'abc', birthyear: 1994 });
```

`createValidator()` also accepts literal schema definition.

```
const validator = createValidator<ValueType>(['key', 5, { a: true, b: [/^a/, 'boom'] }]);
const result = validator({ a: true, b: 'apple' })
```
