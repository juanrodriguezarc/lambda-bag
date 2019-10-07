import { fn, list, value, bfn } from './types'
/** 
 *  The purpose of this file is generate/introduce a toolbelt (Similar to loadash, Ramda, RxJS) 
 *  following the DRY principle and functional programming practices
*/

/**
 * Combines n functions. It’s a pipe flowing left-to-right, 
 * calling each function with the output of the last one.
 * @param {Array<function>} fns Array of functions
 * @param {Array<object>} x
 */
export const pipe = (...fns : fn[]) => (x: list) => fns.reduce((v, f) => f(v), x)

/**
 * Combines n functions. It’s a pipe flowing right-to-left, 
 * calling each function with the output of the last one.
 * @param {Array<function>} fns Array of functions
 * @param {Array<object>} x
 */
export const compose = (...fns: fn[]) => (x: list) => fns.reduceRight((v, f) => f(v), x)

/**
 * Apply projection with each value from source.
 * @param {function} f 
 * @param {Array<object>} arr 
 */
export const map = (f: fn) => (arr: list) => [...arr].reduce((acc, x) => [...acc, f(x)], [])

/**
 *  Emits values that pass the provided condition.
 * @param {function} f 
 * @param {Array<object>} arr 
 */
export const filter = (f: fn) => (arr: list) => [...arr].reduce((acc, x) => f(x) ? [...acc, x] : acc, [])

/**
 * Selects properties to emit
 * @param {string} str 
 * @param {Array<object>} arr 
 */
export const pluck = (str: string) => (arr: list) => [...arr].reduce((acc, x) => [...acc, x[str]], [])

/**
 * Sort given values by a function
 * @param {function} fn 
 * @param {Array<object>} arr 
 */
export const sort = (fn: fn) => (arr: list) => [...arr].reduce(insertSortedValue(fn),[])

/**
 * Apply reduce operator to the current array
 * @param {function} fn 
 * @param {any} acc 
 * @param {Array<object>} arr 
 */
export const reduce = (fn : fn , acc: any = []) => (arr : list) => [...arr].reduce(fn,acc)

/**
 * Toggle one element if match with the current items in the array
 * If exists will be remove in the other case will be addded 
 * @param {any} value 
 * @param {Array<object>} arr 
 * 
 */
export const toggle = (value: value) => (arr: list) => arr.includes(value) ? arr.filter(i => i != value) : [...arr, value]

/**
 * Converts the array into a set
 * @param {Array<object>} arr 
 */

export const set = (arr: list) => new Set(arr)

/**
 * Converts the array into a set
 * @param {Array<object>} arr   
 */
export const spread = (arr: list) => [...arr]

/**
 * Negates the function expression
 *  @param {function} fn  A function that returns a boolean value
 *  @param {Array<object>} args 
 */
export const not = (fn: bfn) => (...args: value) => !fn(...args)

/**
 * Executes the function when the predicate is true  
 * @param {function} fn 
 * @param {function} predicate A function that returns a boolean value
 * @param {Array<object>} args
 */
export const when = (fn: bfn) => (predicate: fn) => (...args: value[]) => predicate(...args) ? !fn(...args) : undefined


const insertSortedValue = (fn: fn) => (arr: list, value: value) => [...arr.filter((n) => fn(n, value)), value, ...arr.filter((n) => !fn(n,value))]