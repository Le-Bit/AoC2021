import fs from 'fs';
import { transpose } from 'matrix-transpose'


function getFileToArray(filename:string){
  filename = filename || './input';
  try {
    const file = fs.readFileSync(filename,'utf8');
    const lines = file.split('\n');
    return lines;  
  } catch (error) {
    throw new Error(`File ${filename} not found`);
  }
}

function convertToIntArray(lines:string[]){
  const arr = lines.map(line => parseInt(line));
  return arr;
}

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

export function day3star1(filename: string) {
  const matrix = getFileToArray(filename).map(e => e.split('').map((subelement: string) => parseInt(subelement)));
  const len = matrix.length;
  const matrixTransposed = (transpose(matrix));
  const matrixSummed = matrixTransposed.map(elem => elem.reduce((a,b) => a+b));
  const gamma = matrixTransposed.map((elem, index) => {
    return matrixSummed[index] > len/2 ? 1 : 0
  });
  const epsilon = matrixTransposed.map((elem, index) => {
    return gamma[index] == 1 ? 0 : 1
  });

  return (parseInt(gamma.join(''),2) * parseInt(epsilon.join(''),2));
}

export function day3star2(filename: string) {
  const matrix = getFileToArray(filename).map(e => e.split('').map((subelement: string) => parseInt(subelement)));
  const len = matrix.length;
  let matrixTransposed = (transpose(matrix));
  let matrixSummed = matrixTransposed.map(elem => elem.reduce((a,b) => a+b));
  let mostCommon = matrixTransposed.map((elem, index) => matrixSummed[index] >= len / 2 ? 1 : 0);
  let leastCommon = matrixTransposed.map((elem, index) => matrixSummed[index] >= len / 2 ? 0 : 1);

  let filteredCommon: any[];
  filteredCommon = matrix
  for (let i = 0; filteredCommon.length > 1; i++) {
    matrixTransposed = (transpose(filteredCommon));
    matrixSummed = matrixTransposed.map(elem => elem.reduce((a,b) => a+b));
    mostCommon = matrixTransposed.map((elem, index) => matrixSummed[index] >= filteredCommon.length / 2 ? 1 : 0);
    filteredCommon = filteredCommon.filter((elem) => elem[i] == mostCommon[i]);
  }


  let filteredUncommon: any[];
  filteredUncommon = matrix
  for (let i = 0; filteredUncommon.length > 1; i++) {
    matrixTransposed = (transpose(filteredUncommon));
    matrixSummed = matrixTransposed.map(elem => elem.reduce((a,b) => a+b));
    leastCommon = matrixTransposed.map((elem, index) => matrixSummed[index] < filteredUncommon.length / 2 ? 1 : 0);
    filteredUncommon = filteredUncommon.filter((elem) => elem[i] == leastCommon[i]);
  }

  return (parseInt(filteredCommon[0].join(''), 2) * parseInt(filteredUncommon[0].join(''), 2))
}












































































function countBingoCard(lines: string[]): number{
  return (lines.filter(e => e === '').length);
}

function getNumberDrawed(lines: string[]): number[] | undefined{
  return lines.shift()?.split(',').map(e => parseInt(e));
}

function getBingoCards(lines: string[]): number[][][]{
  const bingoCardlength = countBingoCard(lines);
  lines = lines.filter(e => e !== '');
  const bingos: string[][] = [];
  for (let i = 0; i < bingoCardlength - 1; i++) {
    bingos.push(lines.slice(i*5, i*5+5));
  }

  return bingos.map(card => card.map(e => e.trim().split(/\s+/g).map(e => parseInt(e))));
}

function isWinningCard(card: number[][]): boolean{
  return card.some((row: number[]) => row.every(e => e === -1))
}
function calcScore(bingoCards: number[][][], ball: number, i: number): number{
  const res = bingoCards[i].map((row: number[]) => row.filter((e: number) => e !== -1))
  return res.flat().reduce((acc, curr) => acc + curr, 0) * ball;
}

export function day4star1(filename: string): number {
  const lines: string[] = getFileToArray(filename); 
  const numberDrawed: number[] | undefined= getNumberDrawed(lines);
  if (!numberDrawed) { return 0; }
  let bingoCards: number[][][] = getBingoCards(lines);

  for (const ball of numberDrawed) {
    bingoCards = bingoCards.map((card: number[][]) => card.map((row: number[]) => row.map((e: number) => e === ball ? -1 : e)))

    for (let i = 0; i < bingoCards.length; i++) {
      if(isWinningCard(bingoCards[i]) || isWinningCard(transpose(bingoCards[i]))) { 
        return calcScore(bingoCards, ball, i);
      }
    }
  }
  return 0
}

export function day4star2(filename: string): number {
  const lines: string[] = getFileToArray(filename); 
  const numberDrawed: number[] | undefined= getNumberDrawed(lines);
  let lastWin: any;
  if (!numberDrawed) { return 0; }
  let bingoCards: number[][][] = getBingoCards(lines);

  for (const ball of numberDrawed) {
    bingoCards = bingoCards.map((card: number[][]) => card.map((row: number[]) => row.map((e: number) => e === ball ? -1 : e)))

    for (let i = 0; i < bingoCards.length; i++) {
      if(isWinningCard(bingoCards[i]) || isWinningCard(transpose(bingoCards[i]))) { 
        lastWin = calcScore(bingoCards, ball, i);
        bingoCards.splice(i, 1);
      }
    }
  }
  return lastWin
}







































