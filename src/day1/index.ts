import {getFileToArray, convertToIntArray} from '../utils';

export function day1star1(filename: string) {

  const lines = getFileToArray(filename);
  const arr = convertToIntArray(lines);
  const res = arr.filter((elem, i, self) => elem < self[i+1]).length
  return res
}

export function day1star2(filename: string) {

  const lines = getFileToArray(filename);
  const arr = convertToIntArray(lines);
  let res = 0
  for (let i = 0; i < arr.length; i++) {
    const sum = arr[i] + arr[i+1] + arr[i+2]
    const sum2 = arr[i+1] + arr[i+2] + arr[i+3]
    if (sum < sum2) {
      res++
    }
  }
  return res;
}
