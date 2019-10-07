import { fn, doc } from './types'
/**
 * Returns a static (not live) NodeList representing a list of the document's 
 * elements that match the specified group of selectors.
 * @param {string} query String must be a valid CSS selector string
*/
export const selectAll = (query: string) =>  (item: Document = document)  =>  Array.from(item.querySelectorAll(query))

/**
 * Returns the first Element within the document that matches the specified selector, 
 * or group of selectors. If no matches are found, null is returned.
 * @param {string} query String must be a valid CSS selector string
 */
export const select = (query: string) => (item = document) : doc => item.querySelector(query)

/**
 * Returns the last Element within the document that matches the specified selector, 
 * or group of selectors. If no matches are found, null is returned.
 * @param {string} query String must be a valid CSS selector string
 */
export const last = (query: string) => (item = document) =>  Array.from(item.querySelectorAll(query)).slice(-1)[0]

/** 
 * Returns a Boolean value indicating whether a class is a present of a specified node.
*/
export const hasClass = (tag: string) => (item: Element) => item.classList.contains(tag)

/**
 * Returns a Boolean value indicating whether a node is a descendant of a specified node.
*/
export const contains = (child: Element) => (item: Element) => item.contains(child)

/**
 * Returns the element immediately following the specified element, in the same tree level.
 */
export const nextSibling = (item: Element) => item.nextElementSibling

/** 
 * Returns the previous element of the specified element, in the same tree level.
*/
export const prevSibling = (item: Element) => item.previousElementSibling

/** 
 * Traverses parents (heading toward the document root) of the Element until
 * it finds a node that matches the provided selectorString. Will return itself or the
 * matching ancestor. If no such element exists, it returns null.
 * @param {string} query String must be a valid CSS selector string
*/
export const closest = (query: string) => (item: Element) => item.closest(query)

/**
 * Returns the value of a specified attribute on the element 
 */
export const getAttr = (attr: string) => (item: Element) => item.getAttribute(attr)

/** 
 * Submits a form object
*/
export const submit = (item: HTMLFormElement) => item.submit()

/** 
 * Removes the attribute from the element.
 */
export const rmAttr = (attr: string) => (item: Element) => item.removeAttribute(attr)

/**
 * Removes the class with the from the element.
 */
export const rmClass = (cls: string) => (item: Element) => item.classList.remove(cls)

/**
 * Adds the class with the from the element.
 */
export const addClass = (cls: string) => (item: Element) => item.classList.add(cls)

/** 
 * Removes a child node from the DOM and returns the removed node.
*/
export const rmChild = (item: any ) => item.parentNode.removeChild(item)

/** 
 * Removes the object from the tree it belongs to.
*/
export const remove = (item: Element) => item.remove()

/** 
 * Returns the inner value of the selected element
 * @param {string} query String must be a valid CSS selector string
*/
export const value =  (query?: string) => (item: any = document) => query ? item.querySelector(query).value : item.value

/** 
 * Returns the data set attr-value of the selected element
*/
export const dataset = (dataKey: string) => ({ dataset } : HTMLElement) => dataset[dataKey]

/**
 *  Toggles a Boolean attribute (removing it if it is present and 
 * adding it if it is not present) on the given element
 */
export const toggleAttr = (attr: string) =>  (item: Element) => item.toggleAttribute(attr)

/**
 * Sets the value of an attribute on the specified element. 
 * If the attribute already exists, the value is updated; 
 * otherwise a new attribute is added with the specified name and value
 */
export const setAttr = (attr : string, value: string) => (item: Element) => item.setAttribute(attr, value)

/**
 * When only one argument is present: Toggle the class value; i.e., 
 * if the class exists then remove it and return false, if not, then add 
 * it and return true.
 */
export const toggleClass = (cls: string) => (item: Element) => item.classList.toggle(cls)

/**
 * Any child nodes are removed and replaced by a single Text node 
 * containing the specified string
 */
export const setText = (text : string) => (item: HTMLElement) =>  item.innerText = text

/**
 * Sets the HTML or XML markup contained within the element.
 */
export const setHtml = (html: string) => (item: Element) => item.innerHTML = html

