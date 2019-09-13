/**
 * 
 * Returns the type of the given object
 * @param {object} obj 
 * @returns {string} Type of the object
 */
export const type = (obj ) => Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();

/**
 * Method to get the current date
 * @returns {number} the current Date object 
 */
export const now = () : number => Date.now()

/**
 *  Removes from the EventTarget an event listener previously 
 *  registered with EventTarget.addEventListener() 
 */
export const removeListener = (handler, eventName) => (item) => item.removeEventListener(eventName, handler)

/**
 * Sets up a function that will be called whenever the specified 
 * event is delivered to the target
 */
export const addListener = (handler, eventName) => (item) => item.addEventListener(eventName, handler)

/**
 * Way to run JavaScript code as soon as the page's DOM becomes safe to manipulate 
 */
export const isDocReady = (fn) => (item = document) => item.readyState != 'loading' ? fn() : item.addEventListener('DOMContentLoaded', fn)

/**
 * Returns the length to the given array or string 
 */
export const count = (str) => str.length

/**
 * Refreshs/ changes the current page location
 */
export const goTo = (URL) => window.location.href = URL

/**
 * Covers a form into a string object ready to use
 */
export const serialize = (form) => Array.from( new FormData(form), e => e.map(encodeURIComponent).join('=')).join('&')

/**
 * Returns the URL query string value 
 */
export const getQueryValue = (value) => (new URLSearchParams(window.location.search)).get(value)

/**
 * Returns if the current screen width size is valid for the device type given
 */
export const isDevice = (deviceType) => window.innerWidth <= breakpoints[deviceType]

/**
 * Screen width and height  
 */
export const screen = () => ({ width: window.innerWidth, height: window.innerHeight })

/**
 * Screen breakpoints commonly used
 */
export const breakpoints = {
  sm_phone: 320,
  md_phone: 480,
  lg_phone: 600,
  tablet: 801,
  laptop: 1025,
  desktop: 1281,
}

/**
 * Convers a string object into a html document object
 */
export const toHTML = (str) => {
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = str
  return html.body.children
}

/**
 * Returns the element width and height
 */
export const getSize = (item) => ({
  width: parseFloat(getComputedStyle(item, null).width.replace("px", "")),
  height :parseFloat(getComputedStyle(item, null).height.replace("px", ""))
})

export const getQueryParams = (str = location.search) => decodeURIComponent(str).replace('?','').split('&').map(i => i.split('='))

export const setQueryParam = (key,value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key,value);
  window.history.replaceState('','', `${window.location.pathname}${url.search}`);
}

export const rmQueryParam = (key) => {
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
export const scrollToElem = (item, options = { behavior: 'smooth', block: 'center' }) => item.scrollIntoView(options)