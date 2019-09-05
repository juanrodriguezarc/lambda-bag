import puppeteer from 'puppeteer'

export const testInBrowser = async ({ fn, options = {}, goTo, args, verbose = false }) => {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  goTo ? page.goto(goTo) : undefined
  await page.exposeFunction("fn", fn )
  const result = await page.evaluate((args) => window.fn(args), {...args})


  await page.close()

  return !verbose ? result : { ...result, ...{ fn, options , goTo, args, verbose } }
}