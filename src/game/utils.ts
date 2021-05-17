import _ from "lodash";

class IllegalStateException extends Error {}

// Source: https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
export const assertNever = (x: never): never => {
  throw new IllegalStateException(
    `Unexpectedly encountered illegal state: ${x}`
  );
};

export function splitArray<T>(arr: T[], n: number) {
  return [_.slice(arr, 0, n), _.slice(arr, n)];
}
