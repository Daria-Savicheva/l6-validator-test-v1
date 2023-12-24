import ArraySchema from './ArraySchema.js';
import NumberSchema from './NumberSchema.js';
import ObjectSchema from './ObjectSchema.js';

export default class Validator {
  number() {
    const validator = (value) => typeof value === 'number';
    return new NumberSchema([validator]);
  }

  array() {
    const validator = (value) => Array.isArray(value);
    return new ArraySchema([validator]);
  }

  object() {
    return new ObjectSchema();
  }
}

const v = new Validator();

// Позволяет описывать валидацию для свойств объекта
const schema = v.object().shape({
  num: v.number(),
  // теперь, при валидации объекта с ключом lesson, значение этого ключа пройдет валидацию в соответствии с текущими методами
  array: v.array().allIntegers(),
});

schema.isValid({ num: 54, array: [1, 2, 3, 5, 65, 2] }); // true
schema.isValid({ num: 2, array: [1, 2, '4'] }); // false
