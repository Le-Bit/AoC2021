import {getFileToArray} from '../utils';

function getDisplayedNumber(input: string[]){
  const arr =  input.map(e => e.split(' | ').map(e => e.split(" "))).filter(e => e.length === 2)
  let sortedArr = arr.map(e => e.map(e => e.sort((a,b) => a.length - b.length)));
 sortedArr[0][0] = sortedArr[0][0].map(e => e.split('').sort().join(''))
 return sortedArr
}

function findOne(displays: string[][]){
  return displays[0].filter(e => e.length == 2)[0]
}

function findSeven(displays: string[][]){
  return displays[0].filter(e => e.length == 3)[0]
}

function findEight(displays: string[][]){
  return displays[0].filter(e => e.length == 7)[0]
}

function findFour(displays: string[][]){
  return displays[0].filter(e => e.length == 4)[0]
}

function findNine(displays: string[][], resolvedArray: string[]){
  const candidates = displays[0].filter(e => e.length == 6).map(e => e.split(''))
  const nineWithoutTail = Array.from(new Set([...resolvedArray[7].split(''), ...resolvedArray[4].split('')])).sort()
  const nine = candidates.filter(candidate => nineWithoutTail.every(e => candidate.includes(e)))[0]
  return nine.join('')
}

function findSix(displays: string[][], resolvedArray: string[]){
  const candidatesSix = displays[0].filter(e => e.length == 6 && e !== resolvedArray[9]).map(e => e.split(''))
  const candidatesFive = displays[0].filter(e => e.length == 5).map(e => e.split(''))
  console.log('6 =>', candidatesSix)
  console.log('5 =>', candidatesFive)
  const letter = getDiffFrom(resolvedArray[8], resolvedArray[9])
  console.log('letter =>', letter)

}
function getDiffFrom(first: string, second: string){
  const firstArr = first.split('')
  const secondArr = second.split('')
  const diff = firstArr.filter(e => !secondArr.includes(e))
  return diff.join('')
}

export function day8star1(filename: string):number{
  const input = getFileToArray(filename);
  const numbers = getDisplayedNumber(input);
  const number = numbers[0]
  const resolvedArray :string[]= Array(10).fill('');
  let leds:any = {}
  resolvedArray[1] = findOne(number);
  resolvedArray[7] = findSeven(number);
  leds[getDiffFrom(resolvedArray[7], resolvedArray[1])] = 'a'
  resolvedArray[8] = findEight(number);
  resolvedArray[4] = findFour(number);
  resolvedArray[9] = findNine(number, resolvedArray);
  findSix(number, resolvedArray);
  return 0;
}
