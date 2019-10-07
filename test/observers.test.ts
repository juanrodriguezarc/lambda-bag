import {
  Observer,
  State
} from '../src/observers/observers'


describe('Observables - CRUD operators', () => {

  test('Should update the app state correctly', () => {

    const AppState = State(); 
    
    const onUpdate = () => ({})
    
    const firstObs$ = { 
      param1: 'value-1',
      ...Observer(onUpdate)
    }
    
    const secondObs$ = { 
      param2: 'value-2' ,
      update(data) { onUpdate() }
    }
    
    AppState.update([1,3,4,5,6]);
    AppState.addObserver(firstObs$);
    AppState.addObserver(secondObs$);
    
    AppState.update([-1, -2, -3])
    AppState.removeObserver(secondObs$);
    AppState.update(null)
    
    const result = AppState.get()
    
    expect(result).toEqual(null);
    
  });

  test('Should add and remove observers', () => {

    const AppState = State(); 
    
    const onUpdate = () => ({})
    
    const firstObs$ = { 
      ...Observer(onUpdate)
    }
    
    const secondObs$ = { 
      update() { 
        onUpdate()
      }
    }
    
    const thirdObs$ = { 
      ...Observer(onUpdate)
    }

    AppState.addObserver(firstObs$);
    AppState.addObserver(secondObs$);
    AppState.removeObserver(secondObs$);
    AppState.addObserver(thirdObs$);
    const result = AppState.observers.length
    expect(result).toEqual(2);
    
  });

  test('Should nofity to all subcribed observers & update "element" by the respective key', () => {

    var element = []
    const AppState = State(); 
    
    const updateByKey = (key) =>  (data) => {
      data[key] ? element.push(`${key} has the value: ${data[key]}`) : undefined
    }

    // Update foo1 app state will only notify firstObs$ and so on
    const setFoo1 = updateByKey('foo1')
    const setFoo2 = updateByKey('foo2')
    const setFoo3 = updateByKey('foo3')

    const firstObs$ = { 
      ...Observer(setFoo1)
    }
    
    const secondObs$ = { 
      ...Observer(setFoo2)
    }
    
    const thirdObs$ = { 
      ...Observer(setFoo3)
    }

    AppState.addObserver(firstObs$);
    AppState.addObserver(secondObs$);
    AppState.addObserver(thirdObs$);
    AppState.removeObserver(firstObs$);

    AppState.update({ foo3: 'foo-3'})
    AppState.update({ foo1: 'foo-1'})
    
    const { length } = element

    expect(length).toEqual(1);
    
  });
})









