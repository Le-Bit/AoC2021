import { day1star1, day1star2 } from '../src/day1';
import { day2star1, day2star2 } from '../src/day2';
import { day3star1, day3star2 } from '../src/day3';
import { day4star1, day4star2 } from '../src/day4';

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
});
