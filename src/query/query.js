

/**  General DOM functions
  Use these functions to select, handle html elements (similar to jQuery)
*/

/**
 * Returns a static (not live) NodeList representing a list of the document's 
 * elements that match the specified group of selectors.
*/
export const selectAll = (query) =>  (item = document) =>  [...item.querySelectorAll(query)]

/**
 * Returns the first Element within the document that matches the specified selector, 
 * or group of selectors. If no matches are found, null is returned.
 */
export const select = (query) => (item = document) => item.querySelector(query)

/** 
 * Returns a Boolean value indicating whether a class is a present of a specified node.
*/
export const hasClass = (tag) => (item) => item.classList.contains(tag)

/**
 * Returns a Boolean value indicating whether a node is a descendant of a specified node.
*/
export const contains = (tag) => (item) => item.classList.contains(tag)

/**
 * Returns the element immediately following the specified element, in the same tree level.
 */
export const nextSibling = (item) => item.nextElementSibling

/** * Returns the previous element of the specified element, in the same tree level.
*/
export const prevSibling = (item) => item.previousElementSibling

/** * Traverses parents (heading toward the document root) of the Element until
 * it finds a node that matches the provided selectorString. Will return itself or the
 * matching ancestor. If no such element exists, it returns null.
*/
export const closest = (item) => (query) => item.closest(query)

/** * Returns the value of a specified attribute on the element 
 */
export const getAttr = (attr) => (item) => item.getAttribute(attr)

/** * method submits the form 
*/
export const submit = (item) => item.submit(item)

// ---  SETTERS --- // ---  SETTERS --- // ---  SETTERS --- // ---  SETTERS --- // ---  SETTERS --- // ---  SETTERS --- 

/** * Removes the attribute from the element.
 */
export const rmAttr = (attr) => (item) => item.removeAttribute(attr)

/** * Removes the class with the from the element.
 */
export const rmClass = (cls) => (item) => item.classList.remove(cls)

export const addClass = (cls) => (item) => item.classList.add(cls)

/** * Removes a child node from the DOM and returns the removed node.
*/
export const rmChild = (item) => item.parentNode.removeChild(item)

/** * Removes the object from the tree it belongs to.
*/
export const remove = (item) => item.remove(item)


///////---------
///////---------
///////---------
///////---------
///////---------
///////---------

//TODO: Add documentation
export const value =  (query) => (item = document) => item.querySelector(query).value

//TODO: Add documentation
export const dataset = (dataKey) => ({ dataset }) => dataset[dataKey]


export const toggleAttr = (item, attr) => item.toggleAttribute(attr)

export const setAttr = (attr, value) => (item) => item.setAttribute(attr, value)

export const toggleClass = (item, cls) => item.classList.toggle(cls)

export const setText = (item) => (text) => item.innerText = text

export const setHtml = (item) => (html) => item.innerHTML = html

export const animate = (keyframes, options) => (item) => item.animate(keyframes,options)

export const appendHtml = (item) => (html, option = 'beforeend') => item.insertAdjacentHTML(option,html)

export const opacity = (value) => (item) => item.style.opacity = `${value}`

export const setStyles = (styles) => (item) => item.setAttribute("style", Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(' '))

export const show = (item) => item.style.display = ''

export const hide = (item) => item.style.display = 'none'

export const after = (html) => (item) => item.insertAdjacentHTML('afterend', html)

export const append = (child) => (item) => item.appendChild(child)

export const before = (html) => (item) => item.insertAdjacentHTML('beforebegin', html);

export const clone = (item) => item.cloneNode(true)

export const empty = (item) => item.innerHTML = ''

export const docFilter = (fn) => (item = document) => selectAll(query)(item).filter(fn)

export const outerHtml = (item) => item.outerHTML

export const getStyle = (styleKey) => (item) => getComputedStyle(item)[styleKey]

export const getText = (item) => item.textContent

export const match = (other) => (item) => item === other

export const screen = { width: window.innerWidth, height: window.innerHeight }

export const prepend = (item) => item.insertBefore(el, parent.firstChild)

export const getViewPort = (item) => item.getBoundingClientRect()

export const replaceHtml = (str) => (item) => item.outerHTML = str

export const siblings = (item) => [...item.parentNode.children].filter((child) => child !== item)

/**  General purpose functions
  Use these functions to apply certain operation in your context
*/
export const type = Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();

export const now = Date.now()

export const removeListener = (handler, eventName) => (item) => item.removeEventListener(eventName, handler)

export const addListener = (handler, eventName) => (item) => item.addEventListener(eventName, handler)

export const isDocReady = (fn) => (item = document) => item.readyState != 'loading' ? fn() : item.addEventListener('DOMContentLoaded', fn)

export const count = (str) => str.length

export const goTo = (URL) => window.location.href = URL

export const serialize = (form) => Array.from( new FormData(form), e => e.map(encodeURIComponent).join('=')).join('&')

export const getQueryValue = (value) => (new URLSearchParams(window.location.search)).get(value)

export const isDevice = (deviceType) => window.innerWidth <= breakpoints[deviceType]

export const breakpoints = {
  sm_phone: 320,
  md_phone: 480,
  lg_phone: 600,
  tablet: 801,
  laptop: 1025,
  desktop: 1281,
}

export const trigger = (eName) => (item) => {
  const event = document.createEvent('Event')
  event.initEvent(eName, true, false)
  return item.dispatchEvent(event)
}

export const toHTML = (str) => {
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = str
  return html.body.children
}

export const getSize = (item) => ({
  width: parseFloat(getComputedStyle(item, null).width.replace("px", "")),
  height :parseFloat(getComputedStyle(item, null).height.replace("px", ""))
})