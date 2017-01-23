import * as assert from 'power-assert';

import { createValidator } from '../src';

describe('createValidator()', () => {

  it('Should get validator with createSchema function.', () => {
    const validator = createValidator<any>(
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

    assert.ok(validator({ username: 'abc', birthyear: 1994 }).error === null);
    assert.equal(validator({ username: 'ab', password: 'test', access_token: '1234' }).error.details.length, 3);
  });

  it('Shoud get validator with literal schema.', () => {
    const validator = createValidator<any>(['key', 5, { a: true, b: [/^a/, 'boom'] }]);

    assert.ok(validator('key').error === null);
    assert.equal(validator('value').error.details.length, 3);
    assert.ok(validator(5).error === null);
    assert.equal(validator(42).error.details.length, 3);
    assert.ok(validator({ a: true, b: 'apple' }).error === null);
    assert.equal(validator({ a: false, b: 'bazz' }).error.details.length, 5);
  });

  it('Validator return object that input interface compatible.', () => {
    const validator = createValidator<{ str: string, num?: number }>((joi) => joi.object().keys({
      str: joi.string().required(),
      num: joi.number()
    }));

    const value1 = { str: 'test', num: '42' };
    let result1 = validator(value1);

    assert.ok(result1.value);
    assert.equal(result1.value.str, 'test');
    assert.equal(result1.value.num, 42);

    const value2 = { num: 42 };
    let result2 = validator(value2);

    assert.ok(result2.error);
  });

});