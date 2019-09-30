

# Lambda Bag *·* [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Introduction 

Functional JavaScript utility library focused in performance, modularity, and functional pattern.

The idea of this project is a lightweight set of functions the will reduce the amount of code in your vanilla JS project

Basically you won't need any library or be attached to one framework instead of that this compile some partterns that are commonly used in different projects following the DRY approach focusing in functional programming

You'll have some parts of jQuery, loadash, angular, react and other libraries

## [Installation](https://www.npmjs.com/package/lambda-bag)

```
npm install lambda-bag
```

## Usage

### [Documentation](https://5d8be4ea8e992f00086c7407--hopeful-perlman-bfbed6.netlify.com/)

### Browser API

This module creates an API for common Browser API using simplified and friendly syntax (Similar to JQuery). It can be combined with observers, functional operators & helpers included below

```js
// Don't do this 
const view = document.querySelector("[view]")
const modal = document.querySelector("[modal]")

if (view.classList.contains("active")) {
  view.classList.remove("hide")
} else {
  view.classList.add("hide")
}

// Do this
import { toggleAttr } from 'query'
const view = selectDoc('[view]')
const modal = selectDoc('[modal]')
toggleAttr(view,'hide')
toggleAttr(modal,'hide')
```

[View all](https://5d8be4ea8e992f00086c7407--hopeful-perlman-bfbed6.netlify.com/identifiers.html#query)

### Functional Operators

```js
import { pipe, map, add } from 'operators'

const double = (x) => x * 2
// Compose multiplication and sum in the respective order
pipe(
  map(double),
  map(add(3))
)([1,2,3,4,-1,0]) 
```

[View all operators](https://5d8be4ea8e992f00086c7407--hopeful-perlman-bfbed6.netlify.com/identifiers.html#operators)

### Observers API
```js
import { Observer } from 'observers'
const AppState = State; 

// Initialize subject
const firstSubject = { 
  data: 'value-1', 
  ...Observer((data)=>{
    console.log(`subcription #1 ${data}`)
  })
}

// or
const secondSubject = { 
  other: 'value-2' ,   
  update(data) {
    console.log('subcription #2', data)
  }
}

// Hydrate state with initial users.
AppState.update({ foo: 'bar' });
AppState.addObserver(firstSubject);
AppState.addObserver(secondSubject);

// Get application state
AppState.get()

// Update application state and remove observer
AppState.update({ x: 'New Value' })
AppState.removeObserver(secondSubject);
```
[View documentation](https://5d8be4ea8e992f00086c7407--hopeful-perlman-bfbed6.netlify.com/identifiers.html#observers)



### Helpers

```js
import { toggleElem, rmQueryParam, setQueryParam } from 'general'
const key = 'option'
const value = 'param1'
const params  = 'param1 param2 param3'
const switchAttrs = toggleElem(value)(params) // Toggle string value ' param2 param3'
switchAttrs.length <= 0 ? 
  rmQueryParam(key) : 
  setQueryParam(key, switchAttrs.join(','))
```

[View all helpers](https://5d8be4ea8e992f00086c7407--hopeful-perlman-bfbed6.netlify.com/identifiers.html#general)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## License

Lambda Bag is [MIT licensed](https://opensource.org/licenses/mit-license.php).
