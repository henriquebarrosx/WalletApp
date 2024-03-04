export class Observer<T> {
  constructor(
    public event: string,
    public fn: Function,
  ) { }
}