import {
  addClass,
  after,
  animate,
  append,
  appendHtml,
  before,
  clone,
  closest,
  contains,
  dataset,
  filterElements,
  empty,
  getAttr,
  getHtml,
  getStyle,
  getText,
  getViewPort,
  hasClass,
  hide,
  last,
  match,
  nextSibling,
  opacity,
  outerHtml,
  prepend,
  prevSibling,
  remove,
  replaceHtml,
  rmAttr,
  rmChild,
  rmClass,
  scrollToElem,
  select,
  selectAll,
  setAttr,
  setCssVar,
  setHtml,
  setStyles,
  setText,
  show,
  siblings,
  submit,
  toggleAttr,
  toggleClass,
  trigger,
  value
} from '../src/query'

import {
  addListener,
  breakpoints,
  cleanQueryParams,
  count,
  getQueryParams,
  getQueryValue,
  getSize,
  goTo,
  isDevice,
  isDocReady,
  now,
  removeListener,
  rmQueryParam,
  setQueryParam,
  toHTML,
  type
} from "../src/general";

export let chromeless
export let localhost
let browser

import puppeteer from 'puppeteer'
import { ENV } from '../config'

// Load all lambda-bag functions to browser
beforeAll(async() => {

  const mapToFn = (...args) => args.map(fn => ` ${fn}`)

  const { browserWSEndpoint } = ENV
  if(!browserWSEndpoint){
    browser = await puppeteer.launch()
  }else{
    browser = await puppeteer.connect({ browserWSEndpoint })
  }

  chromeless = await browser.newPage()
  localhost = await browser.newPage()

  const general = [
    addClass, after, animate, append, appendHtml, before, 
    clone, closest, contains, dataset, filterElements, empty, 
    getAttr, getHtml, getStyle, getText, getViewPort, 
    hasClass, hide, last, match, nextSibling, opacity, 
    outerHtml, prepend, prevSibling, remove, replaceHtml, 
    rmAttr, rmChild, rmClass, scrollToElem, select, selectAll, 
    setAttr, setHtml, setCssVar, setStyles, setText, show, siblings, submit, 
    toggleAttr, toggleClass, trigger, value
  ]

  const query = [
    addListener, breakpoints, cleanQueryParams, count, 
    getQueryParams, getQueryValue, getSize, goTo, isDevice, 
    isDocReady, now, removeListener, rmQueryParam, 
    setQueryParam, toHTML, type
  ]

  const functions = mapToFn(...general,...query )

  await chromeless.evaluate(args => {
    eval(`window.lambda = {}`)
    for (var i = 0; i < args.length; i++) {
      const regex = /function\s(.*)\(/g
      const match = regex.exec(args[i])
      if(match)
        eval(`window.lambda['${match[1]}'] = ${args[i]}`)
    }
    return true
  }, functions)

  await localhost.goto('http://blank.org?foo=bar')
  await localhost.evaluate(args => {
    eval(`window.lambda = {}`)
    for (var i = 0; i < args.length; i++) {
      const regex = /function\s(.*)\(/g;
      const match = regex.exec(args[i]);
      if(match)
        eval(`window.lambda['${match[1]}'] = ${args[i]}`)
    }
    return true;
  }, functions);

})

// Close the browser activiy
afterAll(async() => {
  await browser.close()
})
