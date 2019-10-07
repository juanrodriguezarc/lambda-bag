import { IObserver, ISubject,  fn } from './types'
/**
 * Method to be executed after subject notification
 * @param {*} fn Function that will be executed after the notify event
 */
export const Observer = (fn: fn) => ({
  update(data: any) {
    fn(data)    
  }
})

/**
 * Subject that will be in charge to add, remove & notify the observers
 */
export const Subject: ISubject = {
  observers: [],
  addObserver (observer: IObserver) {
    observer._id = uuid()
    this.observers = [...this.observers, observer]
  },
  removeObserver(observer: IObserver) {
    this.observers = [...this.observers.filter((obs: IObserver) => observer._id !== obs._id )]
  },
  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

/**
 * Application - Component state
 * All observers will be subcribe to this state 
 * The state update que be only executed via setState method
 */
export const State = () => ({
  ...Subject,
  state: {},
  update(data = {}) {
    this.state = data;
    this.notify(this.state);
  },
  get() {
    return this.state;
  }
})

/**
 * Creates and returns uuid
 */
const uuid = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}