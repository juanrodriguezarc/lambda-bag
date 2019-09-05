/** 
 *  The purpose of this file is generate/introduce a toolbelt (Similar to loadash, Ramda, RxJS) 
 *  following the DRY principle and functional programming practices
*/

/**
 * Combines n functions. It’s a pipe flowing left-to-right, 
 * calling each function with the output of the last one.
 */
export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

/**
 * Combines n functions. It’s a pipe flowing right-to-left, 
 * calling each function with the output of the last one.
 */
export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

/**
 * Apply projection with each value from source.
 */
export const map = (f) => (arr) => [...arr].reduce((acc, x) => [...acc, f(x)], [])

/**
 *  Emit values that pass the provided condition.
 */
export const filter = (f) => (arr) => [...arr].reduce((acc, x) => f(x) ? [...acc, x] : acc, [])

/**
 *  Select properties to emit
 */
export const pluck = (str) => (arr) => [...arr].reduce((acc, x) => [...acc, x[str]], [])

/**
 * Sort given values by a function
 */
export const sort = (fn) => (arr) => [...arr].reduce(insertSortedValue(fn),[])

/**
 * Apply reduce operator to the current array
 */
export const reduce = (fn, acc =[]) => (arr) => [...arr].reduce(fn,acc)

/**
 * Toggle one element if match with the current items in the array
 * If exists will be remove in the other case will be addded 
 */
export const toggle = (value) => (arr) => arr.includes(value) ? arr.filter(i => i != value) : [...arr, value]

/**
 * Convert the array into a set
 */
export const set = (arr) => new Set(arr)

/**
 * Convert the array into a set
 */
export const spread = (arr) => [...arr]


const insertSortedValue = (fn) => (arr, value) => [...arr.filter(n => fn(n, value)), value, ...arr.filter(n => !fn(n,value))]