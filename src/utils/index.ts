import fs from 'fs';

export function getFileToArray(filename:string){
  filename = filename || './input';
  try {
    const file = fs.readFileSync(filename,'utf8');
    const lines = file.split('\n');
    return lines;  
  } catch (error) {
    throw new Error(`File ${filename} not found`);
  }
}

export function convertToIntArray(lines:string[]){
  const arr = lines.map(line => parseInt(line));
  return arr;
}

