import { getFileToArray } from '../utils';

export function day2star1(filename: string) {
  const lines = getFileToArray(filename);
  const lines_parsed = lines.map(element => element.split(' '));

  let hor = 0;
  let depth = 0;
  lines_parsed.forEach(element => {
    const move_value = parseInt(element[1]);
    switch (element[0]) {
      case 'forward':
        hor += move_value;
      break;
      case 'down':
        depth += move_value;
      break;
      case 'up':
        depth -= move_value;
      break;
    }

  });
  return hor * depth
}

export function day2star2(filename: string) {
  const lines = getFileToArray(filename);
  const lines_parsed = lines.map(element => element.split(' '));

  let hor = 0;
  let depth = 0;
  let aim = 0;
  lines_parsed.forEach(element => {
    const move_value = parseInt(element[1]);

    switch (element[0]) {
      case 'forward':
        hor += move_value;
      depth += aim * move_value;
      break;
      case 'down':
        aim += move_value;
      break;
      case 'up':
        aim -= move_value;
      break;
    }

  });
  return hor * depth
}
