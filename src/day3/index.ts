import { transpose } from 'matrix-transpose'
import { getFileToArray } from '../utils'

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

