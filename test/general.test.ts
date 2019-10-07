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
} from "../src/general/general";

import { chromeless, localhost } from "./chromeless";

declare global {
  interface Window {
    general: any;
  }
}

describe("General browser functions", () => {

  const mapToFn = (...args) => args.map(fn => ` ${fn}`);

  beforeAll(async () => {
    await localhost.goto('https://127.0.0.1?foo=bar')

    await chromeless.evaluate(args => {
      eval(`window.general = {}`)
      
      for (var i = 0; i < args.length; i++) {
        const regex = /function\s(.*)\(/g;
        const match = regex.exec(args[i]);
        if(match)
          eval(`window.general['${match[1]}'] = ${args[i]}`)
      }

      return true;
    }, mapToFn(
      addListener, breakpoints, cleanQueryParams, count, 
      getQueryParams, getQueryValue, getSize, goTo, isDevice, 
      isDocReady, now, removeListener, rmQueryParam, 
      setQueryParam, toHTML, type
    ));

    // For location purposes
    await localhost.evaluate(args => {
      eval(`window.general = {}`)
      
      for (var i = 0; i < args.length; i++) {
        const regex = /function\s(.*)\(/g;
        const match = regex.exec(args[i]);
        if(match)
          eval(`window.general['${match[1]}'] = ${args[i]}`)
      }

      return true;
    }, mapToFn(
      addListener, breakpoints, cleanQueryParams, count, 
      getQueryParams, getQueryValue, getSize, goTo, isDevice, 
      isDocReady, now, removeListener, rmQueryParam, 
      setQueryParam, toHTML, type
    ));
  });

  afterAll(async () => {
    await localhost.end()
    await chromeless.end()
    return true
  });
    
  it("Should add the event listener", async () => {
    const result = await chromeless.evaluate(() => {
      const { addListener } = window.general
      const div = document.createElement('div')
      addListener(()=>{},'click')(div)
      return true
    })
    expect(result).toEqual(true)
  })

  it("Should return the size breakpoints", async () => {
    const result = await chromeless.evaluate(() => {
      const { breakpoints } = window.general
      return breakpoints()
    })

    const expected = {
      sm_phone: 320,
      md_phone: 480,
      lg_phone: 600,
      tablet: 800,
      laptop: 1024,
      desktop: 1280,
    }

    expect(result).toMatchObject(expected)
  })

  it("Should clean the query params", async () => {
    const result = await localhost.evaluate(() => {
      const { cleanQueryParams } = window.general
      cleanQueryParams()
      return window.location.search == ''
    })
    expect(result).toBeTruthy()
  })

  it("Should count the string length", async () => {
    const result = await chromeless.evaluate(() => {
      const { count } = window.general
      return 'foo'.length == count('foo')
    })
    expect(result).toEqual(true)
  })

  it("Should get all query params", async () => {
    const result = await localhost.evaluate(() => {
      const { getQueryParams, setQueryParam } = window.general
      setQueryParam('foo', 'bar')
      setQueryParam('foo2', 'bar2')      
      return getQueryParams()
    })

    const [[k1,v1],[k2,v2]] = result
    const res = ({ k1, k2, v1, v2}) 
    const expected = {
      k1: 'foo',
      k2: 'foo2',
      v1: 'bar',
      v2: 'bar2',
    }
    expect(expected).toMatchObject(res)

  })

  it("Should get query parameter value", async () => {
    const result = await localhost.evaluate(() => {
      const {  setQueryParam, getQueryValue } = window.general
      setQueryParam('foo4', 'bar4')      
      return getQueryValue('foo4')
    })
    expect(result).toEqual('bar4')
  })

  it("Should get element size", async () => {
    const result = await chromeless.evaluate(() => {
      const { getSize } = window.general
      const body = document.querySelector('body')
      body.style.maxHeight = '50px'
      body.style.maxWidth = '50px'
      const { width, height } = getSize(body)
      return  width == 50 && height == 50
    })
    expect(result).toEqual(true)
  })

  it("Should return if the the screen size fits with the device", async () => {
    const result = await chromeless.evaluate(() => {
      const { isDevice, breakpoints } = window.general

      breakpoints()
      const sm_phone = isDevice('sm_phone')
      const md_phone = isDevice('md_phone')
      const tablet = isDevice('tablet')
      const lg_phone = isDevice('lg_phone')
      const laptop = isDevice('laptop')
      const desktop = isDevice('desktop')

      return ({ sm_phone, md_phone, tablet, lg_phone, laptop, desktop })

    })

    expect(!!result).toBeTruthy()
  })

  it("Should call the function when the doc is ready", async () => {
    const result = await chromeless.evaluate(() => {
      const {  isDocReady } = window.general
      isDocReady(()=>{ })()
      return true
    })
    expect(result).toEqual(true)
  })

  it("Should return the current time", async () => {
    const result = await chromeless.evaluate(() => {
      const { now } = window.general
      return !!(new Date(now()))
    })
    expect(result).toEqual(true)
  })

  it("Should remove event listener", async () => {
    const result = await chromeless.evaluate(() => {
      const { addListener, removeListener } = window.general
      const div = document.createElement('div')
      const handler =  ()=> ({})
      addListener(handler,'click')(div)
      removeListener(handler,'click')(div)
      return true
    })
    expect(result).toEqual(true)
  })

  it("Should remove the query param", async () => {
    const result = await localhost.evaluate(() => {
      const {  setQueryParam, rmQueryParam, getQueryValue } = window.general
      setQueryParam('foo6', 'bar6')    
      rmQueryParam('foo6', 'bar6')    
      return getQueryValue('foo6')
    })
    expect(result).toEqual(null)
  })

  it("Should set the query param", async () => {
    const result = await localhost.evaluate(() => {
      const {  setQueryParam, getQueryValue } = window.general
      setQueryParam('foo3', 'bar3')      
      return getQueryValue('foo3')
    })
    expect(result).toEqual('bar3')
  })

  it("Should conver a string into a node (HTMLCollection)", async () => {
    const result = await chromeless.evaluate(() => {
      const { toHTML } = window.general
      return !!toHTML(`<div foo>bar</div>`)[0]
    })
    expect(result).toEqual(true)
  })

  it("Should return the object type", async () => {
    const result = await chromeless.evaluate(() => {
      const { type } = window.general
     const _null = type(null)
     const _undefined = type(undefined)
     const _number = type(1)
     const _float = type(1.4)
     const _string = type('foo')
     return ({ _null, _undefined, _number, _float, _string })
    })

    const expected = {
      _null: 'null',
      _undefined: 'undefined',
      _number: 'number',
      _float: 'number',
      _string: 'string',
    }

    expect(result).toMatchObject(expected)

  })

  it("Should change page location", async () => {
    const result = await localhost.evaluate(() => {
      const { goTo } = window.general
      goTo('https://127.0.0.1')
      return !!window.location
    })
    expect(result).toEqual(true)
  })
    
});
