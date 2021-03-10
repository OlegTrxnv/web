export class Attributes<T> {
  constructor(private data: T) {}

  // get property
  // Using generic <K> with method definition (naming "K" is by convention)
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  // get all properties
  getAll(): T {
    return this.data;
  }

  // set properties
  set(updateObject: T): void {
    Object.assign(this.data, updateObject);
  }
}

// Arrow function to have this bound to instance of Attributes

// In JS type key for objects is always a string (it gets converted if needed)
// In TS some particular string can be a type

// <K extends keyof T> - constrains K to be a type of one of the keys of T object (for UserProps: id, age or name)
// (key: K) - argument passed must be of type K (for UserProps: strings of id, age or name)
// :T[K] - return value type is on interface of T at key of K (for UserProps: number or string)
