import { day1star1, day1star2 } from '../src/day1';
import { day2star1, day2star2 } from '../src/day2';
import { day3star1, day3star2 } from '../src/day3';
import { day4star1, day4star2 } from '../src/day4';
import { day5star1, day5star2 } from '../src/day5';
import { day6star1, } from '../src/day6';
import { day8star1, } from '../src/day8';

describe('aoc2021', () => {

  it('exec failed', () => {
    expect(day1star1).toThrow();
  });

  it('exec day1', () => {
    expect(day1star1('./inputs/test1')).toBe(7);
  });

  it('exec day1star2', () => {
    expect(day1star2('./inputs/test1')).toBe(5);
  });

  it('exec day2star1', () => {
    expect(day2star1('./inputs/test2')).toBe(150);
  });

  it('exec day2star2', () => {
    expect(day2star2('./inputs/test2')).toBe(900);
  });

  it('exec day3star1', () => {
    expect(day3star1('./inputs/test3')).toBe(198);
  });

  it('exec day3star2', () => {
    expect(day3star2('./inputs/test3')).toBe(230);
  });

  it('exec day4star1', () => {
    expect(day4star1('./inputs/test4')).toBe(4512);
  });

  it('exec day4star2', () => {
    expect(day4star2('./inputs/test4')).toBe(1924);
  });

  it('exec day5star1', () => {
    expect(day5star1('./inputs/test5')).toBe(5);
  });

  it('exec day5star2', () => {
    expect(day5star2('./inputs/test5')).toBe(12);
  });

  it('exec day6star1', () => {
    expect(day6star1('./inputs/test6', 18)).toBe(26);
    expect(day6star1('./inputs/test6', 80)).toBe(5934);
    expect(day6star1('./inputs/test6', 256)).toBe(26984457539);
  });

  it('exec day8star1', () => {
    expect(day8star1('./inputs/test8')).toBe(26);
  });

});
