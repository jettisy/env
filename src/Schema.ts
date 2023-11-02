import { validateNumber, validateString, validateBoolean } from "./ValidateFunctions";
import { ValidateFn } from "./types/ValidateFn.ts";

export default class Schema<T> {
  public validateFn: ValidateFn<T>;

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
    const optionalFn: ValidateFn<T | undefined> = (value: string): T | undefined => {
      if (value === "") return undefined;
      return this.validateFn(value);
    };
    return new Schema(optionalFn);
  }
}
