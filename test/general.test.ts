/* eslint-disable no-undef */
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
  serialize,
  setQueryParam,
  toHTML,
  type
} from "../src/general";

import { chromeless } from "./index";

describe("General browser functions", () => {

  
  const mapToFn = (...args) => args.map(fn => ` ${fn}`);

  beforeAll(async () => {
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
      serialize, setQueryParam, toHTML, type
    ));
  });

  afterAll(async () => {
    // await chromeless.end();
    return true
  });
    
  //@InProgress
  it("Should addListener", async () => {
    const result = await chromeless.evaluate(() => {
      const { addListener } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should breakpoints", async () => {
    const result = await chromeless.evaluate(() => {
      const { breakpoints } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should cleanQueryParams", async () => {
    const result = await chromeless.evaluate(() => {
      const { cleanQueryParams } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should count", async () => {
    const result = await chromeless.evaluate(() => {
      const { count } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should getQueryParams", async () => {
    const result = await chromeless.evaluate(() => {
      const { getQueryParams } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should getQueryValue", async () => {
    const result = await chromeless.evaluate(() => {
      const { getQueryValue } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should getSize", async () => {
    const result = await chromeless.evaluate(() => {
      const { getSize } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should goTo", async () => {
    const result = await chromeless.evaluate(() => {
      const { goTo } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should isDevice", async () => {
    const result = await chromeless.evaluate(() => {
      const { isDevice } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should isDocReady", async () => {
    const result = await chromeless.evaluate(() => {
      const { isDocReady } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should now", async () => {
    const result = await chromeless.evaluate(() => {
      const { now } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should removeListener", async () => {
    const result = await chromeless.evaluate(() => {
      const { removeListener } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should rmQueryParam", async () => {
    const result = await chromeless.evaluate(() => {
      const { rmQueryParam } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should serialize", async () => {
    const result = await chromeless.evaluate(() => {
      const { serialize } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should setQueryParam", async () => {
    const result = await chromeless.evaluate(() => {
      const { setQueryParam } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should toHTML", async () => {
    const result = await chromeless.evaluate(() => {
      const { toHTML } = window.general
    })
    expect(true).toEqual(true)
  })

  //@InProgress
  it("Should type", async () => {
    const result = await chromeless.evaluate(() => {
      const { type } = window.general
    })
    expect(true).toEqual(true)
  })
    
});
