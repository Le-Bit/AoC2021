import { getFileToArray } from "../utils";
import { transpose } from 'matrix-transpose'

function printMap(ventMap: number[][]) {
  console.log(ventMap.map(e => e.join('')).join('\n'))
}

function getMap(filename: string){
 const input = getFileToArray(filename);
 const map = input.map(e => e.split('').map(n => parseInt(n)));
 map.pop();
 return map;
}

function findLowestsInLine(line: number[]){
  const lineBool = line.map((e, i, self) => 
   e < (self[i + 1] == undefined ? 10 : self[i + 1]) && 
      e < (self[i - 1] == undefined ? 10 : self[i - 1])
  )
  return lineBool

}

function findLowest(lavaMap: number[][]) {
  const res = lavaMap.map(line => findLowestsInLine(line))
  const res2 = transpose(transpose(lavaMap).map(line => findLowestsInLine(line)))
  let res3: boolean[][] = Array(res2.length).fill(false).map(e => Array(res2[0].length).fill(false))
  for (let i = 0; i < res2.length; i++) {
    for (let j = 0; j < res2[i].length; j++) {
      res3[i][j] = res2[i][j] && res[i][j]
    }
  }
  return res3
}

export function day9star1(filename: string): number {
  const lavaMap = getMap(filename);
  const truthMap = findLowest(lavaMap);
  let res = 0;
  for (let i = 0; i < lavaMap.length; i++) {
    for (let j = 0; j < lavaMap[i].length; j++) {
      res += truthMap[i][j] ? (lavaMap[i][j]+1) : 0;
    }
  }
  return res;
}
