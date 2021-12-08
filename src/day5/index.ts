import {getFileToArray} from '../utils/'

interface Vector {
  start: {
    x: number,
    y: number
  },
  end: {
    x: number,
    y: number
  }
}

function getVectors(input: string[]): Vector[]{
  const vectorArray = input
  .map(e => e.split('->')
       .map(e => e.split(',')))
       .filter(e => e.length === 2);
       const vectors = vectorArray.map(e => {
         return { start: {
           x: parseInt(e[0][0]),
           y: parseInt(e[0][1])
         }, end: {
           x: parseInt(e[1][0]),
           y: parseInt(e[1][1])
         } }
       })
       return vectors;
}

function getxMax(vectors: Vector[]) {
  return vectors.map(e => e.start.x > e.end.x ? e.start.x : e.end.x).reduce((a, b) => a > b ? a : b);
}

function getyMax(vectors: Vector[]) {
  return vectors.map(e => e.start.y > e.end.y ? e.start.y : e.end.y).reduce((a, b) => a > b ? a : b);
}

function printMap(ventMap: number[][]) {
  console.log(ventMap.map(e => e.join('')).join('\n'))
}

function drawMap(vectors: Vector[], xMax: number, yMax: number){
  const resultMap = new Array(xMax+1).fill(0).map(e => new Array(yMax+1).fill(0));
  for (const vector of vectors) {
    if (vector.start.y === vector.end.y){
      const start = vector.start.x < vector.end.x ? vector.start : vector.end;
      const end = vector.start.x > vector.end.x ? vector.start : vector.end;
      for (let i = start.x; i <= end.x; i++) {
        resultMap[i][vector.start.y] += 1;
      }
    }
    if (vector.start.x === vector.end.x){
      const start = vector.start.y < vector.end.y ? vector.start : vector.end;
      const end = vector.start.y > vector.end.y ? vector.start : vector.end;
      for (let i = start.y; i <= end.y; i++) {
        resultMap[vector.start.x][i] += 1;
      }
    }
  }
  return resultMap;
}

function drawMapDiagonal(vectors: Vector[], xMax: number, yMax: number, resultMap: number[][] ){
  for (const vector of vectors) {
    const xShift = Math.abs(vector.start.x - vector.end.x);
    const yShift = Math.abs(vector.start.y - vector.end.y);
    if (xShift === yShift){
      const start = vector.start.x < vector.end.x ? vector.start : vector.end;
      const end = vector.start.x > vector.end.x ? vector.start : vector.end;
      for (let i = 0; i <= xShift; i++) {
        if (start.y - end.y > 0) {
          resultMap[start.x + i][start.y - i] += 1;
        }
        else if (start.y - end.y < 0) {
          resultMap[start.x + i][start.y + i] += 1;
        }
      }
    }
  }
  return resultMap;
}

export function day5star1(filename: string){
  const input = getFileToArray(filename);
  const vectors: Vector[] = getVectors(input);

  const xMax = getxMax(vectors);
  const yMax = getyMax(vectors);
  const resultMap = drawMap(vectors, xMax, yMax);
  return resultMap.flat().filter(e => e >= 2).length;
}

export function day5star2(filename: string){
  const input = getFileToArray(filename);
  const vectors: Vector[] = getVectors(input);

  const xMax = getxMax(vectors);
  const yMax = getyMax(vectors);
  let resultMap = drawMap(vectors, xMax, yMax);
  resultMap = drawMapDiagonal(vectors, xMax, yMax, resultMap);
  printMap(resultMap);
  return resultMap.flat().filter(e => e >= 2).length;
}