/**
 * Gets the HTML or XML markup contained within the element.
 */
export const getHtml = (item: Element) => item.innerHTML

/**
 * Is a shortcut method which creates a new Animation, 
 * applies it to the element, then plays the animation. 
 * It returns the created Animation object instance.
 */
export const animate = (keyframes: any, options: any) => (item: Element) => item.animate(keyframes,options)

/**
 * Parses the specified text as HTML or XML and inserts the resulting 
 * nodes into the DOM tree at a end position.
 */
export const appendHtml = (html: string, option: InsertPosition = 'beforeend') => (item: Element) => item.insertAdjacentHTML(option,html)

/**
 * Changes the opacity to the given element
 */
export const opacity = (value: string) => (item: HTMLElement) => item.style.opacity = `${value}`

/**
 * Applies all styles using a JS object to the given element
 */
export const setStyles = (styles: object) => (item: Element) => item.setAttribute("style", Object.entries(styles).map((item) => `${item[0]}: ${item[1]};`).join(' '))

/**
 * Remove display style to the element
 */
export const show = (item: HTMLElement) => item.style.display = ''

/**
 * Applies display none style to the given element
 */
export const hide = (item: HTMLElement) => item.style.display = 'none'

/**
 * Inserts content, specified by the parameter, after each element in the set of matched elements.
 */
export const after = (html: string) => (item: Element) => item.insertAdjacentHTML('afterend', html)

/**
 *  Appends a node as the last child of a node.
 */
export const append = (child: Element) => (item: Element) => item.appendChild(child)

/**
 * Inserts content, specified by the parameter, before each element in the set of matched elements.
 */
export const before = (html: string) => (item: Element) => item.insertAdjacentHTML('beforebegin', html);

/**
 * Returns a duplicate of the node on which this method was called.
 */
export const clone = (item: Element) => item.cloneNode(true)

/**
 * Removes all inner elements to the given element
 */
export const empty = (item: Element) => item.innerHTML = ''

/**
 * Returns all elements that accomplish the given condition
 * @param {string} query String must be a valid CSS selector string
 */
export const filterElements = (fn: fn) => (query: string) => (item = document) => Array.from(item.querySelectorAll(query)).filter(fn)

/**
 * Returns the outerHTML of the given element
 */
export const outerHtml = (item: Element) => item.outerHTML

/**
 * Returns an object containing the values of all CSS properties of an element
 */
export const getStyle = (styleKey: number) => (item: Element) => getComputedStyle(item)[styleKey]

/**
 * Returns the text content of the node and its descendants.
 */
export const getText = (item: Element) => item.textContent

/**
 * Returns a boolean if the given elements match.
 */
export const match = (other: Element) => (item: Element) => item === other

/**
 * Inserts a node before the reference node as a child of a specified parent node
 */
export const prepend = (parent: Element) => (item: Element) => parent.insertBefore(item, parent.firstChild)

/**
 * Returns the size of an element and its position relative to the viewport.
 */
export const getViewPort = (item: Element) => item.getBoundingClientRect()

/**
 * Replaces the element and all of its descendants with a new DOM 
 * tree constructed by parsing the specified htmlString.
 */
export const replaceHtml = (str: string) => (item: Element) => item.outerHTML = str

/**
 * Returns all siblings elements of the given element
 */
export const siblings = (item:any) =>  Array.from(item.parentNode.children).filter((child) => child !== item)

/**
 * Scrolls to the selected element
 * @param item 
 * @param options 
 */
export const scrollToElem = (item: Element, options: any = { behavior: 'smooth', block: 'center' }) => item.scrollIntoView(options)

/**
 * Change CSS variable  
 * @param key 
 * @param value 
 */
export const setCssVar = (key: string, value: string | null) => document.documentElement.style.setProperty(key, value)

/**
 * Dispatches an Event at the specified element, (synchronously) 
 * invoking the affected event name in the appropriate order.
 */
export const trigger = (eName: string) => (item: Element) => {
  const event = document.createEvent('Event')
  event.initEvent(eName, true, false)
  return item.dispatchEvent(event)
}

