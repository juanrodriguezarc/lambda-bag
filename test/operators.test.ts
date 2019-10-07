import {
  pipe,
  compose,
  map,
  filter,
  pluck,
  sort,
  reduce,
  toggle,
  set,
  spread,
} from '../src/operators/operators';

// Auxiliar constants
const integerArray = [1,2,3,4,5,6,7,8,9,10] 
const toBeSet = [1,3,4,7,9,34,2,1,2,3]
const objArray = [{ a: 1 }, { c: 2 }, { d: 3 }, { a: 7 }]
const toBeSort = [-1,1,2,4,-3,1,10,-50,-100,100]

// Auxiliar functions
const double = (x) => x * 2
const add = (num) => (x) => x + num
const isEven = (x) => x % 2 === 0 
const isOdd = (x) => !isEven(x)
const asc = (a,b) => a - b
const desc = (a,b) => b - a
const sum = (acc, x) => acc + x

// -- Tests -- //
describe('Pipe - function composition', () => {

  it('Should compose multiplication and sum in the respective order', () => {
    const expected = integerArray.map(i => i*2).map(i => i + 3)
    const result =
    pipe(
      map(double),
      map(add(3))
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should map all even numbers', () => {
    const expected = integerArray.map(double)
    const result =
    pipe(
      map(double),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should apply reduce operator and sum the array', () => {
    const expected = integerArray.map(double)
    const result =
    pipe(
      map(double),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should filter all even numbers', () => {
    const expected = integerArray.filter(isEven)
    const result =
    pipe(
      filter(isEven),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should map the array key value', () => {
    const expected = objArray.map(({a}) =>  a)
    const result =
    pipe(
      pluck('a'),
    )(objArray)
    expect(result).toEqual(expected);
  });

  it('Should sort the array asc', () => {
    const expected = toBeSort.sort(asc)
    const result =
    pipe(
      sort(asc),
    )(toBeSort)
    expect(result).toEqual(expected);
  });

  it('Should apply the reduce operator correctly', () => {
    const expected = integerArray.reduce(sum,0)
    const result =
    pipe(
      reduce(sum,0),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should toggle a value', () => {
    const expected = integerArray.filter(i => i != 5)
    const result =
    pipe(
      toggle(5),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should convert the array in a set', () => {
    const expected = [...new Set(toBeSet)]
    const result =
    pipe(
      set,
      spread
    )(toBeSet)
    expect(result).toEqual(expected);
  });

})

describe('Compose - function composition', () => {

  it('Should compose sum and multiplication in the respective order', () => {
    const expected = integerArray.map(i => i + 10).map(i => i*2)
    const result =
    compose(
      map(double),
      map(add(10))
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should map all even numbers', () => {
    const expected = integerArray.map(double)
    const result =
    compose(
      map(double),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Filter all odd numbers', () => {
    const expected = integerArray.filter(isOdd)
    const result =
    compose(
      filter(isOdd),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should map the array key & get the value', () => {
    const expected = objArray.map(({a}) =>  a)
    const result =
    compose(
      pluck('a'),
    )(objArray)
    expect(result).toEqual(expected);
  });

  it('Should sort the array key value', () => {
    const expected = toBeSort.sort((a,b)=> b - a)
    const result =
    compose(
      sort(desc),
    )(toBeSort)
    expect(result).toEqual(expected);
  });

  it('Should apply the reduce operator correctly', () => {
    const expected = integerArray.reduce(sum,0)
    const result =
    compose(
      reduce(sum,0),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should toggle a value', () => {
    const expected = integerArray.filter(i => i != 5)
    const result =
    compose(
      toggle(5),
    )(integerArray)
    expect(result).toEqual(expected);
  });

  it('Should convert the array in a set', () => {
    const expected = [...new Set(toBeSet)]
    const result =
    compose(
      spread,
      set
    )(toBeSet)
    expect(result).toEqual(expected);
  });

})
  


  
