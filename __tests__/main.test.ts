import { day1star1,
  day1star2,
  day2star1,
  day2star2,
  day3star1,
  day3star2,
  day4star1,
  day4star2,
} from '../src/main';

describe('aoc2021', () => {

  it('exec failed', () => {
    expect(day2star2).toThrow();
  });

  it('exec day1', () => {
    console.log(day1star1('./day1'))
  });

  it('exec day1star2', () => {
    console.log(day1star2('./day1'))
  });

  it('exec day2star1', () => {
    console.log(day2star1('./day2'))
  });

  it('exec day2star2', () => {
    console.log(day2star2('./day2'))
  });

  it('exec day3star1', () => {
    console.log(day3star1('./day3'))
  });

  it('exec day3star2', () => {
    expect(day3star2('./test3')).toBe(230);
    console.log(day3star2('./day3'))
  });

  it('exec day4star1', () => {
    expect(day4star1('./test4')).toBe(4512);
    console.log(day4star1('./day4'))
  });

  it('exec day4star2', () => {
    expect(day4star2('./test4')).toBe(1924);
    console.log(day4star2('./day4'))
  });
});
