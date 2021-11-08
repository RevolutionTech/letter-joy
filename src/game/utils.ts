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

export function cycleArray<T>(array: T[], startingIndex: number): T[] {
  return [
    ..._.slice(array, startingIndex, array.length),
    ..._.slice(array, 0, startingIndex),
  ];
}

// Source: https://stackoverflow.com/a/13627586/3241924
export const getOrdinalSuffix = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
};
