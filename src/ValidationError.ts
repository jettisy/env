export default class ValidationError extends Error {
  constructor(expect: string, value: string) {
    super(`env param validation failed: expected "${value}" to be  ${expect}`);
  }
}
