import _ from "lodash";

export function splitArray<T>(arr: T[], n: number) {
  return [_.slice(arr, 0, n), _.slice(arr, n)];
}
