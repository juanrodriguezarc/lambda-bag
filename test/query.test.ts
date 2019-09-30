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
  value
} from '../src/query'

import { Chromeless } from 'chromeless'

describe('General DOM functions', () => {

  const chromeless = new Chromeless()
  const mapToFn = (...args) => args.map(fn => ` ${fn}`)

  beforeAll(async () => {
    await chromeless.evaluate(args => {
      eval(`window.query = {}`)
      
      for (var i = 0; i < args.length; i++) {
        const regex = /function\s(.*)\(/g
        const match = regex.exec(args[i])
        if(match)
          eval(`window.query['${match[1]}'] = ${args[i]}`)
      }

      return true
    }, mapToFn(
      addClass, after, animate, append, appendHtml, before, 
      clone, closest, contains, dataset, docFilter, empty, 
      getAttr, getHtml, getStyle, getText, getViewPort, 
      hasClass, hide, last, match, nextSibling, opacity, 
      outerHtml, prepend, prevSibling, remove, replaceHtml, 
      rmAttr, rmChild, rmClass, scrollToElem, select, selectAll, 
      setAttr, setHtml, setStyles, setText, show, siblings, submit, 
      toggleAttr, toggleClass, trigger, value
    ))
  })

  afterAll(async () => {
    await chromeless.end()
    return true
  })

  it('Should add a class to the body element', async () => {
    const result = await chromeless.evaluate(() => {
      const { addClass } = window.query
      const body = document.querySelector('body')
      addClass('newClass')(body)
      return body.classList.contains('newClass')
    })
    expect(result).toBeTruthy()
  })

  it('Should convert a string and append the element to the body', async () => {
    const result = await chromeless.evaluate(() => {
      const { appendHtml } = window.query
      const body = document.querySelector('body')
      appendHtml('<appendHtml></appendHtml>')(body)
      return !!document.querySelector('body appendHtml')
    })
    expect(result).toBeTruthy()
  })

  it('Should add element after the document selected', async () => {
    const result = await chromeless.evaluate(() => {
      const { after, appendHtml } = window.query
      const body = document.querySelector('body')
      appendHtml('<beforeElement></beforeElement>')(body)
      const element = document.querySelector('body beforeElement')
      after('<after></after>')(element)
      return document.querySelector('body after').previousElementSibling == element
    })
    expect(result).toBeTruthy()
  })

  it('Should toggle the selector class', async () => {
    const result = await chromeless.evaluate(() => {
      const { toggleClass } = window.query
      const body = document.querySelector('body')
      toggleClass('active')(body)
      return body.classList.contains('active')
    })
    expect(result).toBeTruthy()
  })

  it('Should toggle attribute', async () => {
    const result = await chromeless.evaluate(() => {
      const { toggleAttr } = window.query
      const body = document.querySelector('body')
      toggleAttr('attribute')(body)
      return body.hasAttribute('attribute')
    })
    expect(result).toBeTruthy()
  })

  it('Should add element as child to the selected document', async () => {
    const result = await chromeless.evaluate(() => {
      const { append } = window.query
      const div = document.createElement('append') 
      const body = document.querySelector('body')
      append(div)(body) 
      return document.querySelector('body append')
    })
    expect(result).toBeTruthy()
  })

  it('Should clone the element', async () => {
    const result = await chromeless.evaluate(() => {
      const { clone } = window.query
      const div = document.createElement('clone')
      const clonedElem = clone(div)
      return !!clonedElem
    })
    expect(result).toBeTruthy()
  })
  
  it('Should add element before of the document selected', async () => {
    const result = await chromeless.evaluate(() => {
      const { before, appendHtml } = window.query
      const body = document.querySelector('body')
      appendHtml('<afterElement></afterElement>')(body)

      const element = document.querySelector('body afterElement')
      before('<before></before>')(element)

      return document.querySelector('body before').nextElementSibling == element
    })
    expect(result).toBeTruthy()
  })

  it('Should add an animation', async () => {
    const result = await chromeless.evaluate(() => {
      const { animate } = window.query
      const div = document.createElement('animation')

      animate([
        { transform: 'translateY(0)' }, 
        { transform: 'translateY(100%)' }
      ],{ duration: 300 })(div)

      return !!div
    })
    expect(result).toBeTruthy()
  })

  it('Should get the closest element', async () => {
    const result = await chromeless.evaluate(() => {
      const { closest, append } = window.query

      const div = document.createElement('closest') 
      const body = document.querySelector('body')
      append(div)(body) 

      return div.closest('body') == closest('body')(div)
    })
    expect(result).toBeTruthy()
  })

  it('Should add a class an verify it contains the selector', async () => {
    const result = await chromeless.evaluate(() => {
      const { addClass, contains } = window.query
      const div = document.createElement('div')
      addClass('new-class')(div)
      return contains('new-class')(div)
    })
    expect(result).toBeTruthy()
  })

  it('Should aget the data set value', async () => {
    const result = await chromeless.evaluate(() => {
      const { dataset } = window.query
      const div = document.createElement('div')
      div.setAttribute('data-id', 'Identity')
      return dataset('id')(div) === 'Identity'
    })
    expect(result).toBeTruthy()
  })


  // dataset,
  // docFilter,
  // empty,
  // getAttr,
  // getHtml,
  // getStyle,
  // getText,
  // getViewPort,
  // hasClass,
  // hide,
  // last,
  // match,
  // nextSibling,
  // opacity,
  // outerHtml,
  // prepend,
  // prevSibling,
  // remove,
  // replaceHtml,
  // rmAttr,
  // rmChild,
  // rmClass,
  // scrollToElem,
  // select,
  // selectAll,
  // setAttr,
  // setHtml,
  // setStyles,
  // setText,
  // show,
  // siblings,
  // submit,

  // trigger,
  // value





})
