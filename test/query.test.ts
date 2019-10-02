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

      console.log({ window }, 't233est')

      return true
    }, mapToFn(
      addClass, after, animate, append, appendHtml, before, 
      clone, closest, contains, dataset, filterElements, empty, 
      getAttr, getHtml, getStyle, getText, getViewPort, 
      hasClass, hide, last, match, nextSibling, opacity, 
      outerHtml, prepend, prevSibling, remove, replaceHtml, 
      rmAttr, rmChild, rmClass, scrollToElem, select, selectAll, 
      setAttr, setHtml, setStyles, setText, show, siblings, submit, 
      toggleAttr, toggleClass, trigger, value
    ))
  })

  afterAll(async () => {
    // await chromeless.end()
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

  it('Should get the dataset value', async () => {
    const result = await chromeless.evaluate(() => {
      const { dataset } = window.query
      const div = document.createElement('div')
      div.setAttribute('data-id', 'Identity')
      return dataset('id')(div) === 'Identity'
    })
    expect(result).toBeTruthy()
  })

  it('Should filter elements by the dataset value', async () => {
    const result = await chromeless.evaluate(() => {
      const { dataset, append, filterElements } = window.query

      const elements = Array.from({ length: 10 }, (_, i) => i)
      const parent = document.querySelector('body')

      elements.map(_ => {
        const num = Math.floor(Math.random() * 10)
        const div = document.createElement('div')
        div.setAttribute('data-filter', `${num}`)
        append(div)(parent)
      })


      const moreThanFive = (item) => +dataset('filter')(item) > 5
      const filterResult = filterElements(moreThanFive)('div')()
      const result = filterResult.reduce((acc, elem) => acc = acc && +dataset('filter')(elem) > 5, true)

      return result
      
    })
    expect(result).toBeTruthy()
  })

  //@InProgress
  it("Should addClass", async () => {
    const result = await chromeless.evaluate(() => { 
      const { addClass } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should after", async () => {
    const result = await chromeless.evaluate(() => { 
      const { after } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should animate", async () => {
    const result = await chromeless.evaluate(() => { 
      const { animate } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should append", async () => {
    const result = await chromeless.evaluate(() => { 
      const { append } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should appendHtml", async () => {
    const result = await chromeless.evaluate(() => { 
      const { appendHtml } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should before", async () => {
    const result = await chromeless.evaluate(() => { 
      const { before } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should clone", async () => {
    const result = await chromeless.evaluate(() => { 
      const { clone } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should closest", async () => {
    const result = await chromeless.evaluate(() => { 
      const { closest } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should contains", async () => {
    const result = await chromeless.evaluate(() => { 
      const { contains } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should dataset", async () => {
    const result = await chromeless.evaluate(() => { 
      const { dataset } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should filterElements", async () => {
    const result = await chromeless.evaluate(() => { 
      const { filterElements } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should empty", async () => {
    const result = await chromeless.evaluate(() => { 
      const { empty } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should getAttr", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getAttr } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should getHtml", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getHtml } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should getStyle", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getStyle } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should getText", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getText } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should getViewPort", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getViewPort } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should hasClass", async () => {
    const result = await chromeless.evaluate(() => { 
      const { hasClass } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should hide", async () => {
    const result = await chromeless.evaluate(() => { 
      const { hide } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should last", async () => {
    const result = await chromeless.evaluate(() => { 
      const { last } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should match", async () => {
    const result = await chromeless.evaluate(() => { 
      const { match } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should nextSibling", async () => {
    const result = await chromeless.evaluate(() => { 
      const { nextSibling } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should opacity", async () => {
    const result = await chromeless.evaluate(() => { 
      const { opacity } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should outerHtml", async () => {
    const result = await chromeless.evaluate(() => { 
      const { outerHtml } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should prepend", async () => {
    const result = await chromeless.evaluate(() => { 
      const { prepend } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should prevSibling", async () => {
    const result = await chromeless.evaluate(() => { 
      const { prevSibling } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should remove", async () => {
    const result = await chromeless.evaluate(() => { 
      const { remove } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should replaceHtml", async () => {
    const result = await chromeless.evaluate(() => { 
      const { replaceHtml } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should rmAttr", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmAttr } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should rmChild", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmChild } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should rmClass", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmClass } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should scrollToElem", async () => {
    const result = await chromeless.evaluate(() => { 
      const { scrollToElem } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should select", async () => {
    const result = await chromeless.evaluate(() => { 
      const { select } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should selectAll", async () => {
    const result = await chromeless.evaluate(() => { 
      const { selectAll } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should setAttr", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setAttr } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should setHtml", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setHtml } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should setStyles", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setStyles } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should setText", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setText } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should show", async () => {
    const result = await chromeless.evaluate(() => { 
      const { show } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should siblings", async () => {
    const result = await chromeless.evaluate(() => { 
      const { siblings } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should submit", async () => {
    const result = await chromeless.evaluate(() => { 
      const { submit } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should toggleAttr", async () => {
    const result = await chromeless.evaluate(() => { 
      const { toggleAttr } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should toggleClass", async () => {
    const result = await chromeless.evaluate(() => { 
      const { toggleClass } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should trigger", async () => {
    const result = await chromeless.evaluate(() => { 
      const { trigger } = window.query
    })
    expect(true).toEqual(true)
  })
  //@InProgress
  it("Should value", async () => {
    const result = await chromeless.evaluate(() => { 
      const { value } = window.query
    })
    expect(true).toEqual(true)
  })





})
