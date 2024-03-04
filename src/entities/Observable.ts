import type { Observer } from "./Observer";

export class Observable {
  observers: Observer[] = []

  registry(observer: Observer) {
    this.observers.push(observer)
  }

  unregistry(event: string) {
    this.observers = this.observers.filter((observer) => {
      return observer.event !== event
    })
  }

  notify<T>(eventName: string, args: T) {
    this.observers.forEach(({ event, fn }) => {
      if (eventName === event) fn(args)
    })
  }
}