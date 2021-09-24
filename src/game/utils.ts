import _ from "lodash";

class IllegalStateException extends Error {}

// Source: https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
export const assertNever = (x: never): never => {
  throw new IllegalStateException(
    `Unexpectedly encountered illegal state: ${x}`
  );
};

// Source: https://stackoverflow.com/a/18618250/3241924
export const modulo = (dividend: number, divisor: number) =>
  ((dividend % divisor) + divisor) % divisor;

export function pullOnce<T>(array: T[], values: T[]) {
  let newArray = [...array];
  values.forEach((value) => {
    _.pullAt(newArray, _.indexOf(newArray, value));
  });
  return newArray;
}
