import { getFileToArray } from '../utils';

function getPopulation(filename: string): number[] {
  const input = getFileToArray(filename).filter(e => e != '')
  const population = input[0].split(',');
  return population.map(e => parseInt(e));
}

export function day6star1(filename: string, max: number): number {
  const population = getPopulation(filename).sort((a, b) => b - a);
  let pop : number[] = [];
  for (let i = 0; i <= 8; i++) {
    const quantity = population.filter(e => e == i).length;
    pop.push(quantity);
  }
  for (let i = 0; i < max; i++) {
    const newpop = pop[0]
    for (let j = 0; j < 8; j++) {
      pop[j] = pop[j + 1];
    }
    pop[8] = newpop;
    pop[6] += newpop
    console.log(pop);
  }
  return pop.reduce((a, b) => a + b);
}
