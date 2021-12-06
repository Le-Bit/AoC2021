import { transpose } from 'matrix-transpose'
import { getFileToArray } from '../utils';

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
