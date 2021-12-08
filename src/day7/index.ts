import { getFileToArray } from "../utils";

function getCrabs(filename: string){
  const input = getFileToArray(filename)
  const crabs = input[0].split(',').map(e => parseInt(e))
  
  return crabs;
}
function getMedian(crabs: number[]){
  const sorted = crabs.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted[middle]
}

function getFuelConsumption(position: number, i: number):number {
  const shift = Math.max(position, i) - Math.min(position, i)
  return ((shift * shift) + shift) / 2
}


export function day7star1(filename: string): number{
  const crabs = getCrabs(filename)
  const median = getMedian(crabs)
  return crabs.reduce((acc, curr) => acc + Math.abs(curr - median), 0)
}

export function day7star2(filename: string): number{
  const crabs = getCrabs(filename)
  const fuels: number[] = []
  for (let i = 0; i < Math.max(...crabs); i++) {
    fuels.push(crabs.reduce((acc, curr) => acc + getFuelConsumption(curr,i), 0))
  }
  return Math.min(...fuels);
}
