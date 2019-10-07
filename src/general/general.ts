import { fn, IBreakpoints } from '../types'
/**
 * 
 * Returns the type of the given object
 * @param {any} obj 
 * @returns {string} Type of the object
 */
export const type = (obj : any) : string => Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();

/**
 * Method to get the current date
 * @returns {number} the current Date object 
 */
export const now = () : number => Date.now()

/**
 *  Removes from the EventTarget an event listener previously 
 *  registered with EventTarget.addEventListener() 
 */
/**
 * 
 * @param {EventListenerOrEventListenerObject} handler
 * @param {string} eventName 
 * @param {Element} item 
 */
export const removeListener = 
  (handler : EventListenerOrEventListenerObject, eventName : string) : ((_ : Element) => void) =>
  (item: Element) : void => item.removeEventListener(eventName, handler)

/**
 * Sets up a function that will be called whenever the specified 
 * event is delivered to the target
 */
export const addListener = (handler: EventListenerOrEventListenerObject, eventName: string) => (item: Element) => item.addEventListener(eventName, handler)

/**
 * Way to run JavaScript code as soon as the page's DOM becomes safe to manipulate 
 */
export const isDocReady = (fn: fn) => (item = document) => item.readyState != 'loading' ? fn() : item.addEventListener('DOMContentLoaded', fn)

/**
 * Returns the length to the given array or string 
 */
export const count = (str: string) => str.length

/**
 * Refreshs/ changes the current page location
 */
export const goTo = (URL: string) => window.location.href = URL

/**
 * Covers a form into a string object ready to use
 */
export const serialize = (form: HTMLFormElement) => Array.from( new FormData(form), (e:any) => e.map(encodeURIComponent).join('=')).join('&')

/**
 * Returns the URL query string value 
 */
export const getQueryValue = (value: string) => (new URLSearchParams(window.location.search)).get(value)

/**
 * Returns if the current screen width size is valid for the device type given
 */
export const isDevice = (deviceType: string) => window.innerWidth <= ({ sm_phone: 320, md_phone: 480, lg_phone: 600, tablet: 800, laptop: 1024, desktop: 1280 })[deviceType]

/**
 * Screen width and height  
 */
export const screen = () => ({ width: window.innerWidth, height: window.innerHeight })

/**
 * Screen breakpoints commonly used
 */
export const breakpoints = () : IBreakpoints => ({
  sm_phone: 320,
  md_phone: 480,
  lg_phone: 600,
  tablet: 800,
  laptop: 1024,
  desktop: 1280,
})

/**
 * Convers a string object into a html document object
 */
export const toHTML = (str: string) => {
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = str
  return html.body.children
}

/**
 * Returns the element width and height
 */
export const getSize = (item: HTMLElement) => ({
  width: parseFloat(getComputedStyle(item, null).width.replace("px", "")),
  height :parseFloat(getComputedStyle(item, null).height.replace("px", ""))
})

/**
 * Returns the value to the query string parameter 
 * @param str 
 */
export const getQueryParams = (str = location.search) => decodeURIComponent(str).replace('?','').split('&').map(i => i.split('='))

/**
 * 
 * @param key 
 * @param value 
 */
export const setQueryParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key,value);
  window.history.replaceState('','', `${window.location.pathname}${url.search}`);
}

/**
 * 
 * @param key 
 */
export const rmQueryParam = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.replaceState('','', `${window.location.pathname}${url.search}`);
}

/**
 * Removes all query string parameters
 */
export const cleanQueryParams = () => window.history.replaceState('','', `${location.pathname}`)

/**
 * 
 * @param {Element} item 
 * @param {object} options 
 * Scrolls to a particular set of coordinates in the document.
 */
export const scrollToElem = (item : Element, options: any = { behavior: 'smooth', block: 'center' }) => item.scrollIntoView(options)