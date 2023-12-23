export default class ArraySchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  allIntegers() {
    const validator = (arr) => arr.every((value) => Number.isInteger(value));
    return new ArraySchema([...this.validators, validator]);
  }

  custom(val) {
    const validator = (arr) => arr.every((item) => val(item));
    return new ArraySchema([...this.validators, validator]);
  }
}
