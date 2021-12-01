import fs from 'fs';
import processs from 'process';

export function day1(filename: string) {
  filename = filename || './input';
  const file = fs.readFileSync(filename,'utf8');
  const lines = file.split('\n');
  const arr = lines.map(line => parseInt(line));
  const res = arr.filter((elem, i, self) => elem < self[i+1]).length
  return res
}
