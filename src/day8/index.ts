import {getFileToArray} from '../utils';

function getDisplayedNumber(input: string[]){
  const arr =  input.map(e => e.split(' | ').map(e => e.split(" "))).filter(e => e.length === 2)
  const sortedArr = arr;
  const res = []
  for (const unit of sortedArr) {
  res.push([unit[0].map(e => e.split('').sort().join('')),unit[1].map(e => e.split('').sort().join(''))])
  }
  return res
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
  const five :string[] = []
  const six :string[] = []
  const letter = getDiffFrom(resolvedArray[8], resolvedArray[9])
  for (const maybeFive of candidatesFive){
    candidatesSix.forEach(maybeSix => {
      if ( maybeFive.every(e => maybeSix.includes(e)) || maybeFive.every(e => maybeSix.includes(e))) {
        five.push(...maybeFive)
        six.push(...maybeSix)
      }
    })
  }
  resolvedArray[5] = five.join('')
  resolvedArray[6] = six.join('')
}
function getDiffFrom(first: string, second: string){
  const firstArr = first.split('')
  const secondArr = second.split('')
  const diff = firstArr.filter(e => !secondArr.includes(e))
  return diff.join('')
}

function findZero(display: string[][], resolvedArray: string[]): string{
  return display[0].filter(e => e.length == 6 && e !== resolvedArray[9] && e !== resolvedArray[6])[0]
}

function findThree(display: string[][], resolvedArray: string[]){
  const candidates = display[0].filter(e => e.length == 5 && e !== resolvedArray[5])
  const one = resolvedArray[1].split('')
  resolvedArray[3] = candidates.filter(candidate => one.every(e => candidate.includes(e)))[0]
  resolvedArray[2] = display[0].filter(e => e.length == 5 && e !== resolvedArray[5] && e !== resolvedArray[3])[0]
}

function calcResolvedArray(number: string[][]){
  const resolvedArray :string[]= Array(10).fill('');
  resolvedArray[1] = findOne(number);
  resolvedArray[7] = findSeven(number);
  resolvedArray[8] = findEight(number);
  resolvedArray[4] = findFour(number);
  resolvedArray[9] = findNine(number, resolvedArray);
  findSix(number, resolvedArray);
  findThree(number, resolvedArray);
  resolvedArray[0] =  findZero(number, resolvedArray);
  return resolvedArray;
}

export function day8star1(filename: string):number{
  const input = getFileToArray(filename);
  const numbers = getDisplayedNumber(input);
  const resolved = numbers.map(number => number[1].map(f => calcResolvedArray(number).indexOf(f)))
  return resolved.map(e => e.filter(f => f == 1 || f == 4 || f == 7 || f == 8)).flat().length
}

export function day8star2(filename: string):number{
  const input = getFileToArray(filename);
  const numbers = getDisplayedNumber(input);
  const resolved = numbers.map(number => number[1].map(f => calcResolvedArray(number).indexOf(f)))
  return resolved.reduce((a, c) => {
    return [a[0] + c.reduce((acc, curr) => acc * 10 + curr)]
  }, [0])[0]
}
