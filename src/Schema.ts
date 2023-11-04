import { validateNumber, validateString, validateBoolean } from "./ValidateFunctions";
import { ValidateFn } from "./types/ValidateFn";

export default class Schema<T> {
  public validateFn: ValidateFn<T>;
  public is_optional: boolean = false;

  private constructor(fn: ValidateFn<T>) {
    this.validateFn = fn;
  }

  public static number() {
    return new Schema(validateNumber);
  }

  public static string() {
    return new Schema(validateString);
  }

  public static boolean() {
    return new Schema(validateBoolean);
  }

  public optional(): Schema<T | undefined> {
    const optionalFn: ValidateFn<T | undefined> = (
      value: string | undefined,
    ): T | undefined => {
      if (value === undefined) return value;
      return this.validateFn(value);
    };
    const instance = new Schema(optionalFn);
    instance.is_optional = true;
    return instance;
  }
}
