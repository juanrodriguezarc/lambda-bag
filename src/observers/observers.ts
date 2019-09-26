/**
 * Method to be executed after subject notification
 * @param {*} fn Function that will be executed after the notify event
 */
export const Observer = (fn) => ({
  update(data) {
    fn(data)    
  }
})

/**
 * Subject that will be in charge to add, remove & notify the observers
 */
export const Subject = {
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

/**
 * Application - Component state
 * All observers will be subcribe to this state 
 * The state update que be only executed via setState method
 */
export const State = {
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