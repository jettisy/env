import ValidationError from "./ValidationError";

const validateNumber = (value: string): number => {
  const numValue = Number(value);
  if (isNaN(numValue)) throw new ValidationError("number", value);
  return numValue;
};

const validateString = (value: string): string => {
  return value;
};

const validateBoolean = (value: string): boolean => {
  const lc_value = value.toLowerCase();
  if (lc_value === "true" || value === "1") return true;
  if (lc_value === "false" || value === "0") return false;
  throw new ValidationError("boolean", value);
};

export { validateNumber, validateString, validateBoolean };
