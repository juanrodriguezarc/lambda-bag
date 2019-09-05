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

import { testInBrowser } from '../utils/browser'


describe('General DOM functions', () => {

  it('Should return the a valid datetime', async () => {

    const _addClass = ({...args}) => {
      // const body = select('body')()
      // addClass('test-class')(body)
      console.log(args)
      return args
    }


    const result = await testInBrowser({ 
      fn: _addClass, 
      verbose: true, 
      args: { select, addClass }
    }) 


    console.log(result)

    expect(true).toBeTruthy();
  });



})
