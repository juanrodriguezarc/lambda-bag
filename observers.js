const Observer = (fn) => ({
  update(data) {
    fn(data)    
  }
})

const Subject = {
  observers: [],
  addObserver (observer) {
    this.observers = [...this.observers, observer]
  },
  removeObserver(observer) {
    this.observers = [...this.observers.filter(obs => observer !== obs )]
  },
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

const State = {
  ...Subject,
  state: {},
  update(data = {}) {
    this.state = { ...this.state, data };
    this.notify(this.state);
  },
  get() {
    return this.state;
  }
}

// Usage example

const AppState = State; 

const user1 = { a: 2 , 
  ...Observer((data)=> console.log(`subcription #1 ${data}`))
}
const user2 = { b: 2 ,   
  update(data) {
    console.log('subcription #2', data)
  }
}


// Hydrate state with initial users.
AppState.update({ x: '22' });
AppState.addObserver(user1);
AppState.addObserver(user2);

console.log(AppState.get(), 'xxxx')

setTimeout(() => {
  AppState.update({ x: '222312' })
  AppState.removeObserver(user2);
}, 2000)

setTimeout(() => {
  AppState.update({ x: '222312' })
}, 4000)