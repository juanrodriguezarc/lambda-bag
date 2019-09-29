import puppeteer from 'puppeteer'

// Please refer for more information: https://pptr.dev

export const testInBrowser = async ({ fn, options = {}, goTo, args, verbose = false }) => {
  // Initalize browser
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()

  // Go to page if is passed
  goTo ? page.goto(goTo) : undefined
  
  // Expose/send functions to be interpreted by the browser
  await page.exposeFunction("fn", fn )

  // Evaluate functions, finish browser process and return results
  const result = await page.evaluate((args) => window.fn(args), {...args})
  await page.close()
  return !verbose ? result : { ...result, ...{ fn, options , goTo, args, verbose } }
}