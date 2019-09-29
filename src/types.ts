export type fn = ((...param : any[]) => any )

export type list = number[] | string[] | any[]

export type value = number | string | any

export type bfn = ((...param : any[]) => boolean )

export type doc = Element | any

export type fnObserver = ((observer: IObserver) => any | void )

export interface IObserver {
  update: fn,
  _id?: string
}

export interface ISubject {
  observers: Array<IObserver>,
  addObserver: fnObserver
  removeObserver:fnObserver,
  notify:fn
}
