import { chromeless } from './jest.setup' 

declare global {
  interface Window {
    lambda: any;
  }
}

describe('General DOM functions', () => {

  it('Should add a class to the body element', async () => {
    const result = await chromeless.evaluate(() => {
      const { addClass } = window.lambda
      const body = document.querySelector('body')
      addClass('newClass')(body)
      return body.classList.contains('newClass')
    })
    expect(result).toBeTruthy()
  })

  it('Should convert a string and append the element to the body', async () => {
    const result = await chromeless.evaluate(() => {
      const { appendHtml } = window.lambda
      const body = document.querySelector('body')
      appendHtml('<appendHtml></appendHtml>')(body)
      return !!document.querySelector('body appendHtml')
    })
    expect(result).toBeTruthy()
  })

  it('Should add element after the document selected', async () => {
    const result = await chromeless.evaluate(() => {
      const { after, appendHtml } = window.lambda
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
      const { toggleClass } = window.lambda
      const body = document.querySelector('body')
      toggleClass('active')(body)
      return body.classList.contains('active')
    })
    expect(result).toBeTruthy()
  })

  it('Should toggle attribute', async () => {
    const result = await chromeless.evaluate(() => {
      const { toggleAttr } = window.lambda
      const body = document.querySelector('body')
      toggleAttr('attribute')(body)
      return body.hasAttribute('attribute')
    })
    expect(result).toBeTruthy()
  })

  it('Should add element as child to the selected document', async () => {
    const result = await chromeless.evaluate(() => {
      const { append } = window.lambda
      const div = document.createElement('append') 
      const body = document.querySelector('body')
      append(div)(body) 
      return document.querySelector('body append')
    })
    expect(result).toBeTruthy()
  })

  it('Should clone the element', async () => {
    const result = await chromeless.evaluate(() => {
      const { clone } = window.lambda
      const div = document.createElement('clone')
      const clonedElem = clone(div)
      return !!clonedElem
    })
    expect(result).toBeTruthy()
  })
  
  it('Should add element before of the document selected', async () => {
    const result = await chromeless.evaluate(() => {
      const { before, appendHtml } = window.lambda
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
      const { animate } = window.lambda
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
      const { closest, append } = window.lambda

      const div = document.createElement('closest') 
      const body = document.querySelector('body')
      append(div)(body) 

      return div.closest('body') == closest('body')(div)
    })
    expect(result).toBeTruthy()
  })

  it('Should add a class an verify it contains the selector', async () => {
    const result = await chromeless.evaluate(() => {
      const { addClass } = window.lambda
      const div = document.createElement('div')
      addClass('new-class')(div)
      return div.classList.contains('new-class')
    })
    expect(result).toBeTruthy()
  })

  it('Should get the dataset value', async () => {
    const result = await chromeless.evaluate(() => {
      const { dataset } = window.lambda
      const div = document.createElement('div')
      div.setAttribute('data-id', 'Identity')
      return dataset('id')(div) === 'Identity'
    })
    expect(result).toBeTruthy()
  })

  it('Should filter elements by the dataset value', async () => {
    const result = await chromeless.evaluate(() => {
      const { dataset, append, filterElements } = window.lambda

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

  it("Should add the selector class", async () => {
    const result = await chromeless.evaluate(() => { 
      const { addClass } = window.lambda
      const div = document.createElement('div')
      addClass('test')(div)
      return div.classList.contains('test')
    })
    expect(result).toEqual(true)
  })

  it("Should append an item to the parent container", async () => {
    const result = await chromeless.evaluate(() => { 
      const { append } = window.lambda
      const container = document.createElement('container')
      const div = document.createElement('div')
      append(div)(container)
      return container.hasChildNodes()
    })
    expect(result).toEqual(true)
  })

  it("Should return if the elements contains the child", async () => {
    const result = await chromeless.evaluate(() => { 
      const { contains } = window.lambda
      
      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      container.appendChild(div1)
      
      return contains(div1)(container)
    })
    expect(result).toEqual(true)
  })

  it("Should remove the inner html", async () => {
    const result = await chromeless.evaluate(() => { 
      const { empty } = window.lambda
      const item = document.createElement('container')
      empty(item)
      return item.innerHTML == ''
    })
    expect(result).toEqual(true)
  })

  it("Should return the attribute value", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getAttr } = window.lambda
      const item = document.createElement('div')
      item.setAttribute("foo", "bar")
      return getAttr('foo')(item) == 'bar'
    })
    expect(result).toEqual(true)
  })
  
  it("Should get the element html string", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getHtml, select } = window.lambda
      const item = select('body')()
      return item.innerHTML == getHtml(item)
    })
    expect(result).toEqual(true)
  })
  
  it("Should returns the style value", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getStyle } = window.lambda
      const body =  document.querySelector('body')
      return getStyle('display')(body) == 'block'
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the object text", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getText } = window.lambda
      const item = document.createElement('div')
      return item.textContent == getText(item)
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the element viewPort", async () => {
    const result = await chromeless.evaluate(() => { 
      const { getViewPort } = window.lambda
      const body =  document.querySelector('body')
      return !!getViewPort(body)
    })
    expect(result).toEqual(true)
  })

  it("Should return if the element has the class", async () => {
    const result = await chromeless.evaluate(() => { 
      const { hasClass, addClass } = window.lambda
      const item = document.createElement('div')
      addClass('test')(item)
      return hasClass('test')(item)
    })
    expect(result).toEqual(true)
  })

  it("Should change the display status", async () => {
    const result = await chromeless.evaluate(() => { 
      const { hide } = window.lambda
      const div = document.createElement('div')
      hide(div)
      return div.style.display == 'none'
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the last element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { last } = window.lambda
      const container = document.createElement('container')
      const div1 = document.createElement('div')
      const div2 = document.createElement('div')
      const div3 = document.createElement('div')
      div3.setAttribute('last','true')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)

      return !!last('div')(container).getAttribute('last')
    })
    expect(result).toEqual(true)
  })

  it("Should return if the elements match", async () => {
    const result = await chromeless.evaluate(() => { 
      const { match } = window.lambda
      const body1 =  document.querySelector('body')
      const body2 =  document.querySelector('body')
      return match(body1)(body2)
    })
    expect(result).toEqual(true)
  })
  
  it("Should return next sibling", async () => {
    const result = await chromeless.evaluate(() => { 
      const { nextSibling } = window.lambda

      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)

      return div3 == nextSibling(div2)

    })
    expect(result).toEqual(true)
  })

  it("Should change the element pacity", async () => {
    const result = await chromeless.evaluate(() => { 
      const { opacity } = window.lambda
      const div = document.createElement('div')
      opacity(0.4)(div)
      return div.style.opacity == '0.4'
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the outer html", async () => {
    const result = await chromeless.evaluate(() => { 
      const { outerHtml } = window.lambda

      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)

      return outerHtml(container) == container.outerHTML

    })
    expect(result).toEqual(true)
  })
  
  it("Should insert the element at the first postion", async () => {
    const result = await chromeless.evaluate(() => { 
      const { prepend } = window.lambda

      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')
      const foo = document.createElement('foo')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)
      container.appendChild(foo)

    
      prepend(container)(foo)

      return container.firstElementChild == foo

    })
    expect(result).toEqual(true)
  })
  
  it("Should return the previous sibling", async () => {
    const result = await chromeless.evaluate(() => { 
      const { prevSibling } = window.lambda

      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)

      return div1 == prevSibling(div2)
    })
    expect(result).toEqual(true)
  })
  
  it("Should remove the inner element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { remove } = window.lambda
      const container = document.createElement('container')
      const div = document.createElement('div')
      container.appendChild(div)
      remove(div)
      return !container.firstElementChild
    })
    expect(result).toEqual(true)
  })

  it("Should replace outer html", async () => {
    const result = await chromeless.evaluate(() => { 
      const { replaceHtml } = window.lambda
      const container = document.createElement('container')
      const div = document.createElement('div')
      container.appendChild(div)
      const html = '<outerHTML>foo</outerHTML>'
      replaceHtml(html)(div)
      return container.firstElementChild.matches('outerHTML')
    })
    expect(result).toEqual(true)
  })

  it("Should remove the element attribute", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmAttr } = window.lambda
      const div = document.createElement('div')
      div.setAttribute('foo', 'bar')
      rmAttr('foo')(div)
      return !div.getAttribute('foo')
    })
    expect(result).toEqual(true)
  })
  
  it("Should remove the child element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmChild } = window.lambda

      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)

      rmChild(div2)

      return !container.querySelector('div2')

    })
    expect(result).toEqual(true)
  })

  it("Should remove the class selector", async () => {
    const result = await chromeless.evaluate(() => { 
      const { rmClass } = window.lambda
      const div = document.createElement('div')
      div.classList.add('foo')
      rmClass('foo')(div)
      return !div.classList.contains('foo')
    })
    expect(result).toEqual(true)
  })

  it("Should scrollToElem", async () => {
    const result = await chromeless.evaluate(() => { 
      const { scrollToElem } = window.lambda
      const div = document.querySelector('div')
      scrollToElem(div)
      return true
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the selected element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { select } = window.lambda
      return !!select('body')()
    })
    expect(result).toEqual(true)
  })

  it("Should select all elements that match with the given query", async () => {
    const result = await chromeless.evaluate(() => { 
      const { selectAll } = window.lambda
      return selectAll('div')().length > 0
    })
    expect(result).toEqual(true)
  })
  
  it("Should set the element attribute", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setAttr } = window.lambda
      const div = document.createElement('div')
      setAttr('foo', 'bar')(div)
      return div.getAttribute('foo') == 'bar'
    })
    expect(result).toEqual(true)
  })
  
  it("Should set the html content", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setHtml } = window.lambda
      const item = document.createElement('div')
      const html = `<div>TEST</div>`
      setHtml(html)(item)

      return item.innerHTML == html
    })
    expect(result).toEqual(true)
  })
  
  it("Should set styles element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setStyles } = window.lambda
      const div = document.createElement('div')
      setStyles({ display: 'none' })(div)
      return div.style.display == 'none'
    })
    expect(result).toEqual(true)
  })
  
  it("Should set text element", async () => {
    const result = await chromeless.evaluate(() => { 
      const { setText } = window.lambda
      const div = document.createElement('div')
      setText('test')(div)
      return div.innerText == 'test'
    })
    expect(result).toEqual(true)
  })

  it("Should change the state to show", async () => {
    const result = await chromeless.evaluate(() => { 
      const { show } = window.lambda
      const div = document.createElement('div')
      show(div)
      return div.style.display == ''
    })
    expect(result).toEqual(true)
  })
  
  it("Should return the siblings", async () => {
    const result = await chromeless.evaluate(() => { 
      const { siblings } = window.lambda
      const container = document.createElement('container')
      const div1 = document.createElement('div1')
      const div2 = document.createElement('div2')
      const div3 = document.createElement('div3')
      const div4 = document.createElement('div4')

      container.appendChild(div1)
      container.appendChild(div2)
      container.appendChild(div3)
      container.appendChild(div4)

      const result = siblings(div3)
      return result[0].matches('div1') && result[1].matches('div2') && result[2].matches('div4')
      
    })
    expect(result).toEqual(true)
  })

  it("Should dispatch the submit event", async () => {
    const result = await chromeless.evaluate(() => { 
      const { submit } = window.lambda
      const form = document.createElement('form')
      submit(form)
      return true
    })
    expect(result).toEqual(true)
  })

  it("Should toggle the attribute", async () => {
    const result = await chromeless.evaluate(() => { 
      const { toggleAttr } = window.lambda
      const div = document.createElement('div')
      toggleAttr('test')(div)
      const withAtrr = div.hasAttribute('test')
      toggleAttr('test')(div)
      const withoutAtrr = !div.hasAttribute('test')
      return withAtrr && withoutAtrr
    })
    expect(result).toEqual(true)
  })

  it("Should toggle the class selector", async () => { 
    const result = await chromeless.evaluate(() => { 
      const { toggleClass } = window.lambda
      const div = document.createElement('div')
      toggleClass('test')(div)
      const withClass = div.classList.contains('test')
      toggleClass('test')(div)
      const withoutClass = !div.classList.contains('test')
      return withClass && withoutClass
    })

    expect(result).toEqual(true)
  })
  
  it("Should add/dispatch the event trigger", async () => {
    const result = await chromeless.evaluate(() => { 
      const { trigger  } = window.lambda
      const div = document.createElement('div')      
      return trigger('click')(div)
    })
    expect(result).toEqual(true)
  })
  
  it("Should get the input value", async () => {
    const result = await chromeless.evaluate(() => { 
      const { value, setAttr } = window.lambda
      const input = document.createElement('input')
      setAttr('value','5')(input)
      return value()(input) == '5'
    })
    expect(result).toEqual(true)
  })

})
