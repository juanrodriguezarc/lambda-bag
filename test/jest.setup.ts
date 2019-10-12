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

import fetch from 'node-fetch';

// Load all lambda-bag functions to browser
beforeAll(async() => {

  const mapToFn = (...args) => args.map(fn => ` ${fn}`)

  try {
    const result = await fetch('http://0.0.0.0:9222/json/version')
    const res = await result.json()
    const { webSocketDebuggerUrl } = res
    browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl })
    console.log('Running remote', webSocketDebuggerUrl)
  }catch(e) {
    browser = await puppeteer.launch()
  }

  chromeless = await browser.newPage()

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

  await chromeless.goto('http://blank.org/')
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


})

// Close the browser activiy
afterAll(async() => {
    await browser.close()
})
