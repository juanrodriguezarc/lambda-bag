/* eslint-disable no-undef */
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
  docFilter,
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
  setHtml,
  setStyles,
  setText,
  show,
  siblings,
  submit,
  toggleAttr,
  toggleClass,
  trigger,
  value,
} from '../src/query'

import { Chromeless } from 'chromeless'

describe('General DOM functions', () => {

  const chromeless = new Chromeless()

  const mapToFn = (...args) => args.map(fn => ` ${fn}`)

  it('Should toggle the selector class', async () => {
    const result = await chromeless.evaluate((args)=> {
      eval(args[0])
      const body = document.querySelector("body")
      eval(`toggleClass('active')(document.querySelector("body"))`)
      const res = body.classList.contains('active')
      return res
    }, mapToFn(toggleClass)) 

    expect(result).toBeTruthy();
    
  });


  




})
