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

/** 
 * Returns the previous element of the specified element, in the same tree level.
*/
export const prevSibling = (item) => item.previousElementSibling

/** 
 * Traverses parents (heading toward the document root) of the Element until
 * it finds a node that matches the provided selectorString. Will return itself or the
 * matching ancestor. If no such element exists, it returns null.
*/
export const closest = (query) => (item) => item.closest(query)

/**
 * Returns the value of a specified attribute on the element 
 */
export const getAttr = (attr) => (item) => item.getAttribute(attr)

/** 
 * Submits a form object
*/
export const submit = (item) => item.submit(item)

/** 
 * Removes the attribute from the element.
 */
export const rmAttr = (attr) => (item) => item.removeAttribute(attr)

/**
 * Removes the class with the from the element.
 */
export const rmClass = (cls) => (item) => item.classList.remove(cls)

/**
 * Adds the class with the from the element.
 */
export const addClass = (cls) => (item) => item.classList.add(cls)

/** 
 * Removes a child node from the DOM and returns the removed node.
*/
export const rmChild = (item) => item.parentNode.removeChild(item)

/** 
 * Removes the object from the tree it belongs to.
*/
export const remove = (item) => item.remove(item)

/** 
 * Returns the inner value of the selected element
*/
export const value =  (query) => (item = document) => item.querySelector(query).value

/** 
 * Returns the data set attr-value of the selected element
*/
export const dataset = (dataKey) => ({ dataset }) => dataset[dataKey]

/**
 *  Toggles a Boolean attribute (removing it if it is present and 
 * adding it if it is not present) on the given element
 */
export const toggleAttr = (attr) =>  (item) => item.toggleAttribute(attr)

/**
 * Sets the value of an attribute on the specified element. 
 * If the attribute already exists, the value is updated; 
 * otherwise a new attribute is added with the specified name and value
 */
export const setAttr = (attr, value) => (item) => item.setAttribute(attr, value)

/**
 * When only one argument is present: Toggle the class value; i.e., 
 * if the class exists then remove it and return false, if not, then add 
 * it and return true.
 */
export const toggleClass = (cls) => (item) => item.classList.toggle(cls)

/**
 * Any child nodes are removed and replaced by a single Text node 
 * containing the specified string
 */
export const setText = (item) => (text) => item.innerText = text

/**
 * Sets the HTML or XML markup contained within the element.
 */
export const setHtml = (item) => (html) => item.innerHTML = html

/**
 * Gets the HTML or XML markup contained within the element.
 */
export const getHtml = (item) => (html) => item.innerHTML = html

/**
 * Is a shortcut method which creates a new Animation, 
 * applies it to the element, then plays the animation. 
 * It returns the created Animation object instance.
 */
export const animate = (keyframes, options) => (item) => item.animate(keyframes,options)

/**
 * Parses the specified text as HTML or XML and inserts the resulting 
 * nodes into the DOM tree at a end position.
 */
export const appendHtml = (item) => (html, option = 'beforeend') => item.insertAdjacentHTML(option,html)

/**
 * Changes the opacity to the given element
 */
export const opacity = (value) => (item) => item.style.opacity = `${value}`

/**
 * Applies all styles using a JS object to the given element
 */
export const setStyles = (styles) => (item) => item.setAttribute("style", Object.entries(styles).map(([key, value]) => `${key}: ${value};`).join(' '))

/**
 * Remove display style to the element
 */
export const show = (item) => item.style.display = ''

/**
 * Applies display none style to the given element
 */
export const hide = (item) => item.style.display = 'none'

/**
 * Inserts content, specified by the parameter, after each element in the set of matched elements.
 */
export const after = (html) => (item) => item.insertAdjacentHTML('afterend', html)

/**
 *  Appends a node as the last child of a node.
 */
export const append = (child) => (item) => item.appendChild(child)

/**
 * Inserts content, specified by the parameter, before each element in the set of matched elements.
 */
export const before = (html) => (item) => item.insertAdjacentHTML('beforebegin', html);

/**
 * Returns a duplicate of the node on which this method was called.
 */
export const clone = (item) => item.cloneNode(true)

/**
 * Removes all inner elements to the given element
 */
export const empty = (item) => item.innerHTML = ''

/**
 * Returns all elements that accomplish the given condition
 */
export const docFilter = (fn) => (item = document) => selectAll(query)(item).filter(fn)

/**
 * Returns the outerHTML of the given element
 */
export const outerHtml = (item) => item.outerHTML

/**
 * Returns an object containing the values of all CSS properties of an element
 */
export const getStyle = (styleKey) => (item) => getComputedStyle(item)[styleKey]

/**
 * Returns the text content of the node and its descendants.
 */
export const getText = (item) => item.textContent

/**
 * Returns a boolean if the given elements match.
 */
export const match = (other) => (item) => item === other

/**
 * Inserts a node before the reference node as a child of a specified parent node
 */
export const prepend = (parent) => (item) => item.insertBefore(el, parent.firstChild)

/**
 * Returns the size of an element and its position relative to the viewport.
 */
export const getViewPort = (item) => item.getBoundingClientRect()

/**
 * Replaces the element and all of its descendants with a new DOM 
 * tree constructed by parsing the specified htmlString.
 */
export const replaceHtml = (str) => (item) => item.outerHTML = str

/**
 * Returns all siblings elements of the given element
 */
export const siblings = (item) => [...item.parentNode.children].filter((child) => child !== item)

/**
 * Dispatches an Event at the specified element, (synchronously) 
 * invoking the affected event name in the appropriate order.
 */
export const trigger = (eName) => (item) => {
  const event = document.createEvent('Event')
  event.initEvent(eName, true, false)
  return item.dispatchEvent(event)
}

